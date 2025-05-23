# Quartz v4 with Semantic Knowledge Graph

> "[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important." — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

This fork extends Quartz with **semantic knowledge graph functionality**, enabling rich semantic relationships and knowledge visualization through YAML frontmatter.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## ✨ Semantic Knowledge Graph Features

This enhanced version of Quartz includes powerful semantic knowledge graph capabilities that transform your content into a true knowledge graph with labeled relationships and semantic entities.

### 🎯 Key Features

- **Dual Graph Modes**: Toggle between standard wiki-link graph and semantic knowledge graph
- **Semantic Relationships**: Define relationships in YAML frontmatter using `relationships` array
- **Semantic Triples**: Express complex knowledge using `semantic_triples` for RDF-like statements
- **Edge Labels**: Visual representation of relationship types (`:relatedTo`, `:usesTechnology`, `:leverages`, etc.)
- **Semantic Entities**: Nodes for concepts, technologies, organizations that don't have corresponding files
- **Rich Visualization**: Color-coded links and comprehensive knowledge mapping

### 🚀 Usage

#### Standard Wiki Links
The default mode shows traditional `[[wikilink]]` connections between your markdown files.

#### Semantic Knowledge Graph Mode
Toggle the "Knowledge Graph" switch to reveal rich semantic relationships defined in your YAML frontmatter.

#### Defining Relationships in Frontmatter

```yaml
---
title: "Your Article"
relationships:
  - predicate: :relatedTo
    object: OtherArticle.md
    description: "How they're related"
  - predicate: :usesTechnology
    object: SomeTechnology
    description: "Usage description"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "concept type"
  - subject: "external entity"
    predicate: :enables
    object: self
---
```

#### Relationship Types
Common relationship predicates include:
- `:relatedTo` - General relationships
- `:usesTechnology` - Technology dependencies
- `:leverages` - Building upon concepts
- `:isa` - Type relationships
- `:enables` - Enablement relationships
- `:supports` - Support relationships
- `:exploresConcept` - Conceptual exploration

### 🛠 Development

#### Building
```bash
npx quartz build
```

#### Local Development
Since Quartz v4 doesn't include a built-in serve command, use a simple HTTP server:
```bash
# After building
python3 -m http.server 8000 -d public
# or
cd public && npx serve
```

### 📁 Architecture

The semantic knowledge graph functionality is implemented through:
- **Graph Component**: Enhanced `quartz/components/Graph.tsx` with toggle UI
- **Graph Script**: Extended `quartz/components/scripts/graph.inline.ts` with semantic processing
- **Content Index**: Modified `quartz/plugins/emitters/contentIndex.ts` to preserve frontmatter
- **Styling**: Updated `quartz/components/styles/graph.scss` with toggle controls

📖 **Detailed Documentation**: See the [`semanticKnowledgeGraph/`](./semanticKnowledgeGraph/) folder for:
- [Implementation Details](./semanticKnowledgeGraph/README.md)
- [YAML Schema Reference](./semanticKnowledgeGraph/SCHEMA.md)
- [Usage Examples](./semanticKnowledgeGraph/EXAMPLES.md)

### 🎨 Customization

The semantic knowledge graph respects your Quartz theme:
- **Relationships** use the secondary theme color
- **Semantic triples** use the tertiary theme color  
- **Standard links** use the default light gray

### 📊 Example Use Cases

Perfect for:
- **Bioregional Knowledge Commons**: Mapping place-based knowledge and relationships
- **Research Networks**: Connecting concepts, methodologies, and findings
- **Technology Ecosystems**: Visualizing tool dependencies and relationships
- **Organizational Knowledge**: Mapping institutional relationships and processes
- **Academic Research**: Expressing complex theoretical relationships

This semantic layer transforms your digital garden into a true knowledge graph, enabling rich exploration of conceptual relationships and semantic connections between ideas, entities, and resources.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>