// src/pages/Feedback.jsx

import { useState } from "react";
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle,
} from "lucide-react";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect to backend/API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-20">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
            <MessageSquare size={16} />
            Community Feedback
          </div>

          <h1 className="text-5xl font-black md:text-6xl">
            Share Your Feedback
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80">
            Help us improve Virtual Science Lab by sharing your ideas,
            suggestions, bug reports, and learning experience.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          {submitted ? (
            <div className="text-center">
              <CheckCircle
                size={60}
                className="mx-auto text-emerald-400"
              />

              <h2 className="mt-4 text-3xl font-bold">
                Thank You!
              </h2>

              <p className="mt-3 text-white/70">
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block font-medium">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <Star size={18} />
                  Rating
                </label>

                <select className="w-full rounded-2xl border border-white/10 bg-[#1e293b] px-4 py-3 outline-none focus:border-cyan-400">
                  <option>⭐⭐⭐⭐⭐ Excellent</option>
                  <option>⭐⭐⭐⭐ Very Good</option>
                  <option>⭐⭐⭐ Good</option>
                  <option>⭐⭐ Fair</option>
                  <option>⭐ Poor</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Feedback
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us what you think..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
              >
                <Send size={18} />
                Submit Feedback
              </button>
            </form>
          )}
        </div>

        {/* Bottom Card */}
        <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-bold">
            We Value Your Opinion
          </h3>

          <p className="mt-3 text-white/70">
            Every suggestion helps us build a better educational
            experience for students, educators, and researchers.
          </p>
        </div>
      </section>
    </div>
  );
}