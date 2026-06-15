// src/pages/Terms.jsx

import {
  FileText,
  Shield,
  Users,
  AlertTriangle,
  Scale,
  CheckCircle,
} from "lucide-react";

export default function Terms() {
  const terms = [
    {
      icon: <Users size={22} />,
      title: "Acceptable Use",
      content:
        "Users agree to use Virtual Science Lab only for educational, research, and learning purposes. Misuse of the platform, including unauthorized access attempts or disruptive behavior, is prohibited.",
    },
    {
      icon: <Shield size={22} />,
      title: "User Responsibilities",
      content:
        "Users are responsible for maintaining the security of their devices and accounts. Any activities performed through their account remain their responsibility.",
    },
    {
      icon: <AlertTriangle size={22} />,
      title: "Limitations of Liability",
      content:
        "Virtual Science Lab is provided as an educational platform. While we strive for accuracy and reliability, we do not guarantee uninterrupted availability or error-free operation.",
    },
    {
      icon: <Scale size={22} />,
      title: "Intellectual Property",
      content:
        "All simulations, educational materials, branding, and platform content are protected by intellectual property laws and may not be reproduced without permission.",
    },
    {
      icon: <FileText size={22} />,
      title: "Policy Updates",
      content:
        "These Terms of Service may be updated periodically to reflect platform improvements, legal requirements, or new features. Continued use constitutes acceptance of updates.",
    },
    {
      icon: <CheckCircle size={22} />,
      title: "Agreement",
      content:
        "By accessing or using Virtual Science Lab, users acknowledge that they have read, understood, and agreed to these Terms of Service.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 px-6 py-20">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
            <FileText size={16} />
            Legal Information
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
            Please review these terms carefully before using Virtual Science
            Lab. They outline your rights, responsibilities, and acceptable
            use of the platform.
          </p>
        </div>
      </section>

      {/* Terms Cards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {terms.map((term, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:bg-white/10"
            >
              <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                {term.icon}
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                {term.title}
              </h2>

              <p className="leading-relaxed text-white/70">
                {term.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Notice */}
        <div className="mt-16 rounded-3xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-10 text-center backdrop-blur-xl">
          <h3 className="text-3xl font-bold">
            Fair & Responsible Usage
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
            Our goal is to provide a safe, accessible, and engaging learning
            experience for students, educators, and lifelong learners.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Terms effective for current platform version
          </div>
        </div>
      </section>
    </div>
  );
}