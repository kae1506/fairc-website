import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import ScrambleText from "../components/ScrambleText";

export const metadata: Metadata = {
  title: "OpenLanguageModel",
  description:
    "OpenLanguageModel — a modular, transparent PyTorch framework for building, training, and experimenting with transformer-based language models.",
  openGraph: {
    title: "OpenLanguageModel (OLM) — FAIRC",
    description:
      "An open source LLM library for everyone. Does for LLMs what PyTorch did for Deep Learning.",
  },
};

const navLinks = [
  { href: "/", label: "← Return to Index" },
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "The Problem" },
  { href: "#simplicity", label: "Simplicity" },
  { href: "#models", label: "Models" },
  { href: "#extensibility", label: "Extensibility" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contribute", label: "Contribute" },
];

const meta: [string, string, string] = [
  "ARTIFACT: OLM",
  "LICENSE: MIT",
  "STATUS: v1.1 READY",
];

const trainingCode = `<span class="code-kw">import</span> sys, os, torch, urllib.request
<span class="code-kw">from</span> torch.utils.data <span class="code-kw">import</span> DataLoader
<span class="code-kw">from</span> tempfile <span class="code-kw">import</span> TemporaryDirectory
<span class="code-kw">from</span> olm <span class="code-kw">import</span> Dataset, HFTokenizer, Trainer, LM

<span class="code-kw">with</span> TemporaryDirectory() <span class="code-kw">as</span> tmp:
    urllib.request.urlretrieve(<span class="code-str">"https://github.com/.../input.txt"</span>,
                              os.path.join(tmp, <span class="code-str">"i.txt"</span>))
    tokenizer, device = HFTokenizer(<span class="code-str">"gpt2"</span>), <span class="code-str">"cuda"</span> <span class="code-kw">if</span> torch.cuda.is_available() <span class="code-kw">else</span> <span class="code-str">"cpu"</span>

    <span class="code-cmt"># Define Model</span>
    model = LM(tokenizer.vocab_size, 64, 4, 2, 33)
    optimizer = torch.optim.AdamW(model.parameters(), 3e-4)

    <span class="code-cmt"># Data &amp; Training</span>
    dataset = Dataset(tmp, tokenizer, 32)
    dataloader = DataLoader(dataset, 4)
    trainer = Trainer(model, optimizer, dataloader, device, 32, use_amp=<span class="code-kw">False</span>)

    losses = trainer.train(1, 10, 100)
    <span class="code-kw">print</span>(f<span class="code-str">"S:{losses[0]:.4f} E:{losses[-1]:.4f} OK:{losses[-1]&lt;losses[0]}"</span>)`;

const activationCode = `<span class="code-kw">import</span> torch
<span class="code-kw">import</span> torch.nn.functional <span class="code-kw">as</span> F
<span class="code-kw">from</span> olm.nn.activations.base <span class="code-kw">import</span> ActivationBase

<span class="code-kw">class</span> <span class="code-fn">SwiGLU</span>(ActivationBase):
    <span class="code-kw">def</span> <span class="code-fn">forward</span>(self, x: torch.Tensor) -&gt; torch.Tensor:
        value, gate = x.chunk(2, dim=-1)
        <span class="code-kw">return</span> value * F.silu(gate)`;

const llama3Code = `Llama3Block = Block([
    Residual(Block([
        RMSNorm(embed_dim, eps=1e-5),
        GroupedQueryAttention(
            embed_dim, num_heads, num_kv_heads, max_seq_len,
            dropout=dropout, rope_theta=rope_theta, use_bias=<span class="code-kw">False</span>
        )
    ])),
    Residual(Block([
        RMSNorm(embed_dim, eps=1e-5),
        SwiGLUFFN(embed_dim, hidden_dim=intermediate_size,
                  dropout=dropout, bias=<span class="code-kw">False</span>)
    ]))
])

Llama3Model = Block([
    Embedding(vocab_size, embed_dim),
    Repeat(<span class="code-kw">lambda</span>: Llama3Block(
        embed_dim, intermediate_size, num_heads, num_kv_heads,
        max_seq_len, dropout, rope_theta
    ), num_layers),
    RMSNorm(embed_dim, eps=1e-5),
    Linear(embed_dim, vocab_size, bias=<span class="code-kw">False</span>)
])`;

export default function OpenLM() {
  return (
    <>
      <Sidebar navLinks={navLinks} meta={meta} />

      <main>
        {/* Hero */}
        <header id="overview" className="hero">
          <span className="hero-label">Artifact // OLM</span>
          <h1>
            <ScrambleText
              text={"OpenLanguage\nModel."}
              scrambleOnMount
            />
          </h1>
          <p>
            An open source LLM library for everyone. Does for LLMs what PyTorch
            did for Deep Learning.
          </p>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            By Keshava, Tavish, Vardhaman — OpenLanguageModel Team
          </p>
        </header>

        {/* The Problem */}
        <section id="problem">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="01 — The Problem" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Why OLM Exists</h3>
                <p>
                  Typical LLM repositories are over 3,000 lines of code. The
                  barrier to entry is enormous: domain specialization is
                  required just to get started. &quot;Which architecture choice
                  is best?&quot; is a question that demands vast, scattered
                  knowledge. There is no central, up-to-date resource for
                  training decent LLMs for beginners. Building language models
                  remains a niche and learned skill.
                </p>
                <p>
                  OLM is the solution:{" "}
                  <strong>simplified, modular, and transparent</strong>.
                </p>
              </article>
              <article className="entry">
                <h3>Two Audiences, One Library</h3>
                <div className="audience-grid">
                  <div>
                    <span className="subtitle">FOR BEGINNERS</span>
                    <p>
                      Very easy to start. Train your own LLMs with minimal
                      setup. No domain specialization required.
                    </p>
                  </div>
                  <div>
                    <span className="subtitle">FOR RESEARCHERS</span>
                    <p>
                      Ability to go super deep. Perfectly optimum architecture
                      changes. Doesn&apos;t compromise ease of use for
                      performance and customizability.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Simplicity */}
        <section id="simplicity">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="02 — Simplicity" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Training in &lt; 15 Lines</h3>
                <div
                  className="code-block"
                  dangerouslySetInnerHTML={{ __html: `<pre><code>${trainingCode}</code></pre>` }}
                />
                <p style={{ marginTop: "1.5rem" }}>
                  Models come from{" "}
                  <code className="inline">olm.models</code>. Data pipelines
                  come from <code className="inline">olm.data</code>. Training
                  orchestration lives in{" "}
                  <code className="inline">olm.train</code>. Start with this
                  structure and gradually customize any part of it.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Replicated Models */}
        <section id="models">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="03 — Replicated Models" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Configurations &amp; Architectures</h3>
                <p>
                  We have automatically replicated submodels for all major
                  families:
                </p>
                <div className="model-grid">
                  {[
                    { name: "LLAMA 3", sizes: "8B · 70B" },
                    { name: "LLAMA 2", sizes: "7B · 13B · 70B" },
                    { name: "PHI-3 / PHI-4", sizes: "Mini (3.8B) · Small (7B) · Medium (14B)" },
                    { name: "QWEN 1.5 / QWEN 2", sizes: "0.5B · 1.8B · 4B · 7B · 14B · 32B · 72B" },
                    { name: "GEMMA 2", sizes: "2B · 9B · 27B" },
                    { name: "GPT-2", sizes: "Small (124M) · Medium (355M) · Large (774M) · XL (1.5B)" },
                    { name: "OPT", sizes: "125M · 1B · 7B · 66B" },
                    { name: "OLMo", sizes: "1B · 7B" },
                  ].map(({ name, sizes }) => (
                    <div key={name} className="model-family">
                      <span className="subtitle">{name}</span>
                      <p className="mono">{sizes}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Extensibility */}
        <section id="extensibility">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="04 — Extensibility" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Standardized Building Blocks</h3>
                <p>
                  All components—Attention, FeedForward, Norms—are modular.
                  Want a new loss function? Simply inherit from the base class
                  and modify <code className="inline">forward()</code>. No need
                  to rewrite the trainer or data pipeline.
                </p>
              </article>
              <article className="entry">
                <h3>Compute Optimal</h3>
                <p>
                  Current version aligns with Chinchilla scaling laws.
                  Near-perfect SOTA GPU MFU utilization (60%). Future versions
                  will continue to prioritize performance.
                </p>
              </article>
              <article className="entry">
                <h3>Example: Custom Activation</h3>
                <div
                  className="code-block"
                  dangerouslySetInnerHTML={{ __html: `<pre><code>${activationCode}</code></pre>` }}
                />
              </article>
              <article className="entry">
                <h3>Example: Complete LLama 3 Architecture</h3>
                <div
                  className="code-block"
                  dangerouslySetInnerHTML={{ __html: `<pre><code>${llama3Code}</code></pre>` }}
                />
              </article>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="05 — Status & Roadmap" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Current Status</h3>
                <p>4 LLMs trained successfully. v1.0 published. v1.1 ready.</p>
              </article>
              <article className="entry">
                <h3>Roadmap</h3>
                <div className="roadmap-list">
                  {[
                    { version: "v1.0", desc: "Foundation & Core Architectures.", done: true },
                    { version: "v1.1", desc: "On-GPU Optimization (FlashAttention, torch.compile), UX & Refinement.", done: true },
                    { version: "v2.0", desc: "Multi-GPU (DDP, FSDP), Mixture of Experts.", done: false },
                    { version: "v2.1", desc: "Distributed Optimization. ZeRO stages, Expert Parallelism. Multiple MoE routing methods and improved training stability from our own experiments.", done: false },
                    { version: "v3.0", desc: "Scaling Out (Multi-Node). Cluster support, Pipeline/Tensor Parallelism.", done: false },
                    { version: "v3.1", desc: '"Open Source" Goal. Reproduce every single open-source LLM recipe (Llama 3, Mistral).', done: false },
                    { version: "v4.0", desc: "Further Training. SFT, LoRA, RLHF.", done: false },
                  ].map(({ version, desc, done }) => (
                    <div key={version} className={`roadmap-item${done ? " done" : ""}`}>
                      <span className="roadmap-version">{version}</span>
                      <span className="roadmap-desc">{desc}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Contribute */}
        <section id="contribute">
          <div className="section-grid">
            <div className="section-title">
              <ScrambleText text="06 — Contribute" className="block" />
            </div>
            <div className="section-content">
              <article className="entry">
                <h3>Call for Contributors</h3>
                <p>
                  We are looking for contributors for documentation &amp; API
                  reference, minor feature additions, website development &amp;
                  outreach, intuitive UX enhancements, and major roadmap
                  features.
                </p>
                <h3 style={{ marginTop: "3rem" }}>Why Contribute?</h3>
                <p>
                  <strong>Become a Lead Developer.</strong> Current team
                  transitioning in 2 months.
                </p>
                <p>
                  <strong>Complete the Pipeline.</strong> Work on SFT
                  (Supervised Fine-Tuning) and RL methods (RLHF, RLVR).
                </p>
                <p>
                  <strong>Grow the Project.</strong> Contact companies for
                  compute sponsorship.
                </p>
                <p>
                  <strong>Research Impact.</strong> Build a scaling library.
                  Successful compute sponsorship → Scaling Laws Paper (high
                  citation potential).
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <a
                    href="https://github.com/openlanguagemodel/openlanguagemodel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-link"
                    style={{ fontSize: "1.2rem" }}
                  >
                    GITHUB REPOSITORY ↗
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-brand">
            <div>FAIRC © 2026</div>
            <div className="footer-sub">OPEN SCIENCE INITIATIVE</div>
          </div>
          <div className="footer-links">
            <Link href="/">← Index</Link>
            <a href="#overview">Overview</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#contribute">Contribute</a>
          </div>
          <div className="footer-meta">
            <div>License: MIT</div>
            <div>Status: v1.1 Ready</div>
            <a
              href="https://github.com/openlanguagemodel/openlanguagemodel"
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
