import React, { useEffect } from "react";
import { Clock, Bot, ChartColumn, MessageSquare, Users, Zap } from "lucide-react";


export default function App() {
  useEffect(() => {
    // Bubble generation
    const bubbleContainer = document.querySelector(".bubbles");
    const bubbles = 15;
    for (let i = 0; i < bubbles; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      const size = `${Math.random() * 80 + 20}px`;
      const duration = `${Math.random() * 20 + 15}s`;
      const delay = `${Math.random() * 10}s`;
      const xStart = `${Math.random() * 100 - 50}vw`;
      const xEnd = `${Math.random() * 100 - 50}vw`;
      bubble.style.setProperty("--size", size);
      bubble.style.setProperty("--duration", duration);
      bubble.style.animationDelay = delay;
      bubble.style.setProperty("--x-start", xStart);
      bubble.style.setProperty("--x-end", xEnd);
      bubbleContainer.appendChild(bubble);
    }

    // Scroll animations
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${entry.target.dataset.delay || index * 100
              }ms`;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".feature-card, .contact-section > *")
      .forEach((el, index) => {
        el.dataset.delay = index * 120;
        observer.observe(el);
      });
  }, []);

  return (
    <div className="relative font-['Inter'] bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="main-bg"></div>
      <div className="bubbles"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Hero */}
        <main className="py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto hero-section">
            <div className="relative inline-block" style={{ animationDelay: "100ms" }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-primary)] to-indigo-600 rounded-full blur-3xl opacity-20"></div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight relative">
                <span className="text-white">Refine Requirements with</span>
                <br />
                <span className="gradient-text">Collaborative AI Agents</span>
              </h1>
            </div>
            <p
              className="text-[var(--text-muted)] mt-8 text-lg max-w-2xl mx-auto"
              style={{ animationDelay: "200ms" }}
            >
              Leverage our multi-agent AI platform to collaborate, analyze, and
              refine your product requirements with unparalleled speed and precision.
            </p>
            <div className="mt-10" style={{ animationDelay: "300ms" }}>
              <a
                className="py-3 px-5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold mb-4 hover:opacity-90 transition"
                href="/about"
              >
                Get Started For Free
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-28">
            {[
              {
                icon: <Bot size={32} />,
                title: "Multi-Agent Collaboration",
                desc: "Our AI agents work together, simulating expert discussions to cover all angles of your requirements.",
              },
              {
                icon: <MessageSquare size={32} />,
                title: "Real-time Debates",
                desc: "Generate innovative features and improvements based on initial requirement inputs.",
              },
              {
                icon: <ChartColumn size={32} />,
                title: "Aggregated Insights",
                desc: "AI agents debate and resolve ambiguities, ensuring your requirements are clear and consistent.",
              },
              {
                icon: <Clock size={32} />,
                title: "2-minute Debates",
                desc: "Track the refinement process with detailed analytics on agent contributions and decision-making.",
              },
              {
                icon: <Users size={32} />,
                title: "Collaborative Interface",
                desc: "Tailor the agent roles and workflow to fit your specific product development process.",
              },
              {
                icon: <Zap size={32} />,
                title: "Instant Refinement",
                desc: "Receive perfectly structured, refined requirements ready for your development team.",
              },
            ].map((f, i) => (
              <div key={i} className="feature-card p-8 bg-gray-900 rounded-lg hover:scale-105 hover:shadow-lg shadow-purple-500/30 transition-all ease-in-out duration-180">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-900/50 mb-6">
                  <span className="material-icons text-purple-300 text-4xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* footer */}
          <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-4">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
              Ready to <span className="text-gradient bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Transform</span> Your Requirements Process?
            </h1>
            <p className="text-gray-400 text-center mb-10 max-w-xl">
              Join thousands of product teams already using AI to refine their requirements faster and more accurately.
            </p>

            {/* Features and CTA */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              {/* Features */}
              <ul className="flex flex-col gap-4 text-white">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> 10x faster requirement refinement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> 95% accuracy with AI agents
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> Real-time collaborative debates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> Comprehensive analytics dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> Export refined requirements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> 24/7 AI availability
                </li>
              </ul>

              {/* CTA Box */}
              <div className="bg-[#1b1b2f] rounded-xl p-8 shadow-lg w-full md:w-96">
                <h2 className="text-xl font-bold text-white mb-4">Start Free Today</h2>
                <p className="text-gray-400 mb-6">No credit card required. Get started in minutes.</p>
                <a href="/signup">
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold mb-4 hover:opacity-90 transition">
                    Create Free Account →
                  </button></a>
                <div className="flex flex-wrap gap-2 text-gray-400 text-sm">
                  <span>✨ 14-day free trial</span>
                  <span>🚀 Setup in 2 minutes</span>
                  <span>💬 24/7 support</span>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  By signing up, you agree to our <span className="text-purple-500 underline">Terms of Service</span> and <span className="text-purple-500 underline">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
          <section class="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 py-16">
            <div class="max-w-6xl mx-auto px-6">
              <div class="text-center mb-10">
                <h2 class="text-3xl md:text-4xl font-extrabold text-blue-300">Product Refiner — The Team</h2>
                <p class="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A collaborative team of AI agents that brainstorm, challenge, refine and decide — transforming your raw idea into a clear, actionable product specification.
                </p>
              </div>

              <div class="grid gap-6 md:grid-cols-5">
                <article class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition">
                  <div class="flex items-center gap-3">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path d="M9 12h6M9 16h6M4 6h16M4 10h16" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold">Project Manager</h3>
                      <p class="text-sm text-slate-400">Keeps the vision aligned, ensures requirements are structured and complete.</p>
                    </div>
                  </div>
                </article>

                <article class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition">
                  <div class="flex items-center gap-3">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path d="M12 2l4 4-4 4-4-4 4-4zM2 12l4-4 4 4-4 4-4-4zM12 22l-4-4 4-4 4 4-4 4zM22 12l-4 4-4-4 4-4 4 4z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold">Developer</h3>
                      <p class="text-sm text-slate-400">Evaluates technical feasibility, scalability, and implementation details.</p>
                    </div>
                  </div>
                </article>

                <article class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition">
                  <div class="flex items-center gap-3">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path d="M4 6h16v12H4z" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M4 10h16M9 16h6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold">Designer</h3>
                      <p class="text-sm text-slate-400">Focuses on user experience, visuals, and interaction flow.</p>
                    </div>
                  </div>
                </article>

                <article class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition">
                  <div class="flex items-center gap-3">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path d="M3 3h18v4H3zM3 17h18v4H3zM3 10h18v4H3z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold">Market Analyst</h3>
                      <p class="text-sm text-slate-400">Analyzes market trends, competitors, and user needs for positioning.</p>
                    </div>
                  </div>
                </article>

                <article class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition">
                  <div class="flex items-center gap-3">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path d="M2 12l10 10 10-10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7 12h10M9 5h6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold">Judge</h3>
                      <p class="text-sm text-slate-400">Balances all perspectives, resolves conflicts, and finalizes the refined specification.</p>
                    </div>
                  </div>
                </article>
              </div>

              <div class="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h4 class="text-xl font-semibold text-blue-200 mb-4">How they work together</h4>
                <ol class="list-decimal list-inside space-y-3 text-slate-300">
                  <li><strong>Initiation</strong>: Project Manager captures and structures the idea.</li>
                  <li><strong>Feasibility</strong>: Developer assesses technical paths and constraints.</li>
                  <li><strong>Design</strong>: Designer shapes usability and aesthetics.</li>
                  <li><strong>Analysis</strong>: Market Analyst grounds the idea in real-world demand.</li>
                  <li><strong>Decision</strong>: Judge consolidates all insights into the final refined product plan.</li>
                </ol>

                <div class="mt-6 grid gap-4 md:grid-cols-3">
                  <div class="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <h5 class="text-sm font-semibold text-blue-300">Outcome</h5>
                    <p class="text-sm text-slate-300 mt-1">A clear, actionable product specification ready for execution.</p>
                  </div>
                  <div class="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <h5 class="text-sm font-semibold text-blue-300">Traceability</h5>
                    <p class="text-sm text-slate-300 mt-1">Every refinement is logged across the team’s iterations.</p>
                  </div>
                  <div class="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <h5 class="text-sm font-semibold text-blue-300">Risk-aware</h5>
                    <p class="text-sm text-slate-300 mt-1">Risks and conflicts are resolved through structured judgment.</p>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex items-center justify-between gap-4 flex-col md:flex-row">
                <p class="text-slate-400 max-w-xl">
                  Want this team applied to your idea? Submit a requirement and watch the Product Refiner run multiple rounds to produce a final plan.
                </p>
                <a href="/about" class="inline-block mt-4 md:mt-0 px-5 py-3 rounded-xl bg-blue-400 text-slate-900 font-semibold shadow hover:bg-blue-500 transition">
                  Start Refinement
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}