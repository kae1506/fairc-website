---
title: Learned Routing as a Solution
date: 2026-02-08
---

Our approach scales the FFN hidden dimension massively — e.g., 32,000 neurons vs. the standard 768 — while enforcing extreme sparsity: only 30–50 neurons activate per token. With enough neurons to represent features without overlap, superposition becomes unnecessary. The network no longer needs to pack multiple concepts into a single unit.

The routing mechanism is learned end-to-end. A lightweight gating network scores all hidden units for each token and selects the top-*k* by magnitude. Gradients flow only through active neurons, keeping compute proportional to the activation budget rather than the total hidden dimension.

## Compute Profile

The expanded-but-sparse architecture sits on the Pareto frontier of interpretability and efficiency. Parameter count scales with the hidden dimension; compute scales with the activation budget per token. We can increase the former without touching the latter — a property unavailable in any dense architecture.

Preliminary benchmarks show FLOPs comparable to a dense baseline at 1/40th the hidden dimension, with the full 32k-unit model offering 10× more expressive capacity at equivalent inference cost.

## Relation to SAEs

Research from Anthropic demonstrates that Sparse Autoencoders (SAEs) can extract monosemantic features post-hoc from a trained polysemantic model. Our approach differs in intent: rather than decomposing polysemanticity after it forms, we prevent it from forming at all. The routing constraint is part of training, not an analysis tool applied afterward. This means the monosemantic structure is native to the model — available for inspection, intervention, and verification without an external decomposition step.
