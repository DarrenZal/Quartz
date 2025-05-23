# Semantic Knowledge Graph Implementation

This folder contains the implementation details and documentation for the semantic knowledge graph functionality added to Quartz v4.

## Overview

The semantic knowledge graph enhancement transforms Quartz from a simple wiki-link graph into a rich knowledge graph that can express complex semantic relationships through YAML frontmatter.

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

## Future Enhancements

Potential improvements could include:
- RDF export capabilities
- SPARQL query interface
- Enhanced entity typing
- Relationship inference
- Import from external ontologies
- Visual relationship editing

## Technical Notes

- Compatible with existing Quartz themes
- Maintains backward compatibility
- Extensible relationship vocabulary
- Supports complex knowledge modeling
- Integrates with existing Quartz workflow