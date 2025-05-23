# Apache Jena Fuseki Setup for Digital Garden Knowledge Graph

This guide provides instructions for setting up Apache Jena Fuseki to host your digital garden knowledge graph.

## Prerequisites

- Java 11 or later installed
- Command line access

## Step 1: Download and Install Fuseki

1. Download Apache Jena Fuseki from: https://jena.apache.org/download/
2. Extract the archive to a directory of your choice (e.g., `/opt/fuseki/` or `~/fuseki/`)

## Step 2: Start Fuseki Server

### Option A: In-Memory Database (for testing)
```bash
cd /path/to/fuseki
./fuseki-server --mem --update /digital_garden
```

### Option B: Persistent Database (recommended)
```bash
cd /path/to/fuseki
./fuseki-server --loc=databases/digital_garden --update /digital_garden
```

The server will start on `http://localhost:3030`

## Step 3: Load the Knowledge Graph Data

### Using the Web Interface
1. Open `http://localhost:3030` in your browser
2. Click on "manage datasets"
3. Select your dataset (digital_garden)
4. Go to "upload data"
5. Upload the file `/Users/darrenzal/Quartz/export/knowledge_graph.jsonld`
6. Set the graph name to `http://darrenzal.net/kg/graph` (optional)

### Using cURL (Command Line)
```bash
# Upload to default graph
curl -X POST \
  -H "Content-Type: application/ld+json" \
  --data-binary @"/Users/darrenzal/Quartz/export/knowledge_graph.jsonld" \
  "http://localhost:3030/digital_garden/data"

# Upload to named graph
curl -X POST \
  -H "Content-Type: application/ld+json" \
  --data-binary @"/Users/darrenzal/Quartz/export/knowledge_graph.jsonld" \
  "http://localhost:3030/digital_garden/data?graph=http://darrenzal.net/kg/graph"
```

## Step 4: Verify the Data

Access the SPARQL query interface at: `http://localhost:3030/dataset.html?tab=query&ds=/digital_garden`

Test with a simple query:
```sparql
PREFIX : <http://darrenzal.net/kg/ontology/>
PREFIX dcterms: <http://purl.org/dc/terms/>

SELECT ?concept ?title WHERE {
  ?concept a :Concept ;
           dcterms:title ?title .
}
LIMIT 10
```

## Fuseki Configuration File

For production use, create a configuration file `/path/to/fuseki/config.ttl`:

```turtle
@prefix fuseki: <http://jena.apache.org/fuseki#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix ja:     <http://jena.hpl.hp.com/2005/11/Assembler#> .

:service rdf:type fuseki:Service ;
    fuseki:name "digital_garden" ;
    fuseki:serviceQuery "query" ;
    fuseki:serviceQuery "sparql" ;
    fuseki:serviceUpdate "update" ;
    fuseki:serviceUpload "upload" ;
    fuseki:serviceReadWriteGraphStore "data" ;
    fuseki:dataset :dataset .

:dataset rdf:type ja:RDFDataset ;
    ja:defaultGraph :graph .

:graph rdf:type ja:MemoryModel ;
    ja:content [
        ja:externalContent <file:///Users/darrenzal/Quartz/export/knowledge_graph.jsonld> ;
    ] .
```

Then start with:
```bash
./fuseki-server --config=config.ttl
```

## Server Management

### Starting the Server

For your current setup (based on successful deployment):
```bash
cd /Users/darrenzal/Quartz/fuseki

# Start in background (recommended)
nohup ./fuseki-server --mem --update /digital_garden > fuseki.log 2>&1 &

# Start in foreground (for debugging)
./fuseki-server --mem --update /digital_garden

# Start with persistent storage
./fuseki-server --loc=databases/digital_garden --update /digital_garden
```

### Stopping the Server

```bash
# Find the Fuseki process
ps aux | grep fuseki

# Stop using process ID (replace XXXX with actual PID)
kill XXXX

# Or kill all Fuseki processes
pkill -f fuseki-server

# Graceful shutdown (if running in foreground)
Ctrl+C
```

### Checking Server Status

```bash
# Test if server is running
curl -s http://localhost:3030/$/ping

# Check server stats
curl -s http://localhost:3030/$/stats

# View recent logs
tail -f /Users/darrenzal/Quartz/fuseki/fuseki.log

# Check what's running on port 3030
lsof -i :3030
```

### Restarting the Server

```bash
cd /Users/darrenzal/Quartz/fuseki

# Stop existing server
pkill -f fuseki-server

# Wait a moment
sleep 2

# Start again
nohup ./fuseki-server --mem --update /digital_garden > fuseki.log 2>&1 &

# Verify it's running
curl -s http://localhost:3030/$/ping
```

### Backing Up Data

For in-memory databases, you need to export data before stopping:
```bash
# Export all data to file
curl -H "Accept: application/n-triples" \
  http://localhost:3030/digital_garden/data > backup.nt

# Or export as JSON-LD
curl -H "Accept: application/ld+json" \
  http://localhost:3030/digital_garden/data > backup.jsonld
```

For persistent databases, backup the `databases/` directory:
```bash
cp -r databases/digital_garden databases/digital_garden_backup_$(date +%Y%m%d)
```

## Security Considerations

For production deployment:
- Enable authentication
- Configure HTTPS
- Restrict network access
- Regular backups
- Monitor resource usage

## Troubleshooting

- **Port already in use**: Change the port with `--port=3031`
- **Java version issues**: Ensure Java 11+ is installed (or Java 8 for Fuseki 3.17.0)
- **File permission errors**: Check file permissions for the Fuseki directory
- **Memory issues**: Increase JVM heap size with `-Xmx4g` (for 4GB)
- **Server won't start**: Check `fuseki.log` for detailed error messages
- **Data not loading**: Verify JSON-LD format and check server logs

### Common Commands Reference

```bash
# Current working setup (your installation)
cd /Users/darrenzal/Quartz/fuseki
nohup ./fuseki-server --mem --update /digital_garden > fuseki.log 2>&1 &

# Check if running
curl -s http://localhost:3030/$/ping

# Stop server
pkill -f fuseki-server

# View logs
tail -f fuseki.log

# Load test data
curl -X POST -H "Content-Type: application/ld+json" \
  --data-binary @"../test_data.jsonld" \
  "http://localhost:3030/digital_garden/data"
```

## Next Steps

Once Fuseki is running and your data is loaded, you can:
1. Access web interface at `http://localhost:3030`
2. Run SPARQL queries to explore your knowledge graph
3. Use `/Users/darrenzal/Quartz/test_queries.py` for testing
4. Build applications that query the SPARQL endpoint
5. Set up automated data updates from your markdown files
6. Configure monitoring and backups