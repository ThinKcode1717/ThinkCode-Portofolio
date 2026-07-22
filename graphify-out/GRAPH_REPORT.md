# Graph Report - .  (2026-07-22)

## Corpus Check
- 22 files · ~1,500 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 109 nodes · 144 edges · 17 communities (10 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `THINKCODE_DATA` - 11 edges
3. `AnimatedIcon()` - 9 edges
4. `scripts` - 5 edges
5. `include` - 5 edges
6. `lib` - 4 edges
7. `UnderwaterBackground()` - 2 edges
8. `AboutSection()` - 2 edges
9. `ContactSection()` - 2 edges
10. `ExperienceSection()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (17 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (17): devDependencies, @types/node, @types/react, @types/react-dom, typescript, name, private, scripts (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (15): clsx, framer-motion, lucide-react, next, dependencies, clsx, framer-motion, lucide-react (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (3): UnderwaterBackground(), ExperienceSection(), ProjectsSection()

### Community 4 - "Community 4"
Cohesion: 0.32
Nodes (5): AboutSection(), SkillsSection(), AnimatedIcon(), AnimatedIconProps, IconName

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (4): inter, metadata, spaceGrotesk, JsonLd()

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (4): Experience, Project, SkillCategory, Testimonial

### Community 8 - "Community 8"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **54 isolated node(s):** `inter`, `spaceGrotesk`, `metadata`, `IconName`, `AnimatedIconProps` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `inter`, `spaceGrotesk`, `metadata` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._