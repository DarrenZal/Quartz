# Semantic Knowledge Graph Examples

This document provides practical examples of using the semantic knowledge graph functionality in various contexts.

## Example 1: Technology Documentation

### File: `React.md`
```yaml
---
title: "React Framework"
type: ":Technology"
summary: "JavaScript library for building user interfaces"

relationships:
  - predicate: :basedOn
    object: JavaScript
    description: "Built on JavaScript language"
  - predicate: :influences
    object: Vue.md
    description: "Influenced Vue.js design"
  - predicate: :usesTechnology
    object: JSX
    description: "Uses JSX for component syntax"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "JavaScript library"
  - subject: self
    predicate: :enables
    object: "component-based UI"
  - subject: "Meta"
    predicate: :maintains
    object: self
---
```

## Example 2: Research Methodology

### File: `ParticipantObservation.md`
```yaml
---
title: "Participant Observation"
type: ":Methodology"
summary: "Ethnographic research method involving researcher participation"

relationships:
  - predicate: :isa
    object: QualitativeResearch.md
    description: "Type of qualitative research method"
  - predicate: :relatedTo
    object: Ethnography.md
    description: "Key method in ethnographic studies"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "research methodology"
  - subject: self
    predicate: :requires
    object: "field access"
  - subject: "anthropologists"
    predicate: :usesTechnology
    object: self
  - subject: self
    predicate: :generates
    object: "qualitative data"
---
```

## Example 3: Organizational Network

### File: `OpenCollective.md`
```yaml
---
title: "Open Collective"
type: ":Organization"
summary: "Platform for transparent funding of open source projects"

relationships:
  - predicate: :serves
    object: OpenSource.md
    description: "Provides funding platform for open source"
  - predicate: :competes
    object: GitHub Sponsors
    description: "Alternative to GitHub's sponsorship platform"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "funding platform"
  - subject: self
    predicate: :enables
    object: "transparent funding"
  - subject: "open source projects"
    predicate: :usesTechnology
    object: self
  - subject: self
    predicate: :supports
    object: "fiscal hosting"
---
```

## Example 4: Bioregional Knowledge

### File: `CascadiaBioregion.md`
```yaml
---
title: "Cascadia Bioregion"
type: ":Place"
summary: "Pacific Northwest bioregion defined by Columbia River watershed"

relationships:
  - predicate: :contains
    object: Seattle.md
    description: "Seattle is located within Cascadia"
  - predicate: :relatedTo
    object: BioregionalKnowledgeCommons.md
    description: "Example of bioregional knowledge system"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "bioregion"
  - subject: self
    predicate: :defined_by
    object: "Columbia River watershed"
  - subject: "Indigenous Peoples"
    predicate: :are_original_inhabitants_of
    object: self
  - subject: self
    predicate: :encompasses
    object: "temperate rainforest"
  - subject: "salmon"
    predicate: :are_keystone_species_in
    object: self
---
```

## Example 5: Academic Concept

### File: `SystemsThinking.md`
```yaml
---
title: "Systems Thinking"
type: ":Concept"
summary: "Holistic approach to analysis focusing on interrelationships"

relationships:
  - predicate: :influences
    object: DesignThinking.md
    description: "Influences design thinking methodology"
  - predicate: :relatedTo
    object: ComplexityScience.md
    description: "Shares foundations with complexity science"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "analytical framework"
  - subject: self
    predicate: :emphasizes
    object: "holistic perspective"
  - subject: "Peter Senge"
    predicate: :popularized
    object: self
  - subject: self
    predicate: :enables
    object: "systems design"
  - subject: "organizational learning"
    predicate: :leverages
    object: self
---
```

## Example 6: Protocol Documentation

### File: `QuadraticFunding.md`
```yaml
---
title: "Quadratic Funding"
type: ":Protocol"
summary: "Democratic funding mechanism that amplifies small donations"

relationships:
  - predicate: :implements
    object: QuadraticVoting.md
    description: "Applies quadratic voting to funding allocation"
  - predicate: :usesTechnology
    object: Blockchain
    description: "Often implemented on blockchain platforms"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "funding mechanism"
  - subject: self
    predicate: :optimizes
    object: "democratic funding"
  - subject: "Gitcoin"
    predicate: :usesTechnology
    object: self
  - subject: self
    predicate: :addresses
    object: "public goods funding"
  - subject: "Vitalik Buterin"
    predicate: :co_authored
    object: self
---
```

## Example 7: Complex Research Network

### File: `MetacrisisResearch.md`
```yaml
---
title: "Metacrisis Research"
type: ":ResearchArea"
summary: "Study of interconnected global challenges and systemic solutions"

relationships:
  - predicate: :synthesizes
    object: SystemsThinking.md
    description: "Applies systems thinking to global challenges"
  - predicate: :relatedTo
    object: ComplexityScience.md
    description: "Uses complexity science frameworks"
  - predicate: :exploresConcept
    object: Regeneration.md
    description: "Explores regenerative approaches to solutions"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "transdisciplinary research"
  - subject: self
    predicate: :addresses
    object: "existential risk"
  - subject: "climate change"
    predicate: :isa
    object: "metacrisis symptom"
  - subject: "social inequality"
    predicate: :isa
    object: "metacrisis symptom"
  - subject: self
    predicate: :requires
    object: "collective intelligence"
  - subject: "Daniel Schmachtenberger"
    predicate: :is_thought_leader_in
    object: self
---
```

## Visualization Patterns

### Hub Nodes
Files with many relationships become visual hubs:
- Technology platforms (React, IPFS)
- Foundational concepts (Systems Thinking)
- Key locations (bioregions)
- Important organizations

### Relationship Clusters
Related concepts form visual clusters:
- Research methodologies
- Technology stacks
- Organizational ecosystems
- Geographic regions

### Cross-Domain Connections
Semantic triples enable connections across domains:
- Technology ↔ Research
- Organizations ↔ Places
- Concepts ↔ Implementations

## Best Practices from Examples

### Entity Consistency
- Use same names across files ("Systems Thinking" not "systems thinking")
- Reference key entities consistently
- Create "authority" files for important concepts

### Relationship Precision
- Choose specific predicates (`:synthesizes` vs `:relatedTo`)
- Use domain-appropriate vocabulary
- Document complex relationships

### Semantic Richness
- Mix file references and external entities
- Use "self" for document-centric statements
- Express both direct and indirect relationships

### Knowledge Architecture
- Design entity networks thoughtfully
- Create conceptual hierarchies with `:isa`
- Show process flows with `:enables`, `:requires`

These examples demonstrate how semantic knowledge graphs can capture rich relationships across diverse domains while maintaining clarity and navigability.