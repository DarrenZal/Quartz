# Semantic Data Extraction Guidelines

## Overview
This document provides guidelines for extracting structured semantic triples from text files according to the digital garden ontology (`digital_garden_ontology.ttl`). The goal is to create semantically precise, meaningful relationships that support effective knowledge graph queries and reasoning.

## Master Knowledge Graph Integration

### Master Graph Context
The extraction process operates within the context of a **master knowledge graph** located at `/Users/darrenzal/Quartz/export/knowledge_graph.jsonld`. This graph combines knowledge from all processed files and serves as:

- **Reference source**: Check existing entities and relationships before creating new ones
- **Context provider**: Understand how new knowledge relates to existing knowledge
- **Duplication prevention**: Avoid creating redundant entities that already exist
- **Relationship discovery**: Identify connections between new content and existing graph entities

### Integration Guidelines

#### Before Extraction:
1. **Load master graph**: Review existing entities relevant to the new content
2. **Identify overlaps**: Check for existing concepts, entities, or relationships
3. **Plan integration**: Determine how new knowledge will connect to existing nodes

#### During Extraction:
1. **Reference existing entities**: Use established URIs and labels when possible
2. **Build connections**: Create relationships between new and existing entities
3. **Maintain consistency**: Follow naming patterns and relationship types from master graph
4. **Avoid duplication**: Don't recreate entities that already exist with sufficient detail

#### After Extraction:
1. **Merge strategy**: New triples should extend rather than duplicate the master graph
2. **Validation**: Ensure new relationships are coherent with existing knowledge structure
3. **Update master**: The new triples will be integrated into the master knowledge graph

## Core Principles

### 1. Semantic Precision
- **Objects must be specific enough to be meaningful**
- Avoid vague terms like "proposed solution" without context
- Include the domain/scope when necessary

**❌ Poor:**
```yaml
- subject: "pyrolysis"
  predicate: :isa
  object: "proposed solution"
```

**✅ Good:**
```yaml
- subject: "pyrolysis"
  predicate: :addresses
  object: "PFAS contamination crisis"
- subject: "pyrolysis"
  predicate: :addresses
  object: "microplastic contamination crisis"
```

### 2. Property Selection Guidelines

#### Use `:isa` for:
- Type classification: `"PFAS" :isa "forever chemicals"`
- Class membership: `"biosolids" :isa "waste product"`
- Definitional relationships: `"microplastics" :isa "persistent pollutants"`

#### Use `:addresses` for:
- Problems being solved: `"pyrolysis" :addresses "soil contamination"`
- Questions being answered: `"research study" :addresses "efficacy question"`
- Challenges being tackled: `"circular economy" :addresses "resource depletion"`

#### Use `:implements` for:
- Technical realization: `"thermal treatment" :implements "pyrolysis solution"`
- Practical application: `"waste-to-energy plant" :implements "circular economy principles"`

#### Use `:generates` for:
- Causal relationships: `"biosolids application" :generates "soil contamination"`
- Outcomes: `"research" :generates "new findings"`
- Byproducts: `"pyrolysis" :generates "biochar"`

#### Use `:supports` / `:opposes` for:
- Discourse relationships: `"study results" :supports "pyrolysis effectiveness claim"`
- Evidence relationships: `"cost analysis" :opposes "economic viability"`

#### Use `:leverages` for:
- Utilization: `"solution" :leverages "existing infrastructure"`
- Building upon: `"methodology" :leverages "previous research"`

## Domain-Specific Patterns

### Research Documents
```yaml
- subject: self
  predicate: :isa
  object: ":ResearchReport"
- subject: self
  predicate: :addresses
  object: "[specific problem/question]"
- subject: "[methodology]"
  predicate: :implements
  object: "[solution approach]"
```

### Technology/Solutions
```yaml
- subject: "[technology]"
  predicate: :addresses
  object: "[specific problem]"
- subject: "[technology]"
  predicate: :generates
  object: "[specific outcome/byproduct]"
- subject: "[technology]"
  predicate: :leverages
  object: "[existing resource/principle]"
```

### Problems and Evidence
```yaml
- subject: "[current practice]"
  predicate: :generates
  object: "[specific problem]"
- subject: "[evidence]"
  predicate: :supports
  object: "[specific claim]"
- subject: "[finding]"
  predicate: :validates
  object: "[hypothesis/solution]"
```

## Quality Checklist

Before finalizing semantic triples, verify:

1. **Specificity**: Can someone understand the relationship without additional context?
2. **Accuracy**: Does the predicate accurately represent the relationship type?
3. **Consistency**: Are similar relationships expressed using the same patterns?
4. **Completeness**: Are all important relationships captured?
5. **Ontology compliance**: Are the predicates defined in the ontology?

## Common Mistakes to Avoid

### Vague Objects
- ❌ "proposed solution" → ✅ "PFAS contamination solution"
- ❌ "new approach" → ✅ "thermal treatment approach"
- ❌ "better method" → ✅ "resource recovery method"

### Wrong Predicates
- ❌ `"problem" :isa "challenge"` → ✅ `"problem" :isa "environmental challenge"`
- ❌ `"solution" :relatedTo "problem"` → ✅ `"solution" :addresses "problem"`

### Missing Context
- Include domain/scope when objects could be ambiguous
- Reference specific entities rather than general categories when possible

## Examples by Document Type

### Research Papers
```yaml
semantic_triples:
  - subject: self
    predicate: :isa
    object: ":ResearchReport"
  - subject: self
    predicate: :addresses
    object: "PFAS persistence in agricultural soils"
  - subject: "thermal treatment"
    predicate: :addresses
    object: "forever chemical destruction"
  - subject: "study findings"
    predicate: :validates
    object: "pyrolysis effectiveness for PFAS destruction"
```

### Concept Documents
```yaml
semantic_triples:
  - subject: self
    predicate: :isa
    object: ":Concept"
  - subject: "circular economy"
    predicate: :leverages
    object: "waste-to-resource conversion"
  - subject: "localized processing"
    predicate: :implements
    object: "cosmolocalism principles"
```

## Ontology Extension Process

When encountering relationships not covered by the current ontology:

1. **Check existing properties** first - can an existing property work?
2. **Document the gap** - what specific relationship needs expression?
3. **Propose new property** with clear semantics and examples
4. **Add to ontology** with proper RDF definition
5. **Update these guidelines** with usage patterns

This ensures the ontology grows systematically while maintaining semantic consistency.