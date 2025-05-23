#!/usr/bin/env python3
"""
YAML to JSON-LD Conversion Script for Digital Garden Knowledge Graph
Transforms structured YAML frontmatter from Markdown files into JSON-LD format
suitable for ingestion into a graph database.
"""

import os
import re
import yaml
import json
from pathlib import Path
from urllib.parse import quote
from typing import Dict, List, Any, Optional

# Configuration
CONTENT_DIR = "/Users/darrenzal/Quartz/content"
ONTOLOGY_PREFIX = "http://darrenzal.net/kg/ontology/"
RESOURCE_BASE_IRI = "http://darrenzal.net/kg/resource/"
OUTPUT_DIR = "/Users/darrenzal/Quartz/export"
OUTPUT_FILE = f"{OUTPUT_DIR}/knowledge_graph.jsonld"

class DigitalGardenConverter:
    def __init__(self):
        self.prefix_map = {
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "owl": "http://www.w3.org/2002/07/owl#",
            "schema": "http://schema.org/",
            "skos": "http://www.w3.org/2004/02/skos/core#",
            "dcterms": "http://purl.org/dc/terms/"
        }
        self.graph_nodes = []
        
    def filename_to_iri(self, filename: str) -> str:
        """Convert filename to IRI."""
        name = filename.replace(".md", "")
        return RESOURCE_BASE_IRI + quote(name)
    
    def term_to_iri(self, term_str: str, current_node_iri: Optional[str] = None) -> str:
        """Convert term string to full IRI."""
        if term_str == "self":
            return current_node_iri if current_node_iri else ""
        
        if term_str.startswith(":"):
            # Properly encode the term part after the colon
            encoded_term = quote(term_str[1:].replace(" ", "_"))
            return ONTOLOGY_PREFIX + encoded_term
        
        if ":" in term_str and not term_str.startswith("http"):
            parts = term_str.split(':', 1)
            if parts[0] in self.prefix_map:
                # Properly encode the term part after the prefix
                encoded_term = quote(parts[1].replace(" ", "_"))
                return self.prefix_map[parts[0]] + encoded_term
            else:
                # Handle unknown prefixes or external references
                return term_str
        
        if term_str.endswith(".md"):
            return self.filename_to_iri(term_str)
        
        if term_str.startswith("http://") or term_str.startswith("https://"):
            return term_str
        
        # For terms that contain spaces or special characters
        if " " in term_str or any(c in term_str for c in ['(', ')', '[', ']', '{', '}', '<', '>', '"', "'"]):
            # Check if this should be an IRI based on context
            # Only convert to IRI if it's a simple technical term (common case: "network analytics", "machine learning", etc.)
            simple_tech_terms = ["network analytics", "machine learning", "artificial intelligence", "knowledge commons"]
            if any(tech_term in term_str.lower() for tech_term in simple_tech_terms):
                # Convert to IRI with proper encoding
                encoded_term = quote(term_str.replace(" ", "_"))
                return RESOURCE_BASE_IRI + encoded_term
            elif not any(c in term_str for c in ['(', ')', '[', ']', '{', '}', '<', '>', '"', "'", ',', '.', '!', '?']):
                # It's a simple term with spaces but no complex punctuation - convert to IRI
                encoded_term = quote(term_str.replace(" ", "_"))
                return RESOURCE_BASE_IRI + encoded_term
            else:
                # It's a complex literal value - keep as literal
                return term_str
        
        # For simple terms without spaces, create IRIs
        if not term_str.startswith("http") and not ":" in term_str:
            return RESOURCE_BASE_IRI + quote(term_str.replace(" ", "_"))
        
        # Assume it's a literal value
        return term_str
    
    def extract_frontmatter(self, filepath: str) -> Optional[Dict]:
        """Extract YAML frontmatter from markdown file."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if not content.startswith("---"):
                return None
            
            parts = content.split("---", 2)
            if len(parts) < 3:
                return None
            
            frontmatter = yaml.safe_load(parts[1])
            return frontmatter if frontmatter else None
            
        except Exception as e:
            print(f"Error reading {filepath}: {e}")
            return None
    
    def process_file(self, filepath: str) -> Optional[Dict]:
        """Process a single markdown file and convert to JSON-LD node."""
        filename = os.path.basename(filepath)
        frontmatter = self.extract_frontmatter(filepath)
        
        if not frontmatter:
            print(f"No frontmatter found in {filename}")
            return None
        
        node_iri = self.filename_to_iri(filename)
        node_json = {"@id": node_iri}
        
        # Process basic metadata
        if "title" in frontmatter:
            node_json["dcterms:title"] = frontmatter["title"]
        
        if "date" in frontmatter:
            node_json["dcterms:date"] = str(frontmatter["date"])
        
        if "summary" in frontmatter:
            node_json[f"{ONTOLOGY_PREFIX}hasSummary"] = frontmatter["summary"]
        
        if "aliases" in frontmatter and isinstance(frontmatter["aliases"], list):
            node_json[f"{ONTOLOGY_PREFIX}hasAlias"] = frontmatter["aliases"]
        
        if "type" in frontmatter:
            type_iri = self.term_to_iri(frontmatter["type"], node_iri)
            node_json["@type"] = type_iri
        
        # Process relationships
        if "relationships" in frontmatter:
            for rel in frontmatter["relationships"]:
                if not isinstance(rel, dict):
                    continue
                
                predicate = rel.get("predicate")
                obj = rel.get("object")
                
                if not predicate or not obj:
                    continue
                
                predicate_iri = self.term_to_iri(predicate, node_iri)
                object_iri = self.term_to_iri(obj, node_iri)
                
                if predicate_iri not in node_json:
                    node_json[predicate_iri] = []
                
                rel_obj = {"@id": object_iri}
                if "description" in rel:
                    rel_obj["rdfs:comment"] = rel["description"]
                
                node_json[predicate_iri].append(rel_obj)
        
        # Process semantic triples
        if "semantic_triples" in frontmatter:
            for triple in frontmatter["semantic_triples"]:
                if not isinstance(triple, dict):
                    continue
                
                subject = triple.get("subject")
                predicate = triple.get("predicate")
                obj = triple.get("object")
                
                if not all([subject, predicate, obj]):
                    continue
                
                s_iri = self.term_to_iri(subject, node_iri)
                p_iri = self.term_to_iri(predicate, node_iri)
                
                # Handle subjects that need proper IRIs
                if not s_iri.startswith("http"):
                    s_iri = self.term_to_iri(subject, node_iri)
                
                # Determine if object is IRI or literal
                if isinstance(obj, str) and (obj.endswith(".md") or obj.startswith("http") or 
                                           (":" in obj and not obj.startswith("http")) or obj == "self"):
                    o_resolved = {"@id": self.term_to_iri(obj, node_iri)}
                else:
                    o_resolved = obj  # Literal value
                
                if s_iri == node_iri:
                    # Triple about the current node
                    if p_iri not in node_json:
                        node_json[p_iri] = []
                    node_json[p_iri].append(o_resolved)
                else:
                    # Triple about another subject - only create proper IRI nodes
                    if s_iri.startswith("http"):
                        subject_node = next((n for n in self.graph_nodes if n["@id"] == s_iri), None)
                        if not subject_node:
                            subject_node = {"@id": s_iri}
                            self.graph_nodes.append(subject_node)
                        
                        if p_iri not in subject_node:
                            subject_node[p_iri] = []
                        subject_node[p_iri].append(o_resolved)
        
        return node_json
    
    def merge_or_add_node(self, new_node: Dict):
        """Merge new node with existing or add to graph."""
        node_id = new_node["@id"]
        existing_idx = next((idx for idx, n in enumerate(self.graph_nodes) 
                           if n["@id"] == node_id), -1)
        
        if existing_idx != -1:
            # Merge with existing node
            existing_node = self.graph_nodes[existing_idx]
            for key, value in new_node.items():
                if key in existing_node and isinstance(existing_node[key], list):
                    if isinstance(value, list):
                        existing_node[key].extend(value)
                    else:
                        existing_node[key].append(value)
                else:
                    existing_node[key] = value
        else:
            self.graph_nodes.append(new_node)
    
    def process_all_files(self):
        """Process all markdown files in the content directory."""
        md_files = [f for f in os.listdir(CONTENT_DIR) if f.endswith('.md')]
        processed_count = 0
        
        print(f"Found {len(md_files)} markdown files to process...")
        
        for filename in md_files:
            filepath = os.path.join(CONTENT_DIR, filename)
            try:
                node = self.process_file(filepath)
                if node:
                    self.merge_or_add_node(node)
                    processed_count += 1
                    print(f"✓ Processed {filename}")
                else:
                    print(f"⚠ Skipped {filename} (no valid frontmatter)")
            except Exception as e:
                print(f"✗ Error processing {filename}: {e}")
        
        print(f"\nSuccessfully processed {processed_count} files")
        return processed_count > 0
    
    def create_jsonld_context(self) -> Dict:
        """Create JSON-LD context."""
        context = {
            "@vocab": ONTOLOGY_PREFIX,
            "base": RESOURCE_BASE_IRI,
            "@base": RESOURCE_BASE_IRI
        }
        
        # Add standard prefixes
        context.update(self.prefix_map)
        
        # Add custom mappings for common properties
        context.update({
            "title": "dcterms:title",
            "date": "dcterms:date",
            "summary": "hasSummary",
            "aliases": {"@id": "hasAlias", "@container": "@list"}
        })
        
        return context
    
    def export_jsonld(self) -> bool:
        """Export processed nodes to JSON-LD file."""
        try:
            # Ensure export directory exists
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            
            # Create JSON-LD document
            jsonld_doc = {
                "@context": self.create_jsonld_context(),
                "@graph": self.graph_nodes
            }
            
            # Write to file
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(jsonld_doc, f, indent=2, ensure_ascii=False)
            
            print(f"\n✓ JSON-LD exported to {OUTPUT_FILE}")
            print(f"  - Total nodes: {len(self.graph_nodes)}")
            print(f"  - File size: {os.path.getsize(OUTPUT_FILE)} bytes")
            
            return True
            
        except Exception as e:
            print(f"✗ Error exporting JSON-LD: {e}")
            return False

def main():
    """Main execution function."""
    print("Digital Garden YAML to JSON-LD Converter")
    print("=" * 50)
    
    converter = DigitalGardenConverter()
    
    # Process all files
    if not converter.process_all_files():
        print("No files were successfully processed. Exiting.")
        return False
    
    # Export to JSON-LD
    if not converter.export_jsonld():
        print("Failed to export JSON-LD. Exiting.")
        return False
    
    print("\n🎉 Conversion completed successfully!")
    print(f"You can now load {OUTPUT_FILE} into your graph database.")
    
    return True

if __name__ == "__main__":
    main()