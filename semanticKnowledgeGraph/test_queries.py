#!/usr/bin/env python3
"""
Quick test script for our knowledge graph queries
"""

import requests
import json

def run_query(query, description):
    print(f"\n=== {description} ===")
    print("-" * 50)
    
    response = requests.post(
        'http://localhost:3030/digital_garden/sparql',
        data={'query': query},
        headers={'Accept': 'application/sparql-results+json'}
    )
    
    if response.status_code == 200:
        result = response.json()
        bindings = result['results']['bindings']
        
        if not bindings:
            print("No results found.")
            return
        
        # Print results in a simple format
        for i, binding in enumerate(bindings[:10], 1):  # Limit to 10 results
            values = []
            for var, value in binding.items():
                val = value['value']
                # Shorten long URIs
                if val.startswith('http://darrenzal.net/kg/'):
                    val = val.split('/')[-1]
                elif val.startswith('http://'):
                    val = "..." + val[-20:]
                values.append(f"{var}: {val}")
            print(f"{i}. {' | '.join(values)}")
        
        if len(bindings) > 10:
            print(f"... and {len(bindings) - 10} more results")
        
        print(f"\nTotal results: {len(bindings)}")
    else:
        print(f"Query failed: {response.status_code}")
        print(response.text)

def main():
    print("🧪 Testing Knowledge Graph with Sample Queries")
    print("=" * 60)
    
    # Test 1: Count all data
    run_query("""
        SELECT (COUNT(*) as ?count) WHERE {
          ?s ?p ?o .
        }
    """, "Total triples in database")
    
    # Test 2: List all articles with types
    run_query("""
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX : <http://darrenzal.net/kg/ontology/>
        
        SELECT ?title ?type WHERE {
          ?article dcterms:title ?title ;
                   a ?type .
        }
        ORDER BY ?title
    """, "All articles with their types")
    
    # Test 3: Find all relationships
    run_query("""
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX : <http://darrenzal.net/kg/ontology/>
        
        SELECT ?subject ?predicate ?object WHERE {
          ?s dcterms:title ?subject ;
             ?pred ?o .
          ?o dcterms:title ?object .
          FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
          BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") as ?predicate)
        }
    """, "Relationships between articles")
    
    # Test 4: Graph statistics
    run_query("""
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX : <http://darrenzal.net/kg/ontology/>
        
        SELECT 
          (COUNT(DISTINCT ?article) as ?articles)
          (COUNT(DISTINCT ?type) as ?types)
          (COUNT(?relationship) as ?relationships)
        WHERE {
          ?article dcterms:title ?title .
          OPTIONAL { ?article a ?type }
          OPTIONAL { 
            ?article ?pred ?target . 
            FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
            BIND(?pred as ?relationship)
          }
        }
    """, "Knowledge Graph Statistics")
    
    print("\n" + "=" * 60)
    print("✅ Knowledge Graph Testing Complete!")
    print("\nNext steps:")
    print("1. Fix the JSON-LD conversion script to load all your data")
    print("2. Access Fuseki web interface at: http://localhost:3030")
    print("3. Try more complex queries from sample_queries.sparql")

if __name__ == "__main__":
    main()