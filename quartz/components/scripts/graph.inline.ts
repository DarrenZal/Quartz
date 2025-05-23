import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import {
  SimulationNodeDatum,
  SimulationLinkDatum,
  Simulation,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  forceCollide,
  zoomIdentity,
  select,
  drag,
  zoom,
} from "d3"
import { Text, Graphics, Application, Container, Circle } from "pixi.js"
import { Group as TweenGroup, Tween as Tweened } from "@tweenjs/tween.js"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { D3Config } from "../Graph"

type GraphicsInfo = {
  color: string
  gfx: Graphics
  alpha: number
  active: boolean
}

type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
} & SimulationNodeDatum

type SimpleLinkData = {
  source: SimpleSlug
  target: SimpleSlug
  label?: string
  type?: string
}

type LinkData = {
  source: NodeData
  target: NodeData
  label?: string
  type?: string
} & SimulationLinkDatum<NodeData>

type LinkRenderData = GraphicsInfo & {
  simulationData: LinkData
  labelText?: Text
}

type NodeRenderData = GraphicsInfo & {
  simulationData: NodeData
  label: Text
}

const localStorageKey = "graph-visited"
function getVisited(): Set<SimpleSlug> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"))
}

function addToVisited(slug: SimpleSlug) {
  const visited = getVisited()
  visited.add(slug)
  localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
}

type TweenNode = {
  update: (time: number) => void
  stop: () => void
}

async function renderGraph(container: string, fullSlug: FullSlug) {
  const slug = simplifySlug(fullSlug)
  const visited = getVisited()
  const graph = document.getElementById(container)
  if (!graph) return
  removeAllChildren(graph)

  let {
    drag: enableDrag,
    zoom: enableZoom,
    depth,
    scale,
    repelForce,
    centerForce,
    linkDistance,
    fontSize,
    opacityScale,
    removeTags,
    showTags,
    focusOnHover,
    showKnowledgeGraph,
  } = JSON.parse(graph.dataset["cfg"]!) as D3Config

  // Check toggle state for knowledge graph mode
  const toggleElement = document.getElementById("knowledge-graph-toggle") as HTMLInputElement
  const isKnowledgeGraphMode = toggleElement?.checked ?? showKnowledgeGraph ?? false

  const data: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )
  
  const links: SimpleLinkData[] = []
  const tags: SimpleSlug[] = []
  const validLinks = new Set(data.keys())

  const tweens = new Map<string, TweenNode>()
  for (const [source, details] of data.entries()) {
    if (isKnowledgeGraphMode) {
      // Knowledge graph mode: use semantic relationships from YAML frontmatter
      if (details.frontmatter?.relationships) {
        for (const rel of details.frontmatter.relationships) {
          const targetSlug = simplifySlug(rel.object?.replace(/\.md$/, "") as FullSlug)
          // In knowledge graph mode, include all relationships, even to non-file entities
          links.push({ 
            source: source, 
            target: targetSlug,
            label: rel.predicate || "relatedTo",
            type: "relationship"
          })
          
        }
      }
      
      if (details.frontmatter?.semantic_triples) {
        for (const triple of details.frontmatter.semantic_triples) {
          let sourceSlug: SimpleSlug | undefined
          let targetSlug: SimpleSlug | undefined
          
          if (triple.subject === "self") {
            // Self-referential triples where this document is the subject
            sourceSlug = source
            if (triple.object?.endsWith?.('.md')) {
              targetSlug = simplifySlug(triple.object.replace(/\.md$/, "") as FullSlug)
            } else if (triple.object && !triple.object.includes(' ')) {
              // Simple entity names without spaces
              targetSlug = simplifySlug(triple.object as FullSlug)
            }
          } else if (triple.object === "self") {
            // Triples where this document is the object
            targetSlug = source
            if (triple.subject?.endsWith?.('.md')) {
              sourceSlug = simplifySlug(triple.subject.replace(/\.md$/, "") as FullSlug)
            } else if (triple.subject && !triple.subject.includes(' ')) {
              // Simple entity names without spaces
              sourceSlug = simplifySlug(triple.subject as FullSlug)
            }
          } else {
            // Triples between other entities
            if (triple.subject?.endsWith?.('.md') && triple.object?.endsWith?.('.md')) {
              sourceSlug = simplifySlug(triple.subject.replace(/\.md$/, "") as FullSlug)
              targetSlug = simplifySlug(triple.object.replace(/\.md$/, "") as FullSlug)
            } else if (triple.subject && triple.object && 
                      !triple.subject.includes(' ') && !triple.object.includes(' ')) {
              // Simple entity names without spaces
              sourceSlug = simplifySlug(triple.subject as FullSlug)
              targetSlug = simplifySlug(triple.object as FullSlug)
            }
          }
          
          if (sourceSlug && targetSlug) {
            links.push({ 
              source: sourceSlug, 
              target: targetSlug,
              label: triple.predicate || "relatedTo",
              type: "semantic_triple"
            })
            
          }
        }
      }
    } else {
      // Standard mode: use wiki-style links
      const outgoing = details.links ?? []

      for (const dest of outgoing) {
        if (validLinks.has(dest)) {
          links.push({ source: source, target: dest, type: "wikilink" })
        }
      }
    }

    if (showTags && !isKnowledgeGraphMode) {
      const localTags = details.tags
        .filter((tag) => !removeTags.includes(tag))
        .map((tag) => simplifySlug(("tags/" + tag) as FullSlug))

      tags.push(...localTags.filter((tag) => !tags.includes(tag)))

      for (const tag of localTags) {
        links.push({ source: source, target: tag, type: "tag" })
      }
    }
  }


  const neighbourhood = new Set<SimpleSlug>()
  
  if (isKnowledgeGraphMode) {
    // In knowledge graph mode, include all nodes that are connected by semantic relationships
    neighbourhood.add(slug) // Always include current page
    for (const link of links) {
      neighbourhood.add(link.source)
      neighbourhood.add(link.target)
    }
    
    // Also add semantic entities that don't have corresponding files
    for (const [source, details] of data.entries()) {
      if (details.frontmatter?.relationships) {
        for (const rel of details.frontmatter.relationships) {
          const targetSlug = simplifySlug(rel.object?.replace(/\.md$/, "") as FullSlug)
          neighbourhood.add(source)
          neighbourhood.add(targetSlug) // Add even if not a valid link
        }
      }
      
      if (details.frontmatter?.semantic_triples) {
        for (const triple of details.frontmatter.semantic_triples) {
          if (triple.subject === "self") {
            neighbourhood.add(source)
            if (triple.object && !triple.object.includes(' ')) { // Simple entities only
              const targetSlug = simplifySlug(triple.object.replace(/\.md$/, "") as FullSlug)
              neighbourhood.add(targetSlug)
            }
          } else if (triple.object === "self") {
            neighbourhood.add(source)
            if (triple.subject && !triple.subject.includes(' ')) { // Simple entities only
              const sourceSlug = simplifySlug(triple.subject.replace(/\.md$/, "") as FullSlug)
              neighbourhood.add(sourceSlug)
            }
          }
        }
      }
    }
  } else {
    // Standard mode: use depth-based neighbourhood calculation
    const wl: (SimpleSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
    if (depth >= 0) {
      while (depth >= 0 && wl.length > 0) {
        // compute neighbours
        const cur = wl.shift()!
        if (cur === "__SENTINEL") {
          depth--
          wl.push("__SENTINEL")
        } else {
          neighbourhood.add(cur)
          const outgoing = links.filter((l) => l.source === cur)
          const incoming = links.filter((l) => l.target === cur)
          wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source))
        }
      }
    } else {
      validLinks.forEach((id) => neighbourhood.add(id))
      if (showTags) tags.forEach((tag) => neighbourhood.add(tag))
    }
  }

  const nodes = [...neighbourhood].map((url) => {
    const nodeData = data.get(url)
    let text: string
    
    if (url.startsWith("tags/")) {
      text = "#" + url.substring(5)
    } else if (nodeData?.title) {
      text = nodeData.title
    } else {
      // For semantic entities without files, use a cleaned-up version of the slug
      text = url.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
    }
    
    return {
      id: url,
      text,
      tags: nodeData?.tags ?? [],
    }
  })
  const filteredLinks = links.filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target))
  
  const mappedLinks = []
  for (const l of filteredLinks) {
    const sourceNode = nodes.find((n) => n.id === l.source)
    const targetNode = nodes.find((n) => n.id === l.target)
    if (sourceNode && targetNode) {
      mappedLinks.push({
        source: sourceNode,
        target: targetNode,
        label: l.label,
        type: l.type,
      })
    }
  }
  
  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes,
    links: mappedLinks,
  }
  

  // we virtualize the simulation and use pixi to actually render it
  const simulation: Simulation<NodeData, LinkData> = forceSimulation<NodeData>(graphData.nodes)
    .force("charge", forceManyBody().strength(-100 * repelForce))
    .force("center", forceCenter().strength(centerForce))
    .force("link", forceLink(graphData.links).distance(linkDistance))
    .force("collide", forceCollide<NodeData>((n) => nodeRadius(n)).iterations(3))

  const width = graph.offsetWidth
  const height = Math.max(graph.offsetHeight, 250)

  // precompute style prop strings as pixi doesn't support css variables
  const cssVars = [
    "--secondary",
    "--tertiary",
    "--gray",
    "--light",
    "--lightgray",
    "--dark",
    "--darkgray",
    "--bodyFont",
  ] as const
  const computedStyleMap = cssVars.reduce(
    (acc, key) => {
      acc[key] = getComputedStyle(document.documentElement).getPropertyValue(key)
      return acc
    },
    {} as Record<(typeof cssVars)[number], string>,
  )

  // calculate color
  const color = (d: NodeData) => {
    const isCurrent = d.id === slug
    if (isCurrent) {
      return computedStyleMap["--secondary"]
    } else if (visited.has(d.id) || d.id.startsWith("tags/")) {
      return computedStyleMap["--tertiary"]
    } else {
      return computedStyleMap["--gray"]
    }
  }

  function nodeRadius(d: NodeData) {
    const numLinks = graphData.links.filter(
      (l) => l.source.id === d.id || l.target.id === d.id,
    ).length
    return 2 + Math.sqrt(numLinks)
  }

  let hoveredNodeId: string | null = null
  let hoveredNeighbours: Set<string> = new Set()
  const linkRenderData: LinkRenderData[] = []
  const nodeRenderData: NodeRenderData[] = []
  function updateHoverInfo(newHoveredId: string | null) {
    hoveredNodeId = newHoveredId

    if (newHoveredId === null) {
      hoveredNeighbours = new Set()
      for (const n of nodeRenderData) {
        n.active = false
      }

      for (const l of linkRenderData) {
        l.active = false
      }
    } else {
      hoveredNeighbours = new Set()
      for (const l of linkRenderData) {
        const linkData = l.simulationData
        if (linkData.source.id === newHoveredId || linkData.target.id === newHoveredId) {
          hoveredNeighbours.add(linkData.source.id)
          hoveredNeighbours.add(linkData.target.id)
        }

        l.active = linkData.source.id === newHoveredId || linkData.target.id === newHoveredId
      }

      for (const n of nodeRenderData) {
        n.active = hoveredNeighbours.has(n.simulationData.id)
      }
    }
  }

  let dragStartTime = 0
  let dragging = false

  function renderLinks() {
    tweens.get("link")?.stop()
    const tweenGroup = new TweenGroup()

    for (const l of linkRenderData) {
      let alpha = 1

      // if we are hovering over a node, we want to highlight the immediate neighbours
      // with full alpha and the rest with default alpha
      if (hoveredNodeId) {
        alpha = l.active ? 1 : 0.2
      }

      l.color = l.active ? computedStyleMap["--gray"] : computedStyleMap["--lightgray"]
      tweenGroup.add(new Tweened<LinkRenderData>(l).to({ alpha }, 200))
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("link", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderLabels() {
    tweens.get("label")?.stop()
    const tweenGroup = new TweenGroup()

    const defaultScale = 1 / scale
    const activeScale = defaultScale * 1.1
    for (const n of nodeRenderData) {
      const nodeId = n.simulationData.id

      if (hoveredNodeId === nodeId) {
        tweenGroup.add(
          new Tweened<Text>(n.label).to(
            {
              alpha: 1,
              scale: { x: activeScale, y: activeScale },
            },
            100,
          ),
        )
      } else {
        tweenGroup.add(
          new Tweened<Text>(n.label).to(
            {
              alpha: n.label.alpha,
              scale: { x: defaultScale, y: defaultScale },
            },
            100,
          ),
        )
      }
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("label", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderNodes() {
    tweens.get("hover")?.stop()

    const tweenGroup = new TweenGroup()
    for (const n of nodeRenderData) {
      let alpha = 1

      // if we are hovering over a node, we want to highlight the immediate neighbours
      if (hoveredNodeId !== null && focusOnHover) {
        alpha = n.active ? 1 : 0.2
      }

      tweenGroup.add(new Tweened<Graphics>(n.gfx, tweenGroup).to({ alpha }, 200))
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("hover", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderPixiFromD3() {
    renderNodes()
    renderLinks()
    renderLabels()
  }

  tweens.forEach((tween) => tween.stop())
  tweens.clear()

  const app = new Application()
  await app.init({
    width,
    height,
    antialias: true,
    autoStart: false,
    autoDensity: true,
    backgroundAlpha: 0,
    preference: "webgpu",
    resolution: window.devicePixelRatio,
    eventMode: "static",
  })
  graph.appendChild(app.canvas)

  const stage = app.stage
  stage.interactive = false

  const labelsContainer = new Container<Text>({ zIndex: 3 })
  const nodesContainer = new Container<Graphics>({ zIndex: 2 })
  const linkContainer = new Container<Graphics>({ zIndex: 1 })
  stage.addChild(nodesContainer, labelsContainer, linkContainer)

  for (const n of graphData.nodes) {
    const nodeId = n.id

    const label = new Text({
      interactive: false,
      eventMode: "none",
      text: n.text,
      alpha: 0,
      anchor: { x: 0.5, y: 1.2 },
      style: {
        fontSize: fontSize * 15,
        fill: computedStyleMap["--dark"],
        fontFamily: computedStyleMap["--bodyFont"],
      },
      resolution: window.devicePixelRatio * 4,
    })
    label.scale.set(1 / scale)

    let oldLabelOpacity = 0
    const isTagNode = nodeId.startsWith("tags/")
    const gfx = new Graphics({
      interactive: true,
      label: nodeId,
      eventMode: "static",
      hitArea: new Circle(0, 0, nodeRadius(n)),
      cursor: "pointer",
    })
      .circle(0, 0, nodeRadius(n))
      .fill({ color: isTagNode ? computedStyleMap["--light"] : color(n) })
      .stroke({ width: isTagNode ? 2 : 0, color: color(n) })
      .on("pointerover", (e) => {
        updateHoverInfo(e.target.label)
        oldLabelOpacity = label.alpha
        if (!dragging) {
          renderPixiFromD3()
        }
      })
      .on("pointerleave", () => {
        updateHoverInfo(null)
        label.alpha = oldLabelOpacity
        if (!dragging) {
          renderPixiFromD3()
        }
      })

    nodesContainer.addChild(gfx)
    labelsContainer.addChild(label)

    const nodeRenderDatum: NodeRenderData = {
      simulationData: n,
      gfx,
      label,
      color: color(n),
      alpha: 1,
      active: false,
    }

    nodeRenderData.push(nodeRenderDatum)
  }

  
  for (const l of graphData.links) {
    const gfx = new Graphics({ interactive: false, eventMode: "none" })
    linkContainer.addChild(gfx)

    // Create edge label for knowledge graph mode
    let labelText: Text | undefined
    if (isKnowledgeGraphMode && l.label) {
      labelText = new Text({
        interactive: false,
        eventMode: "none",
        text: l.label.replace(/^:/, ""), // Remove colon prefix if present
        alpha: 0.7,
        anchor: { x: 0.5, y: 0.5 },
        style: {
          fontSize: fontSize * 8,
          fill: computedStyleMap["--gray"],
          fontFamily: computedStyleMap["--bodyFont"],
        },
        resolution: window.devicePixelRatio * 2,
      })
      labelText.scale.set(1 / scale)
      labelsContainer.addChild(labelText)
    }

    const linkRenderDatum: LinkRenderData = {
      simulationData: l,
      gfx,
      color: isKnowledgeGraphMode 
        ? (l.type === "relationship" ? computedStyleMap["--secondary"] : computedStyleMap["--tertiary"])
        : computedStyleMap["--lightgray"],
      alpha: 1,
      active: false,
      labelText,
    }

    linkRenderData.push(linkRenderDatum)
  }

  let currentTransform = zoomIdentity
  if (enableDrag) {
    select<HTMLCanvasElement, NodeData | undefined>(app.canvas).call(
      drag<HTMLCanvasElement, NodeData | undefined>()
        .container(() => app.canvas)
        .subject(() => graphData.nodes.find((n) => n.id === hoveredNodeId))
        .on("start", function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(1).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
          event.subject.__initialDragPos = {
            x: event.subject.x,
            y: event.subject.y,
            fx: event.subject.fx,
            fy: event.subject.fy,
          }
          dragStartTime = Date.now()
          dragging = true
        })
        .on("drag", function dragged(event) {
          const initPos = event.subject.__initialDragPos
          event.subject.fx = initPos.x + (event.x - initPos.x) / currentTransform.k
          event.subject.fy = initPos.y + (event.y - initPos.y) / currentTransform.k
        })
        .on("end", function dragended(event) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
          dragging = false

          // if the time between mousedown and mouseup is short, we consider it a click
          if (Date.now() - dragStartTime < 500) {
            const node = graphData.nodes.find((n) => n.id === event.subject.id) as NodeData
            // Only navigate if this node has a corresponding file
            if (data.has(node.id)) {
              const targ = resolveRelative(fullSlug, node.id)
              window.spaNavigate(new URL(targ, window.location.toString()))
            }
          }
        }),
    )
  } else {
    for (const node of nodeRenderData) {
      node.gfx.on("click", () => {
        // Only navigate if this node has a corresponding file
        if (data.has(node.simulationData.id)) {
          const targ = resolveRelative(fullSlug, node.simulationData.id)
          window.spaNavigate(new URL(targ, window.location.toString()))
        }
      })
    }
  }

  if (enableZoom) {
    select<HTMLCanvasElement, NodeData>(app.canvas).call(
      zoom<HTMLCanvasElement, NodeData>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({ transform }) => {
          currentTransform = transform
          stage.scale.set(transform.k, transform.k)
          stage.position.set(transform.x, transform.y)

          // zoom adjusts opacity of labels too
          const scale = transform.k * opacityScale
          let scaleOpacity = Math.max((scale - 1) / 3.75, 0)
          const activeNodes = nodeRenderData.filter((n) => n.active).flatMap((n) => n.label)

          for (const label of labelsContainer.children) {
            if (!activeNodes.includes(label)) {
              label.alpha = scaleOpacity
            }
          }
        }),
    )
  }

  function animate(time: number) {
    for (const n of nodeRenderData) {
      const { x, y } = n.simulationData
      if (!x || !y) continue
      n.gfx.position.set(x + width / 2, y + height / 2)
      if (n.label) {
        n.label.position.set(x + width / 2, y + height / 2)
      }
    }

    let renderedLinks = 0
    let validCoords = 0
    for (const l of linkRenderData) {
      const linkData = l.simulationData
      l.gfx.clear()
      
      // Check coordinate validity
      const hasValidCoords = linkData.source.x !== undefined && linkData.source.y !== undefined && 
          linkData.target.x !== undefined && linkData.target.y !== undefined
      
      if (hasValidCoords) {
        validCoords++
        l.gfx.moveTo(linkData.source.x! + width / 2, linkData.source.y! + height / 2)
        l.gfx
          .lineTo(linkData.target.x! + width / 2, linkData.target.y! + height / 2)
          .stroke({ 
            alpha: l.alpha, 
            width: 2, // Always use thick lines for debugging
            color: l.color 
          })
        renderedLinks++
      }
      
      // Position edge label at midpoint of link
      if (l.labelText && hasValidCoords) {
        const midX = (linkData.source.x! + linkData.target.x!) / 2 + width / 2
        const midY = (linkData.source.y! + linkData.target.y!) / 2 + height / 2
        l.labelText.position.set(midX, midY)
      }
    }
    

    tweens.forEach((t) => t.update(time))
    app.renderer.render(stage)
    requestAnimationFrame(animate)
  }

  const graphAnimationFrameHandle = requestAnimationFrame(animate)
  window.addCleanup(() => cancelAnimationFrame(graphAnimationFrameHandle))
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  addToVisited(simplifySlug(slug))
  
  // Add toggle event listener first
  const toggleElement = document.getElementById("knowledge-graph-toggle") as HTMLInputElement
  if (toggleElement) {
    // Remove any existing listeners to avoid duplicates
    toggleElement.removeEventListener("change", () => {})
    toggleElement.addEventListener("change", () => {
      renderGraph("graph-container", slug)
    })
  }
  
  await renderGraph("graph-container", slug)

  // Function to re-render the graph when the theme changes
  const handleThemeChange = () => {
    renderGraph("graph-container", slug)
  }

  // event listener for theme change
  document.addEventListener("themechange", handleThemeChange)

  // cleanup for the event listener
  window.addCleanup(() => {
    document.removeEventListener("themechange", handleThemeChange)
  })

  const container = document.getElementById("global-graph-outer")
  const sidebar = container?.closest(".sidebar") as HTMLElement

  function renderGlobalGraph() {
    const slug = getFullSlug(window)
    container?.classList.add("active")
    if (sidebar) {
      sidebar.style.zIndex = "1"
    }

    renderGraph("global-graph-container", slug)
    registerEscapeHandler(container, hideGlobalGraph)
  }

  function hideGlobalGraph() {
    container?.classList.remove("active")
    if (sidebar) {
      sidebar.style.zIndex = "unset"
    }
  }

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      const globalGraphOpen = container?.classList.contains("active")
      globalGraphOpen ? hideGlobalGraph() : renderGlobalGraph()
    }
  }

  const containerIcon = document.getElementById("global-graph-icon")
  containerIcon?.addEventListener("click", renderGlobalGraph)
  window.addCleanup(() => containerIcon?.removeEventListener("click", renderGlobalGraph))

  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
})
