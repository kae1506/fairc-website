import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import ScrambleText from "./components/ScrambleText";

export const metadata: Metadata = {
  title: "FAIRC | Fundamental AI Research Collective",
};

const navLinks = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#interests", label: "Interests" },
  { href: "#inquiry", label: "Inquiry" },
  { href: "#artifacts", label: "Artifacts" },
  { href: "#collective", label: "Collective" },
];

const meta: [string, string, string] = [
  "EST. 2026",
  "SPONSOR: SIMBO.AI",
  "AFFILIATION: LEAP",
];

export default function Home() {
  return (
    <>
      <Sidebar navLinks={navLinks} meta={meta} />

      <main>
        {/* Manifesto */}
        <header id="manifesto" className="hero">
          <span className="hero-label">Manifesto // 001</span>
          <h1>
            <ScrambleText
              text={"Fundamental AI\nResearch Collective."}
              scrambleOnMount
            />
          </h1>
          <p>
            FAIRC is a research collective for fundamental AI research. We work
            at the boundary of theory and experiment, driven by the conviction
            that the deepest questions in artificial intelligence—how it learns,
            what it represents, and how we ensure it remains aligned—require
            rigorous, first-principles investigation.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            Our scope is broad by design. We pursue any line of inquiry that
            advances the mechanistic understanding of intelligent systems: from
            the mathematics of representation to the biology of cognition, from
            the safety of deployment to the dynamics of embodied agents. The
            projects we are locked in on today are a starting point, not a
            boundary.
          </p>
        </header>

        {/* Research Interests */}
        <section id="interests">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="01 — Research Interests" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Empirical &amp; Modern Innovation</h3>
                <p>
                  We target the frontier where current systems fracture:
                  long-horizon agency, episodic memory, and state tracking over
                  extended interactions. Our work begins with the concrete
                  failure modes of today&apos;s strongest models—loss of
                  coherence in multi-step reasoning, inability to maintain world
                  models over time, and the brittleness of tool use. Alongside
                  building, we are equally interested in explaining:
                  characterizing the mechanics of in-context learning and
                  disentangling the variables that drive emergent capabilities so
                  that progress becomes a predictable science rather than a
                  lottery.
                </p>
              </article>
              <article className="entry">
                <h3>Neuroscience-Inspired Intelligence</h3>
                <p>
                  The brain solves problems that deep learning still cannot:
                  continual learning without catastrophic forgetting, one-shot
                  generalization, and energy-efficient inference. We study the
                  computational principles of neural circuits—sparse distributed
                  coding, predictive error minimization, Hebbian plasticity,
                  columnar organization—to extract architecturally useful
                  inductive biases. The goal is not biomimicry, but identifying
                  which neuroscientific principles translate into concrete
                  improvements in artificial systems.
                </p>
              </article>
              <article className="entry">
                <h3>Mathematical Foundations</h3>
                <p>
                  Why does a specific architecture work? We treat this as a
                  search problem: training is search over function space,
                  architecture design is search over the space of possible
                  inductive biases, and both are constrained by
                  information-theoretic and computational limits. We pursue
                  mathematical frameworks that explain why certain architectures
                  and training methods succeed—connecting phenomena like
                  grokking, superposition, and scaling laws to fundamental
                  constraints on learnability—with the explicit aim of using
                  these theories to design better systems rather than merely
                  describe existing ones.
                </p>
              </article>
              <article className="entry">
                <h3>AI Safety &amp; Alignment</h3>
                <p>
                  Alignment is a structural property, not a wrapper. We tackle
                  the hard problems of scalable oversight and deceptive
                  alignment: how do we verify systems that are smarter than us,
                  and how do we detect when a model is gaming its reward
                  function? Our interpretability research (routing-based
                  monosemanticity, circuit discovery) builds the necessary tools
                  for this verification—allowing us to inspect internal reasoning
                  chains, detect instrumental convergence before it manifests in
                  behavior, and ensure that our models remain truthful even when
                  unobserved.
                </p>
              </article>
              <article className="entry">
                <h3>Reinforcement Learning &amp; Robotics</h3>
                <p>
                  Sequential decision-making under uncertainty remains one of
                  the hardest open problems in AI. We work on RL from both ends:
                  the theoretical side (sample complexity bounds,
                  exploration-exploitation in high-dimensional state spaces,
                  offline RL with distribution shift) and the applied side
                  (sim-to-real transfer, learned dynamics models, and
                  contact-rich manipulation where current policies consistently
                  fail).
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Current Inquiry */}
        <section id="inquiry">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="02 — Current Inquiry" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>
                  Breaking Superposition
                  <br />
                  with Learned Routing
                </h3>
                <p>
                  In standard neural networks, individual neurons encode
                  multiple unrelated features in superposition—a consequence of
                  networks learning more features than they have dimensions. This
                  &quot;polysemanticity&quot; makes interpretability difficult.
                  Our approach scales the FFN hidden dimension massively (e.g.,
                  32,000 neurons vs. the standard 768) while enforcing extreme
                  sparsity—activating only 30–50 relevant neurons per token.
                </p>
                <p>
                  This architecture dramatically reduces FLOPs compared to dense
                  baselines. By decoupling parameter count from compute, we
                  allow models to possess vast specialized knowledge without the
                  computational cost of activating the entire network for every
                  token. While research from Anthropic suggests Sparse
                  Autoencoders (SAEs) can extract these features post-hoc, we
                  aim to bake this &quot;monosemanticity&quot; directly into the
                  model—ensuring each neuron represents a single, crisp concept
                  rather than a polysemantic soup.
                </p>
              </article>
              <article className="entry">
                <h3>Token Deep Memory</h3>
                <p>
                  Standard attention scales quadratically because it treats
                  every token as equally important. We view memory as a dynamic
                  mix of proper tokens and compressed &quot;gists.&quot; In our
                  architecture, blocks of historical tokens are continuously
                  averaged into summary embeddings h̄ = (1/k) ∑ hᵢ, preserving
                  the semantic idea while discarding high-frequency detail. This
                  allows the model to maintain massive contexts by holding most
                  information in a compressed state, only accessing the full
                  fidelity of specific memory fragments when necessary for the
                  current reasoning step.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Artifacts */}
        <section id="artifacts">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="03 — Artifacts" className="block" />
            </div>
            <div className="section-content">
              <article className="entry feature-card">
                <h3>OpenLanguageModel</h3>
                <span className="subtitle">OPEN_SOURCE_FRAMEWORK</span>
                <p>
                  A modular, transparent PyTorch framework for building,
                  training, and experimenting with transformer-based language
                  models. OLM is designed for researchers who want full control
                  over their architectures without unnecessary abstraction.
                </p>
                <Link href="/openlm" className="hover-link">
                  READ FULL DOCUMENTATION ↗
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Collective */}
        <section id="collective">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="04 — Collective" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <p>
                  FAIRC is a distributed collective of researchers. We are
                  affiliated with{" "}
                  <a href="#" className="hover-link">
                    LEAP
                  </a>{" "}
                  (Plaksha University&apos;s AI Club) and proudly supported by{" "}
                  <a href="#" className="hover-link">
                    SIMBO.AI
                  </a>
                  .
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    marginTop: "2rem",
                  }}
                >
                  // ROSTER_INITIALIZING...
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-brand">
            <div>FAIRC © 2026</div>
            <div className="footer-sub">FUNDAMENTAL AI RESEARCH COLLECTIVE</div>
          </div>
          <div className="footer-links">
            <a href="#manifesto">Manifesto</a>
            <a href="#interests">Interests</a>
            <a href="#artifacts">Artifacts</a>
            <a href="#collective">Collective</a>
            <Link href="/openlm">OLM ↗</Link>
          </div>
          <div className="footer-meta">
            <div>Sponsor: SIMBO.AI</div>
            <div>Affiliation: LEAP</div>
            <a
              href="https://github.com/openlanguagemodel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link"
            >
              GitHub ↗
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
