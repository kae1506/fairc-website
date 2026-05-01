---
title: The Polysemanticity Problem
date: 2026-01-12
---

In standard neural networks, individual neurons encode multiple unrelated features in superposition — a consequence of networks learning more features than they have dimensions. This *polysemanticity* makes interpretability difficult: when a single neuron fires for "Paris," "the color blue," and "monetary transactions," no clean causal story exists.

The phenomenon arises from a simple capacity argument. A network with *d* dimensions can represent at most *d* orthogonal features perfectly — but the world contains far more features than any practical hidden dimension can accommodate. Networks resolve this by superimposing features at angles less than 90°, accepting interference as the cost of compression.

## Why This Matters for Alignment

Polysemanticity is not merely an interpretability inconvenience. It means that interventions on individual neurons are unreliable — activating or suppressing a neuron affects multiple concepts simultaneously. Circuit-level analysis becomes a tangle of overlapping influences rather than a clean causal graph.

Scalable oversight requires the ability to inspect and verify internal reasoning chains. A polysemantic model resists this inspection at a fundamental level. Before we can trust that a model is reasoning honestly about a concept, we need to know which neurons *are* that concept — cleanly, with no crosstalk.
