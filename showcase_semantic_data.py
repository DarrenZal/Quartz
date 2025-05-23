#!/usr/bin/env python3

import requests
import json

FUSEKI_URL = "http://localhost:3030"
DATASET = "digital_garden"

def run_showcase_query(query, title, description=""):
    """Run a SPARQL query and display formatted results"""
    print(f"\n🔍 {title}")
    print("=" * 70)
    if description:
        print(f"📋 {description}")
        print("-" * 70)
    
    params = {'query': query.strip()}
    url = f"{FUSEKI_URL}/{DATASET}/sparql"
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json()
            bindings = results.get('results', {}).get('bindings', [])
            
            if bindings:
                for i, binding in enumerate(bindings, 1):
                    row_parts = []
                    for var in results['head']['vars']:
                        value = binding.get(var, {}).get('value', 'N/A')
                        if len(value) > 80:
                            value = value[:77] + "..."
                        # Clean up URIs for readability
                        if value.startswith('http://darrenzal.net/kg/resource/'):
                            clean_value = value.replace('http://darrenzal.net/kg/resource/', '').replace('_', ' ')
                            row_parts.append(f"{var}: {clean_value}")
                        else:
                            row_parts.append(f"{var}: {value}")
                    
                    print(f"{i:2d}. {' | '.join(row_parts)}")
                
                print(f"\n📊 Found {len(bindings)} results")
            else:
                print("❌ No results found")
                
        else:
            print(f"❌ Query failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    print("🎯 Semantic Knowledge Graph Showcase")
    print("=" * 70)
    print("Demonstrating rich semantic data with relationships and triples")
    print("📈 Data from your enhanced markdown files")
    
    # Test connectivity
    try:
        response = requests.get(f"{FUSEKI_URL}/$/ping")
        if response.status_code != 200:
            print("❌ Fuseki server not responding")
            return
        print("✅ Connected to knowledge graph database")
    except:
        print("❌ Cannot connect to server")
        return
    
    # Showcase queries
    
    # 1. Overview
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT ?type (COUNT(?article) as ?count) WHERE {
      ?article rdf:type ?type .
      FILTER(STRSTARTS(STR(?type), "http://darrenzal.net/kg/ontology/"))
    }
    GROUP BY ?type
    ORDER BY DESC(?count)
    """, "Knowledge Base Content Types", 
    "Overview of the different types of content in your knowledge graph")
    
    # 2. Bioregional ecosystem
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?title ?type WHERE {
      ?article dcterms:title ?title ;
               rdf:type ?type .
      FILTER(CONTAINS(LCASE(?title), "bioregional"))
      BIND(STRAFTER(STR(?type), "http://darrenzal.net/kg/ontology/") AS ?content_type)
    }
    ORDER BY ?title
    """, "Bioregional Knowledge Ecosystem",
    "Your comprehensive work on bioregional knowledge commons")
    
    # 3. Technology leveraging relationships
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?article_title ?leveraged_tech WHERE {
      ?article :leverages ?tech .
      ?article dcterms:title ?article_title .
      BIND(IF(ISIRI(?tech), 
              STRAFTER(STR(?tech), "http://darrenzal.net/kg/resource/"),
              STR(?tech)) AS ?leveraged_tech)
    }
    ORDER BY ?article_title
    LIMIT 15
    """, "Technology Leverage Network",
    "How your articles build upon and leverage different technologies")
    
    # 4. Semantic assertions
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?subject ?assertion_type ?assertion_value WHERE {
      ?article ?pred ?value .
      ?article dcterms:title ?subject .
      FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
      FILTER(?pred IN (:isa, :enables, :supports, :provides, :demonstrates, :embodies))
      FILTER(!ISIRI(?value))
      BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?assertion_type)
      BIND(STR(?value) AS ?assertion_value)
    }
    ORDER BY ?subject ?assertion_type
    LIMIT 20
    """, "Semantic Assertions",
    "Factual statements and semantic triples extracted from your content")
    
    # 5. Central concepts
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?concept_title (COUNT(DISTINCT ?connection) as ?connections) WHERE {
      {
        ?concept ?pred ?target .
        ?concept dcterms:title ?concept_title .
        FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
        FILTER(?pred NOT IN (:hasSummary, :hasAlias))
        BIND(?target AS ?connection)
      }
      UNION
      {
        ?source ?pred ?concept .
        ?concept dcterms:title ?concept_title .
        FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
        FILTER(?pred NOT IN (:hasSummary, :hasAlias))
        BIND(?source AS ?connection)
      }
    }
    GROUP BY ?concept_title
    HAVING (COUNT(DISTINCT ?connection) > 5)
    ORDER BY DESC(?connections)
    LIMIT 10
    """, "Most Connected Concepts",
    "Hub concepts that are central to your knowledge network")
    
    # 6. Knowledge Graph specific
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX base: <http://darrenzal.net/kg/resource/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?relationship_type ?connected_to WHERE {
      base:KnowledgeGraph ?pred ?target .
      BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?relationship_type)
      FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
      FILTER(?pred NOT IN (:hasSummary, :hasAlias))
      OPTIONAL { ?target dcterms:title ?target_title }
      BIND(IF(BOUND(?target_title), ?target_title,
              IF(ISIRI(?target), STRAFTER(STR(?target), "http://darrenzal.net/kg/resource/"), STR(?target)))
           AS ?connected_to)
    }
    ORDER BY ?relationship_type
    """, "Knowledge Graph Ecosystem",
    "How Knowledge Graphs connect to other concepts in your garden")
    
    # 7. Relationship diversity
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    SELECT ?relationship_type (COUNT(*) as ?usage_count) WHERE {
      ?source ?pred ?target .
      BIND(STRAFTER(STR(?pred), "http://darrenzal.net/kg/ontology/") AS ?relationship_type)
      FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
      FILTER(?pred NOT IN (:hasSummary, :hasAlias))
    }
    GROUP BY ?relationship_type
    ORDER BY DESC(?usage_count)
    LIMIT 15
    """, "Relationship Type Diversity",
    "The rich variety of semantic relationships in your knowledge graph")
    
    # 8. Final stats
    run_showcase_query("""
    PREFIX : <http://darrenzal.net/kg/ontology/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT 
      (COUNT(DISTINCT ?article) as ?articles)
      (COUNT(DISTINCT ?type) as ?content_types)
      (COUNT(DISTINCT ?relationship) as ?relationship_types)
      (COUNT(?triple) as ?total_triples)
    WHERE {
      ?article rdf:type ?type .
      ?article dcterms:title ?title .
      ?article ?pred ?target .
      FILTER(STRSTARTS(STR(?type), "http://darrenzal.net/kg/ontology/"))
      FILTER(STRSTARTS(STR(?pred), "http://darrenzal.net/kg/ontology/"))
      BIND(?pred AS ?relationship)
      BIND(?pred AS ?triple)
    }
    """, "Knowledge Graph Statistics",
    "Comprehensive metrics about your semantic knowledge base")
    
    print(f"\n{'='*70}")
    print("🎉 Semantic Knowledge Graph Showcase Complete!")
    print(f"💡 Explore more at: {FUSEKI_URL}")
    print("📊 Your knowledge graph demonstrates:")
    print("   • Rich semantic relationships between concepts")
    print("   • Structured factual assertions and triples")
    print("   • Comprehensive bioregional knowledge ecosystem") 
    print("   • Technology and methodology interconnections")
    print("   • Ready for advanced queries and AI applications")

if __name__ == "__main__":
    main()