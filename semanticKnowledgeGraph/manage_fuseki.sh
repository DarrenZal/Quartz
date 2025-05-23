#!/bin/bash
# Fuseki Server Management Script for Digital Garden Knowledge Graph

FUSEKI_DIR="/Users/darrenzal/Quartz/fuseki"
DATASET="digital_garden"
PORT="3030"
LOG_FILE="$FUSEKI_DIR/fuseki.log"

cd "$FUSEKI_DIR" || exit 1

case "$1" in
    start)
        echo "Starting Fuseki server..."
        if pgrep -f "fuseki-server" > /dev/null; then
            echo "⚠️  Fuseki is already running!"
            exit 1
        fi
        nohup ./fuseki-server --mem --update /$DATASET > "$LOG_FILE" 2>&1 &
        sleep 3
        if curl -s http://localhost:$PORT/\$/ping > /dev/null; then
            echo "✅ Fuseki server started successfully on http://localhost:$PORT"
            echo "📁 Dataset: /$DATASET"
            echo "📜 Logs: $LOG_FILE"
        else
            echo "❌ Failed to start Fuseki server"
            exit 1
        fi
        ;;
        
    stop)
        echo "Stopping Fuseki server..."
        if ! pgrep -f "fuseki-server" > /dev/null; then
            echo "⚠️  Fuseki is not running"
            exit 1
        fi
        pkill -f fuseki-server
        sleep 2
        if ! pgrep -f "fuseki-server" > /dev/null; then
            echo "✅ Fuseki server stopped successfully"
        else
            echo "❌ Failed to stop Fuseki server"
            exit 1
        fi
        ;;
        
    restart)
        echo "Restarting Fuseki server..."
        $0 stop
        sleep 2
        $0 start
        ;;
        
    status)
        echo "Checking Fuseki server status..."
        if pgrep -f "fuseki-server" > /dev/null; then
            echo "✅ Fuseki server is running"
            if curl -s http://localhost:$PORT/\$/ping > /dev/null; then
                echo "🌐 Web interface: http://localhost:$PORT"
                echo "📊 SPARQL endpoint: http://localhost:$PORT/$DATASET/sparql"
                # Get server stats
                echo "📈 Server stats:"
                curl -s http://localhost:$PORT/\$/stats | grep -E "(datasets|requests)"
            else
                echo "⚠️  Server process running but not responding to HTTP requests"
            fi
        else
            echo "❌ Fuseki server is not running"
        fi
        ;;
        
    logs)
        echo "📜 Viewing Fuseki logs (press Ctrl+C to exit):"
        tail -f "$LOG_FILE"
        ;;
        
    test)
        echo "🧪 Testing knowledge graph..."
        if ! curl -s http://localhost:$PORT/\$/ping > /dev/null; then
            echo "❌ Fuseki server is not running"
            exit 1
        fi
        
        # Run a simple test query
        QUERY="PREFIX dcterms: <http://purl.org/dc/terms/> SELECT (COUNT(*) as ?count) WHERE { ?s dcterms:title ?title . }"
        RESULT=$(curl -s -X POST -H "Accept: application/sparql-results+json" \
                 --data-urlencode "query=$QUERY" \
                 http://localhost:$PORT/$DATASET/sparql)
        
        if [ $? -eq 0 ]; then
            COUNT=$(echo "$RESULT" | grep -o '"value":"[0-9]*"' | grep -o '[0-9]*' | head -1)
            echo "✅ Knowledge graph is working!"
            echo "📊 Found $COUNT articles with titles"
        else
            echo "❌ Knowledge graph test failed"
        fi
        ;;
        
    load-test-data)
        echo "📥 Loading test data..."
        if ! curl -s http://localhost:$PORT/\$/ping > /dev/null; then
            echo "❌ Fuseki server is not running. Start it first with: $0 start"
            exit 1
        fi
        
        curl -X POST -H "Content-Type: application/ld+json" \
             --data-binary @"../test_data.jsonld" \
             "http://localhost:$PORT/$DATASET/data"
        
        if [ $? -eq 0 ]; then
            echo "✅ Test data loaded successfully"
            $0 test
        else
            echo "❌ Failed to load test data"
        fi
        ;;
        
    backup)
        echo "💾 Backing up knowledge graph data..."
        if ! curl -s http://localhost:$PORT/\$/ping > /dev/null; then
            echo "❌ Fuseki server is not running"
            exit 1
        fi
        
        BACKUP_FILE="../backups/backup_$(date +%Y%m%d_%H%M%S).jsonld"
        mkdir -p ../backups
        
        curl -H "Accept: application/ld+json" \
             http://localhost:$PORT/$DATASET/data > "$BACKUP_FILE"
        
        if [ $? -eq 0 ] && [ -s "$BACKUP_FILE" ]; then
            echo "✅ Backup created: $BACKUP_FILE"
            echo "📊 Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
        else
            echo "❌ Backup failed"
            rm -f "$BACKUP_FILE"
        fi
        ;;
        
    *)
        echo "🚀 Fuseki Server Management for Digital Garden Knowledge Graph"
        echo "Usage: $0 {start|stop|restart|status|logs|test|load-test-data|backup}"
        echo ""
        echo "Commands:"
        echo "  start          - Start the Fuseki server"
        echo "  stop           - Stop the Fuseki server"
        echo "  restart        - Restart the Fuseki server"
        echo "  status         - Check server status and stats"
        echo "  logs           - View server logs in real-time"
        echo "  test           - Test knowledge graph functionality"
        echo "  load-test-data - Load sample test data"
        echo "  backup         - Create backup of current data"
        echo ""
        echo "Examples:"
        echo "  $0 start       # Start the server"
        echo "  $0 status      # Check if running"
        echo "  $0 test        # Test functionality"
        echo "  $0 logs        # View logs"
        exit 1
        ;;
esac