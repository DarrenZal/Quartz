#!/usr/bin/env python3

import requests
import time

FUSEKI_URL = "http://localhost:3030"
DATASET = "digital_garden"

def run_query(query, description="", limit_output=True):
    """Run a SPARQL query and display results"""
    print(f"\n{'='*60}")
    print(f"🔍 {description}")
    print('='*60)
    
    params = {'query': query.strip()}
    url = f"{FUSEKI_URL}/{DATASET}/sparql"
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json()
            bindings = results.get('results', {}).get('bindings', [])
            
            if bindings:
                # Show first few results
                display_count = min(10, len(bindings)) if limit_output else len(bindings)
                
                for i, binding in enumerate(bindings[:display_count], 1):
                    row_parts = []
                    for var in results['head']['vars']:
                        value = binding.get(var, {}).get('value', 'N/A')
                        # Truncate long values for readability
                        if len(value) > 100:
                            value = value[:97] + "..."
                        row_parts.append(f"{var}: {value}")
                    
                    print(f"{i:2d}. {' | '.join(row_parts)}")
                
                if len(bindings) > display_count:
                    print(f"    ... and {len(bindings) - display_count} more results")
                    
                print(f"\n📊 Total results: {len(bindings)}")
            else:
                print("❌ No results found")
                
        else:
            print(f"❌ Query failed: {response.status_code}")
            print(response.text[:200])
            
    except Exception as e:
        print(f"❌ Error running query: {e}")

def main():
    print("🧪 Enhanced Knowledge Graph Analysis")
    print("Running comprehensive tests on your semantic data...")
    print("🔬 Loaded with rich relationships and semantic triples")
    
    # Check server connectivity
    try:
        response = requests.get(f"{FUSEKI_URL}/$/ping")
        if response.status_code != 200:
            print("❌ Fuseki server not responding")
            return
        print("✅ Connected to Fuseki server")
    except:
        print("❌ Cannot connect to Fuseki server")
        return
    
    # Enhanced test queries based on your rich semantic data
    queries = [
        # Basic overview
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT ?type (COUNT(?article) as ?count) WHERE {
          ?article rdf:type ?type .
          FILTER(STRSTARTS(STR(?type), "http://darrenzal.net/kg/ontology/"))
        }
        GROUP BY ?type
        ORDER BY DESC(?count)
        """, "Content Types Overview"),
        
        # Bioregional knowledge focus
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?article ?title WHERE {
          ?article dcterms:title ?title ;
                   :hasSummary ?summary .
          FILTER(CONTAINS(LCASE(CONCAT(?title, " ", ?summary)), "bioregional"))
        }
        ORDER BY ?title
        """, "Bioregional Knowledge Content"),
        
        # Relationship patterns
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?source_title ?predicate ?target_title ?description WHERE {
          ?source ?pred ?target .
          ?source dcterms:title ?source_title .
          ?target dcterms:title ?target_title .
          OPTIONAL { ?pred rdfs:comment ?description }
          BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?predicate)
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?pred != :hasSummary && ?pred != :hasAlias)
        }
        ORDER BY ?source_title ?predicate
        LIMIT 15
        """, "Knowledge Relationships (Sample)"),
        
        # Semantic triples - factual assertions
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?subject_title ?predicate ?object_value WHERE {
          ?article ?semantic_pred ?object_value .
          ?article dcterms:title ?subject_title .
          BIND(STRAFTER(STR(?semantic_pred), "http://darrenzal.net/kg/ontology/") AS ?predicate)
          FILTER(STRSTARTS(STR(?semantic_pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?semantic_pred NOT IN (:hasSummary, :hasAlias, :relatedTo))
          FILTER(!ISIRI(?object_value))
        }
        ORDER BY ?subject_title ?predicate
        LIMIT 20
        """, "Semantic Assertions and Facts"),
        
        # Technology ecosystem
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?article_title ?technology WHERE {
          ?article :usesTechnology ?tech .
          ?article dcterms:title ?article_title .
          OPTIONAL { ?tech dcterms:title ?technology }
          BIND(IF(BOUND(?technology), ?technology, 
                  STRAFTER(STR(?tech), "http://darrenzal.net/kg/resource/")) AS ?tech_display)
        }
        ORDER BY ?article_title
        """, "Technology Usage Patterns"),
        
        # Central concepts analysis
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?concept ?title (COUNT(?connection) as ?connection_count) WHERE {
          {
            ?concept ?pred ?target .
            ?concept dcterms:title ?title .
            FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
            BIND(?target AS ?connection)
          }
          UNION
          {
            ?source ?pred ?concept .
            ?concept dcterms:title ?title .
            FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
            BIND(?source AS ?connection)
          }
        }
        GROUP BY ?concept ?title
        HAVING (COUNT(?connection) > 3)
        ORDER BY DESC(?connection_count)
        """, "Most Connected Concepts (Hub Analysis)"),
        
        # Knowledge Graph specific connections
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX base: <http://darrenzal.net/kg/resource/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?target_title ?relationship ?context WHERE {
          base:KnowledgeGraph ?pred ?target .
          OPTIONAL { ?target dcterms:title ?target_title }
          OPTIONAL { ?pred rdfs:comment ?context }
          BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?relationship)
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?pred NOT IN (:hasSummary, :hasAlias))
        }
        ORDER BY ?relationship
        """, "Knowledge Graph Connections"),
        
        # Discourse Graphs ecosystem  
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX base: <http://darrenzal.net/kg/resource/>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        SELECT ?relationship ?target_display WHERE {
          base:DiscourseGraphs ?pred ?target .
          BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?relationship)
          OPTIONAL { ?target dcterms:title ?target_title }
          BIND(IF(BOUND(?target_title), ?target_title, 
                  IF(ISIRI(?target), STRAFTER(STR(?target), "http://darrenzal.net/kg/resource/"), STR(?target))) 
               AS ?target_display)
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?pred NOT IN (:hasSummary, :hasAlias))
        }
        ORDER BY ?relationship
        """, "Discourse Graphs Ecosystem"),
        
        # Relationship type distribution
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        SELECT ?relationship_type (COUNT(*) as ?usage_count) WHERE {
          ?source ?pred ?target .
          BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?relationship_type)
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?pred NOT IN (:hasSummary, :hasAlias))
        }
        GROUP BY ?relationship_type
        ORDER BY DESC(?usage_count)
        """, "Relationship Types Distribution"),
        
        # Knowledge graph statistics
        ("""
        PREFIX : <http://darrenzal.net/kg/ontology/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT 
          (COUNT(DISTINCT ?article) as ?total_articles)
          (COUNT(DISTINCT ?type) as ?content_types)
          (COUNT(?relationship) as ?total_relationships)
        WHERE {
          ?article rdf:type ?type .
          ?article ?pred ?target .
          FILTER(STRSTARTS(STR(?type), "http://darrenzal.net/kg/ontology/"))
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          FILTER(?pred NOT IN (:hasSummary, :hasAlias))
          BIND(?pred AS ?relationship)
        }
        """, "Knowledge Graph Statistics Summary")
    ]
    
    # Run all queries
    for i, (query, description) in enumerate(queries, 1):
        print(f"\n🔍 Running query {i}/{len(queries)}: {description}")
        run_query(query, description)
        time.sleep(0.5)  # Brief pause between queries
    
    print(f"\n{'='*60}")
    print("🎉 Enhanced Knowledge Graph Analysis Complete!")
    print(f"💡 Web interface available at: {FUSEKI_URL}")
    print("📈 Your semantic data shows rich interconnections and structured knowledge")
    print("🔍 Try the enhanced_queries.sparql file for more detailed exploration")

if __name__ == "__main__":
    main()