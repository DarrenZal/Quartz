#!/usr/bin/env python3
"""
Fuseki Helper Script for Digital Garden Knowledge Graph
Provides utilities for interacting with Apache Jena Fuseki SPARQL endpoint.
"""

import requests
import json
from typing import Dict, List, Any, Optional

class FusekiClient:
    def __init__(self, base_url: str = "http://localhost:3030", dataset: str = "digital_garden"):
        self.base_url = base_url.rstrip('/')
        self.dataset = dataset
        self.query_endpoint = f"{self.base_url}/{dataset}/sparql"
        self.update_endpoint = f"{self.base_url}/{dataset}/update"
        self.data_endpoint = f"{self.base_url}/{dataset}/data"
    
    def upload_jsonld(self, file_path: str, graph_uri: Optional[str] = None) -> bool:
        """Upload JSON-LD file to Fuseki."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = f.read()
            
            headers = {'Content-Type': 'application/ld+json'}
            
            url = self.data_endpoint
            if graph_uri:
                url += f"?graph={graph_uri}"
            
            response = requests.post(url, data=data, headers=headers)
            
            if response.status_code in [200, 201, 204]:
                print(f"✓ Successfully uploaded {file_path}")
                return True
            else:
                print(f"✗ Upload failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"✗ Error uploading file: {e}")
            return False
    
    def query(self, sparql_query: str) -> Optional[Dict]:
        """Execute SPARQL SELECT query."""
        try:
            headers = {'Accept': 'application/sparql-results+json'}
            data = {'query': sparql_query}
            
            response = requests.post(self.query_endpoint, data=data, headers=headers)
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"✗ Query failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"✗ Error executing query: {e}")
            return None
    
    def update(self, sparql_update: str) -> bool:
        """Execute SPARQL UPDATE query."""
        try:
            headers = {'Content-Type': 'application/sparql-update'}
            
            response = requests.post(self.update_endpoint, data=sparql_update, headers=headers)
            
            if response.status_code in [200, 204]:
                print("✓ Update executed successfully")
                return True
            else:
                print(f"✗ Update failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"✗ Error executing update: {e}")
            return False
    
    def test_connection(self) -> bool:
        """Test connection to Fuseki server."""
        try:
            response = requests.get(f"{self.base_url}/$/ping")
            if response.status_code == 200:
                print("✓ Fuseki server is reachable")
                return True
            else:
                print(f"✗ Fuseki server responded with: {response.status_code}")
                return False
        except Exception as e:
            print(f"✗ Cannot reach Fuseki server: {e}")
            return False

def main():
    """Main function with example usage."""
    print("Digital Garden Fuseki Helper")
    print("=" * 40)
    
    client = FusekiClient()
    
    # Test connection
    if not client.test_connection():
        print("\nMake sure Fuseki is running on http://localhost:3030")
        return
    
    # Example queries
    sample_queries = {
        "1. Count all concepts": """
            PREFIX : <http://darrenzal.net/kg/ontology/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            
            SELECT (COUNT(?concept) as ?count) WHERE {
                ?concept a :Concept .
            }
        """,
        
        "2. List all article types": """
            PREFIX : <http://darrenzal.net/kg/ontology/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            
            SELECT ?type ?title ?summary WHERE {
                ?article a ?type ;
                         dcterms:title ?title ;
                         :hasSummary ?summary .
                FILTER(?type != <http://www.w3.org/2002/07/owl#Thing>)
            }
            ORDER BY ?type ?title
        """,
        
        "3. Find relationships from Knowledge Graph": """
            PREFIX : <http://darrenzal.net/kg/ontology/>
            PREFIX base: <http://darrenzal.net/kg/resource/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            
            SELECT ?predicate ?object ?title WHERE {
                base:KnowledgeGraph ?predicate ?objectNode .
                ?objectNode dcterms:title ?title .
                BIND(STRAFTER(STR(?predicate), "http://darrenzal.net/kg/ontology/") as ?object)
            }
        """,
        
        "4. Find all technologies": """
            PREFIX : <http://darrenzal.net/kg/ontology/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            
            SELECT ?tech ?title ?summary WHERE {
                ?tech a :Technology ;
                      dcterms:title ?title ;
                      :hasSummary ?summary .
            }
            ORDER BY ?title
        """,
        
        "5. Explore semantic triples": """
            PREFIX : <http://darrenzal.net/kg/ontology/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            
            SELECT ?subject ?predicate ?object WHERE {
                ?subject ?predicate ?object .
                FILTER(STRSTARTS(STR(?predicate), "http://darrenzal.net/kg/ontology/"))
                FILTER(!ISBLANK(?object))
            }
            LIMIT 20
        """
    }
    
    print("\nAvailable sample queries:")
    for key, query in sample_queries.items():
        print(f"  {key}")
    
    # Interactive mode
    while True:
        print("\nOptions:")
        print("  upload  - Upload JSON-LD file")
        print("  query   - Run a sample query")
        print("  custom  - Enter custom SPARQL query")
        print("  quit    - Exit")
        
        choice = input("\nEnter your choice: ").strip().lower()
        
        if choice == "quit":
            break
        elif choice == "upload":
            file_path = input("Enter JSON-LD file path [/Users/darrenzal/Quartz/export/knowledge_graph.jsonld]: ").strip()
            if not file_path:
                file_path = "/Users/darrenzal/Quartz/export/knowledge_graph.jsonld"
            
            graph_uri = input("Enter graph URI (optional): ").strip() or None
            client.upload_jsonld(file_path, graph_uri)
            
        elif choice == "query":
            print("\nSample queries:")
            for key, _ in sample_queries.items():
                print(f"  {key}")
            
            query_choice = input("Enter query number: ").strip()
            query_key = next((k for k in sample_queries.keys() if k.startswith(query_choice)), None)
            
            if query_key:
                print(f"\nExecuting: {query_key}")
                print("-" * 50)
                result = client.query(sample_queries[query_key])
                if result:
                    print_query_results(result)
            else:
                print("Invalid query number")
                
        elif choice == "custom":
            print("\nEnter your SPARQL query (end with empty line):")
            query_lines = []
            while True:
                line = input()
                if not line:
                    break
                query_lines.append(line)
            
            custom_query = "\n".join(query_lines)
            if custom_query.strip():
                result = client.query(custom_query)
                if result:
                    print_query_results(result)

def print_query_results(result: Dict):
    """Pretty print SPARQL query results."""
    if 'results' in result and 'bindings' in result['results']:
        bindings = result['results']['bindings']
        
        if not bindings:
            print("No results found.")
            return
        
        # Get column headers
        headers = list(bindings[0].keys()) if bindings else []
        
        # Print headers
        print(" | ".join(f"{h:20}" for h in headers))
        print("-" * (22 * len(headers)))
        
        # Print rows
        for binding in bindings:
            row = []
            for header in headers:
                value = binding.get(header, {}).get('value', '')
                # Truncate long URIs
                if len(value) > 20 and value.startswith('http'):
                    value = "..." + value[-17:]
                row.append(f"{value:20}")
            print(" | ".join(row))
        
        print(f"\nFound {len(bindings)} results.")
    else:
        print("Unexpected result format:")
        print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()