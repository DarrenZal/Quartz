# Semantic Knowledge Graph Schema

This document defines the YAML frontmatter schema used for semantic knowledge graph functionality.

## Frontmatter Structure

### Basic Article Schema
```yaml
---
title: "Article Title"
type: ":ArticleType"
summary: "Brief description of the article"
date: 2024-01-01
aliases: ["alternative name", "another alias"]
backlinks: true

relationships:
  - predicate: :relationshipType
    object: target
    description: "Optional description"

semantic_triples:
  - subject: source
    predicate: :relationshipType
    object: target
---
```

## Relationships Array

### Structure
```yaml
relationships:
  - predicate: :predicateName
    object: targetEntity
    description: "Human-readable description"
```

### Fields
- **predicate**: The relationship type (prefixed with `:`)
- **object**: Target entity (can be file.md or entity name)
- **description**: Optional human-readable explanation

### Example
```yaml
relationships:
  - predicate: :relatedTo
    object: KnowledgeGraph.md
    description: "Discourse graphs are a specialized form of knowledge graph"
  - predicate: :usesTechnology
    object: IPFS
    description: "Uses IPFS for decentralized storage"
```

## Semantic Triples Array

### Structure
```yaml
semantic_triples:
  - subject: subjectEntity
    predicate: :predicateName
    object: objectEntity
```

### Special Values
- **"self"**: Refers to the current document
- **Entity names**: External concepts, technologies, organizations
- **File references**: Other markdown files (with .md extension)

### Examples
```yaml
semantic_triples:
  # This document is a type of something
  - subject: self
    predicate: :isa
    object: "methodology"
  
  # Something uses this document
  - subject: "AI systems"
    predicate: :leverages
    object: self
  
  # Relationship between external entities
  - subject: "Wikipedia"
    predicate: :usesTechnology
    object: "MediaWiki"
```

## Predicate Vocabulary

### Core Predicates
- `:relatedTo` - General relationship
- `:isa` - Type/classification relationship
- `:usesTechnology` - Technology dependency
- `:leverages` - Building upon or using
- `:enables` - Enablement relationship
- `:supports` - Support relationship

### Domain-Specific Predicates
- `:exploresConcept` - Conceptual exploration
- `:mentions` - Mentions or references
- `:implements` - Implementation relationship
- `:extends` - Extension relationship
- `:influences` - Influence relationship

### Research-Specific Predicates
- `:basedOn` - Founded on previous work
- `:validates` - Provides validation for
- `:challenges` - Challenges or critiques
- `:synthesizes` - Combines multiple sources

## Entity Types

### File Entities
- Reference other markdown files
- Must include `.md` extension in object field
- Automatically creates navigable nodes

### Semantic Entities
- External concepts, technologies, organizations
- No corresponding markdown files
- Creates display-only nodes
- Examples: "React", "IPFS", "Wikipedia", "DAOs"

### Type Entities
- Abstract types and categories
- Often used with `:isa` predicate
- Examples: "methodology", "technology", "framework"

## Best Practices

### Naming Conventions
- Use consistent entity names across files
- Prefer specific over generic terms
- Use proper capitalization for known entities

### Relationship Selection
- Choose most specific predicate available
- Use `:relatedTo` only when no specific relationship applies
- Be consistent with predicate usage across files

### Entity References
- Always include `.md` for file references
- Use exact entity names for consistency
- Consider creating entities for important concepts even without files

### Documentation
- Include description fields for complex relationships
- Use clear, concise language
- Document entity choices in project documentation

## Validation

### Required Fields
- `predicate` is required in all relationships and triples
- Either `relationships` or `semantic_triples` should be present for knowledge graph participation

### Optional Fields
- `description` in relationships
- All frontmatter fields are optional except those needed for basic Quartz functionality

### Error Handling
- Invalid entity references are logged but don't break rendering
- Missing predicates default to `:relatedTo`
- Malformed YAML is ignored gracefully

## Extension

### Custom Predicates
Add domain-specific predicates by:
1. Using consistent naming convention (`:customPredicate`)
2. Documenting in project schema
3. Using consistently across related files

### Custom Entity Types
Define entity types for your domain:
- Research areas
- Technologies
- Organizations
- Geographic regions
- Time periods

This schema enables rich semantic modeling while maintaining simplicity and extensibility.