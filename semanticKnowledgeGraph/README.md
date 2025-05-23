# Semantic Knowledge Graph Implementation

This folder contains the complete implementation, testing tools, and documentation for the semantic knowledge graph functionality added to Quartz v4.

## Overview

The semantic knowledge graph enhancement transforms Quartz from a simple wiki-link graph into a rich knowledge graph that can express complex semantic relationships through YAML frontmatter. This implementation includes both the frontend visualization components and a complete backend triple store system using Apache Jena Fuseki.

## Quick Start

### 1. Setup and Testing
```bash
# Make the management script executable
chmod +x manage_fuseki.sh

# Start the Fuseki server
./manage_fuseki.sh start

# Load test data
./manage_fuseki.sh load-test-data

# Run comprehensive tests
python3 run_enhanced_tests.py

# Check server status
./manage_fuseki.sh status
```

### 2. Convert Your Content
```bash
# Convert your markdown files to JSON-LD
python3 yaml_to_jsonld.py

# Load your data into Fuseki
curl -X POST -H "Content-Type: application/ld+json" \
  --data-binary @"../export/knowledge_graph.jsonld" \
  "http://localhost:3030/digital_garden/data"
```

## Implementation Details

### Core Components Modified

1. **Graph Component** (`quartz/components/Graph.tsx`)
   - Added toggle switch UI for switching between modes
   - Enhanced configuration interface
   - New graph header with controls

2. **Graph Script** (`quartz/components/scripts/graph.inline.ts`)
   - Dual-mode rendering logic
   - Semantic relationship parsing from frontmatter
   - Edge label rendering for relationship types
   - Semantic entity node creation
   - Enhanced neighborhood calculation for knowledge graph mode

3. **Content Index** (`quartz/plugins/emitters/contentIndex.ts`)
   - Extended ContentDetails type to include frontmatter
   - Preserved full YAML frontmatter in content index
   - Enables semantic data access during graph rendering

4. **Graph Styling** (`quartz/components/styles/graph.scss`)
   - Toggle switch styling
   - Graph header layout
   - Enhanced controls appearance

### Key Features Implemented

#### Dual Graph Modes
- **Standard Mode**: Traditional wiki-link connections (`[[]]`)
- **Knowledge Graph Mode**: Semantic relationships from YAML frontmatter

#### YAML Frontmatter Support
```yaml
relationships:
  - predicate: :relatedTo
    object: TargetFile.md
    description: "Description of relationship"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "entity type"
```

#### Semantic Entity Nodes
- Creates nodes for entities that don't have corresponding files
- Enables visualization of external concepts, technologies, organizations
- Smart text formatting for entity names

#### Edge Labels
- Visual representation of relationship types
- Positioned at link midpoints
- Respects theme colors and scaling

#### Enhanced Navigation
- Only file-based nodes are clickable/navigable
- Semantic entity nodes are visual-only
- Maintains expected navigation behavior

### Data Flow

1. **Content Processing**: Frontmatter preserved in content index
2. **Mode Detection**: Toggle state determines graph mode
3. **Link Generation**: 
   - Standard: Wiki links only
   - Knowledge Graph: YAML relationships + semantic triples
4. **Node Creation**: All entities (files + semantic) become nodes
5. **Rendering**: PIXI.js renders with labels and colors
6. **Interaction**: File nodes navigate, semantic nodes display only

### Color Coding

- **Relationships**: Secondary theme color
- **Semantic Triples**: Tertiary theme color
- **Standard Links**: Light gray (default)

### Performance Considerations

- Semantic processing only active in knowledge graph mode
- Efficient neighbourhood calculation for large graphs
- Optimized PIXI.js rendering with proper cleanup
- Minimal impact on standard mode performance

## Usage Examples

### Basic Relationships
```yaml
relationships:
  - predicate: :usesTechnology
    object: React
  - predicate: :relatedTo
    object: OtherArticle.md
```

### Complex Semantic Triples
```yaml
semantic_triples:
  - subject: self
    predicate: :isa
    object: "methodology"
  - subject: "AI systems"
    predicate: :leverages
    object: self
```

### Research Networks
Perfect for mapping:
- Theoretical relationships
- Methodology dependencies  
- Technology ecosystems
- Organizational connections
- Bioregional knowledge systems

## Files in This Directory

### Core Implementation Files
- **`yaml_to_jsonld.py`** - Converts YAML frontmatter to JSON-LD for triple store ingestion
- **`manage_fuseki.sh`** - Complete Fuseki server management script
- **`run_enhanced_tests.py`** - Comprehensive test suite for the knowledge graph
- **`test_data.jsonld`** - Sample data for testing and demonstration

### Documentation Files
- **`README.md`** - This file - complete setup and usage guide
- **`SCHEMA.md`** - Detailed YAML frontmatter schema specification
- **`EXAMPLES.md`** - Practical examples of semantic relationships
- **`fuseki_setup.md`** - Detailed Fuseki installation and configuration guide

### Query Files
- **`sample_queries.sparql`** - Basic SPARQL queries for exploration
- **`enhanced_queries.sparql`** - Advanced queries for research and analysis
- **`test_queries.py`** - Python script for testing SPARQL functionality

### Helper Scripts
- **`fuseki_helper.py`** - Python utilities for Fuseki interaction
- **`showcase_semantic_data.py`** - Demo script showing semantic capabilities

## System Architecture

### Frontend (Quartz Components)
- **Graph Toggle UI** - Switch between standard and knowledge graph modes
- **Semantic Node Rendering** - Visual representation of entities and relationships  
- **Edge Labels** - Display relationship types on graph connections
- **Enhanced Navigation** - Distinguish between file and semantic entity nodes

### Backend (Triple Store)
- **Apache Jena Fuseki** - SPARQL endpoint and triple store
- **JSON-LD Data Model** - Structured semantic data format
- **Custom Ontology** - Domain-specific relationship vocabulary
- **SPARQL Interface** - Query and analysis capabilities

### Data Pipeline
1. **YAML Frontmatter** → Structured relationships in markdown files
2. **Conversion Script** → `yaml_to_jsonld.py` transforms to JSON-LD
3. **Triple Store** → Fuseki ingests and indexes semantic data
4. **SPARQL Queries** → Analysis and exploration of knowledge graph
5. **Frontend Visualization** → Graph component renders relationships

## Testing and Validation

### Automated Test Suite
```bash
# Run all tests
python3 run_enhanced_tests.py

# Test specific functionality
./manage_fuseki.sh test
```

The test suite includes:
- **Content Type Analysis** - Verify article categorization
- **Relationship Validation** - Check semantic connections
- **Hub Analysis** - Identify central concepts
- **Technology Mapping** - Trace technology usage patterns
- **Bioregional Focus** - Domain-specific knowledge queries

### Manual Testing
```bash
# Start server and load data
./manage_fuseki.sh start
./manage_fuseki.sh load-test-data

# Open web interface
open http://localhost:3030

# Test custom queries
curl -X POST -H "Accept: application/sparql-results+json" \
  --data-urlencode "query=SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 10" \
  http://localhost:3030/digital_garden/sparql
```

## Production Setup

### Prerequisites
- **Java 11+** - Required for Apache Jena Fuseki
- **Python 3.8+** - For conversion and testing scripts
- **curl** - For data loading and API testing

### Installation Steps
1. **Download Fuseki** from [Apache Jena](https://jena.apache.org/download/)
2. **Extract** to `/Users/darrenzal/Quartz/fuseki/` (or update paths in scripts)
3. **Make scripts executable**: `chmod +x manage_fuseki.sh`
4. **Install Python dependencies**: `pip install requests pyyaml`

### Data Workflow
```bash
# 1. Convert your markdown files
python3 yaml_to_jsonld.py

# 2. Start Fuseki server  
./manage_fuseki.sh start

# 3. Load your data
curl -X POST -H "Content-Type: application/ld+json" \
  --data-binary @"../export/knowledge_graph.jsonld" \
  "http://localhost:3030/digital_garden/data"

# 4. Test the system
python3 run_enhanced_tests.py

# 5. Create backups
./manage_fuseki.sh backup
```

## YAML Schema Quick Reference

### Basic Relationship
```yaml
relationships:
  - predicate: :relatedTo
    object: TargetFile.md
    description: "How they're related"
```

### Semantic Triple
```yaml
semantic_triples:
  - subject: self
    predicate: :isa
    object: "concept type"
```

### Common Predicates
- `:relatedTo` - General relationship
- `:usesTechnology` - Technology dependency
- `:isa` - Type/classification
- `:enables` - Enablement relationship
- `:leverages` - Building upon

## Troubleshooting

### Common Issues
- **Server won't start**: Check Java version and port availability
- **Data won't load**: Validate JSON-LD format with `python3 -m json.tool`
- **Queries fail**: Verify server is running with `./manage_fuseki.sh status`
- **Empty results**: Check data was loaded correctly

### Diagnostic Commands
```bash
# Check server status
./manage_fuseki.sh status

# View logs
./manage_fuseki.sh logs

# Test connectivity
curl -s http://localhost:3030/$/ping

# Validate data
python3 -c "import json; print(json.load(open('../export/knowledge_graph.jsonld')))"
```

## Advanced Usage

### Custom Queries
Create domain-specific SPARQL queries in `enhanced_queries.sparql`:
```sparql
PREFIX : <http://darrenzal.net/kg/ontology/>
PREFIX dcterms: <http://purl.org/dc/terms/>

SELECT ?article ?title WHERE {
  ?article dcterms:title ?title ;
           :usesTechnology "React" .
}
```

### Data Integration
- **Export to RDF**: Use Fuseki's built-in export functionality
- **Import external data**: Load additional RDF/JSON-LD files
- **Cross-reference**: Link to external knowledge bases and ontologies

### Performance Optimization
- **Persistent storage**: Use `--loc=databases/` for production
- **Memory allocation**: Increase JVM heap with `-Xmx4g`
- **Query optimization**: Index frequently queried predicates

## Future Enhancements

Potential improvements could include:
- **Advanced inference** - Automated relationship discovery
- **Visual editing** - GUI for relationship management  
- **External integrations** - Wikidata, DBpedia connectivity
- **Real-time sync** - Automatic updates from markdown changes
- **Collaborative features** - Multi-user knowledge building
- **Mobile interface** - Touch-friendly graph exploration

## Technical Notes

- **Thread-safe**: Multiple concurrent SPARQL queries supported
- **Standards compliant**: Uses W3C RDF and SPARQL specifications
- **Extensible**: Custom ontologies and predicates easily added
- **Scalable**: Handles thousands of documents and relationships
- **Cross-platform**: Works on macOS, Linux, and Windows