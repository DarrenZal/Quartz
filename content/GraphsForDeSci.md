---
title: Discourse Graphs for DeSci
backlinks: true
---

Decentralized Science (DeSci) seeks to address issues in traditional scientific practices around funding, publishing, and collaboration. Discourse graphs provide an elegant framework that can support the full spectrum of scientific work - from synthesizing existing research to mapping out and funding new frontiers.
## Why Do We Need New Tools?

The traditional scientific process faces several challenges:
- Research collaboration is disincentivized by the "first author claims all" paradigm
- High-quality experimental work often goes uncredited when it's "just" supporting other papers
- Traditional publication methods delay sharing valuable insights until a complete narrative is formed
- Current knowledge systems can't effectively map the functions of scientific knowledge to specific societal outcomes
- Research funding lacks efficient markets for impact and risk-taking
- Effective synthesis of scientific knowledge is rare and published syntheses are scarce and almost never updated [Chan, 2021]
- The process of synthesizing research is extremely time-consuming and arduous for individual researchers [Chan, 2021]

## Graph-Based Science: From Simple to Sophisticated

### A Foundation: [Discourse graphs](https://ask.pubpub.org/about)

```mermaid
graph BT
    S[Source]
    E[Evidence]
    Q[Question]
    C[Claim]

    S -->|"substantiate/contextualize"| E
    E -->|"support/oppose"| C
    C -->|"synthesizes"| E
    E -->|"inform/generate"| Q
    C -->|"inform/generate"| Q
    
    style Q fill:#ffd700,color:#000
    style C fill:#00cc99,color:#000
    style E fill:#ff1493,color:#000
    style S fill:#ffffff,color:#000
```

At their core, discourse graphs provide a simple yet powerful framework:
- Questions that drive inquiry
- Claims that propose answers
- Evidence that supports claims
- Clear links between these elements
- Granular representation at the claim level while preserving crucial context
- Ability to decompose complex arguments while maintaining connections to supporting evidence [Chan, 2021]

This simple structure enables:
- Early sharing of progress
- Building upon others' work effectively
- Tracking contributions transparently
- Facilitating decentralized coordination and peer review
- Understanding and properly interpreting findings across different domains

### An Extension: Research Roadmapping

```mermaid
graph BT
    S[Source]
    E[Evidence]
    C[Claim]
    Q[Question]
    
    RD[Research Direction]
    G[Goal State]
    OP[Open Problems]
    M[Market Constraints]
    IV[Intervention Points]
    O[Outcome]
    H[Hypothesis]
    EX[Experiment]
    
    S -->|"substantiate"| E
    E -->|"support/oppose"| C
    E -->|"inform/generate"| Q
    C -->|"inform/generate"| Q
    
    G -->|"defines"| Q
    RD -->|"guides"| Q
    RD -->|"identifies"| OP
    OP -->|"blocks"| G
    M -->|"constrains"| G
    IV -->|"enables"| O
    O -->|"achieves"| G
    
    RD -->|"generates"| H
    H -->|"guides"| EX
    EX -->|"produces"| E
    EX -->|"validates/refutes"| H
    H -->|"proposes"| IV
    
    C -->|"validates"| RD
    C -->|"addresses"| OP
    C -->|"establishes"| M
    C -->|"proposes"| IV
    E -->|"identifies"| M
    E -->|"suggests"| IV
    
    M -->|"informs"| IV
    RD -->|"considers"| M
    
    style Q fill:#ffd700,color:#000
    style C fill:#00cc99,color:#000
    style E fill:#ff1493,color:#000
    style S fill:#ffffff,color:#000
    style G fill:#8a2be2,color:#fff
    style M fill:#ff6347,color:#000
    style OP fill:#4682b4,color:#fff
    style RD fill:#32cd32,color:#000
    style IV fill:#dda0dd,color:#000
    style O fill:#ffa500,color:#000
    style H fill:#FFA07A,color:#000
    style EX fill:#87CEEB,color:#000
```

The basic discourse graph framework can be extended to accomodate discourse in various aspects of science, for example a goal-oriented model for research roadmapping. This extension might add several key capabilities:

1. **Goal-Oriented Structure**
   - Define clear goal states and their essential properties
   - Map pathways from current knowledge to desired outcomes
   - Identify constraints and potential solutions
   - Track both technical and commercial viability

2. **Strategic Elements**
   - Open problems blocking progress
   - Research directions and approaches
   - Market constraints and opportunities
   - Logical relationships (AND/OR) between elements

3. **Applied Science Coordination**
   - Track market and scientific research findings
   - Enable cross-domain communication
   - Support venture creation
   - Identify non-obvious intervention points

### Integration with Web3

DeSci Discourse Graphs can naturally integrate with Web3 in key ways:

**Impact Certificates**
   - Researchers can issue certificates for proposed initiatives
   - Claims in certificates supported by discourse graphs
   - Roadmaps identify high-leverage funding opportunities
   - Enable transparent markets for scientific impact
   - Support risk-sharing across multiple funders

**Decentralized Knowledge Graphs**

- Host discourse graphs on decentralized infrastructure like <a href="https://origintrail.io/blog/announcing-the-id-theory-desci-ipo-initial-paranet-offering" target="_blank">DeSci Knowledge Graph</a> 
- Ensure knowledge is discoverable, verifiable, and properly attributed
- Enable AI services to interact with verified knowledge without hallucination
- Support knowledge mining and incentivization through tokens
- Create foundation for autonomous research agents

The combination of discourse graphs with OriginTrail's DeSci Knowledge Graph creates powerful new capabilities:

1. Automated Knowledge Mining

   • AI services process scientific papers into initial discourse graphs
   
   • Knowledge miners validate and refine AI-generated discourse
   
   • Progressive improvement of automated parsing via feedback loops
   
   • Preservation of attribution and provenance through transformation chains


2. Verifiable Knowledge Integration

   • Clear tracking of knowledge origins and transformations

   • Support for both symbolic and neural AI capabilities

   • Creation of trusted foundations for autonomous research

3. Enhanced AI Services

   • Structure-aware scientific chat interfaces that can:
      - Navigate between claims, evidence, and questions naturally
      - Explain the chain of reasoning behind scientific conclusions
      - Identify gaps in evidence or logical connections
      - Generate targeted research questions based on knowledge gaps

   • Improved retrieval-augmented generation (dRAG) through:
      - Context-aware citation of supporting evidence
      - Clear distinction between claims and evidence in responses
      - Ability to traverse related research across domains
      - Generation of structured knowledge from conversations


4. Collaborative Knowledge Mining

   • Enhanced mining incentives through:
      - Rewards for creating high-quality discourse structures
      - Bonuses for connecting previously isolated knowledge areas
      - Recognition for identifying key claims and evidence
      - Incentives for validating AI-generated structures

   • Peer review mechanisms:
      - Validation of claim-evidence relationships
      - Assessment of cross-domain connections
      - Tracking of knowledge reuse and impact

This integration creates a foundation for truly autonomous scientific research, where AI agents can:
- Navigate verified scientific knowledge
- Generate testable hypotheses
- Design experimental protocols
- Synthesize findings across domains
- Propose new research directions
- While maintaining clear provenance and attribution

### Integration with Civic Knowledge Commons
DeSci discourse graphs could be integrated with [Civic Knowledge Networks](DiscourseGraphs):

**Civic Knowledge Networks Integration**
   - Enable bottom-up scientific processes through community participation
   - Bridge academic research with practical civic applications
   - Support decentralized societal infrastructure development through evidence-based practices
   - Enable citizen science and local knowledge contribution
   - Transform scientific process from top-down to participatory model

## A Discourse Graph Analysis

What benefits do graph-based knowledge systems offer for DeSci?
<details>
<summary>Enable efficient research markets</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Support impact certificate issuance and trading<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Create transparent attribution of contributions<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Enable price discovery for research outcomes<br/>
</details>
<details>
<summary>Support strategic planning</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Map pathways through research roadmaps<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Identify high-leverage opportunities<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- De-risk ambitious research through market mechanisms<br/>
</details>
<details>
<summary>Foster collaboration and innovation</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Track contributions across complex projects<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Enable specialized labor and expertise<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Support cross-domain knowledge integration<br/>

</details>
</details>

How can research roadmaps enhance basic discourse graphs?
<details>
<summary>Add goal-oriented structure</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Connect research to desired outcomes<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Identify critical pathways and bottlenecks<br/>
</details>
<details>
<summary>Enable strategic planning</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Map technical and commercial constraints<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Identify promising research directions<br/>
</details>
<details>
<summary>Support impact evaluation</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Track progress toward goals<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Measure contribution significance<br/>
</details>
</details>

What role can AI play in these systems?
<details>
<summary>Enhance system efficiency</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Help evaluate potential impact<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Identify promising research directions<br/>
</details>
<details>
<summary>Support graph maintenance</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Classify and connect different types of nodes<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Track relationships between contributions<br/>
</details>
<details>
<summary>Enable semantic reasoning</summary>
&nbsp;&nbsp;&nbsp;&nbsp;- Connect goals to potential approaches<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- Identify non-obvious intervention points<br/>

</details>

## Cross-Domain Integration
Discourse graphs offer a powerful solution to one of science's greatest challenges: the increasing specialization and fragmentation of knowledge. While specialization has driven scientific progress, it has also created silos that make it difficult to address complex, interdisciplinary challenges. Discourse graphs can help bridge these divides by:

- Representing knowledge at the claim level, making it easier to connect related ideas across different domains
- Preserving crucial context that helps researchers understand and properly interpret findings from other fields
- Enabling exploration of connections that might be missed in traditional keyword-based searches, as discourse graphs go beyond simple keyword matching that requires shared terminology [Chan, 2021]
- Supporting the synthesis of knowledge across disciplinary boundaries to address complex societal challenges
- Overcoming the limitations of traditional search methods that rely on stable, shared understanding of terminology across fields [Chan, 2021]

This framework is particularly valuable as we face increasingly complex challenges that require integrating insights from multiple scientific domains. The ability to synthesize research across all of science is crucial for addressing the needs of the day and the goals of tomorrow.

## Moving Forward

To advance graph-based DeSci, we need:

1. **Core Framework Development**
   - Refine the basic discourse graph structure
   - Create standards for extensions
   - Develop best practices for different use cases
   - Address the challenges of synthesizing knowledge across disciplines

2. **Tool Development**
   - Build flexible platforms supporting the core framework and extensions
   - Create user-friendly interfaces
   - Enable impact tracking and attribution
   - Support certificate issuance and trading
   - Develop tools that reduce the individual overhead of synthesis work

3. **Market Development**
   - Create efficient markets for impact certificates
   - Develop risk-sharing mechanisms
   - Build tools for impact evaluation
   - Enable proper valuation of synthesis work and cross-domain integration

4. **Community Building**
   - Foster collaboration between researchers and funders
   - Share best practices across domains
   - Create spaces for experimental funding models
   - Encourage and reward cross-disciplinary synthesis efforts

The future of science is decentralized, and graph-based knowledge systems provide a flexible, extensible framework for making that future a reality. By starting with the simple, universal structure of discourse graphs and extending for various functions of science such as research roadmapping, we can create a more effective, collaborative, and impact-driven scientific ecosystem that properly incentivizes and rewards ambitious research while facilitating crucial cross-domain synthesis.


<script src="https://giscus.app/client.js"
        data-repo="DarrenZal/Quartz"
        data-repo-id="R_kgDONJp5NA"
        data-category="Announcements"
        data-category-id="DIC_kwDONJp5NM4Cj_Fw"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark_dimmed"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>

---
References:
- "Discourse Graphs and the Future of Science" (https://research.protocol.ai/blog/2023/discourse-graphs-and-the-future-of-science/)
- "The Outcomes Graph: A Protocol for Applied Science Coordination" (https://deepscienceventures.com/content/the-outcomes-graph-2)*
- Chan, J. (2021). "Discourse Graphs for Augmented Knowledge Synthesis: What and Why"*