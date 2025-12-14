"use client";

import { useState } from "react";

export default function Home() {
  const [subjects, setSubjects] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState("");

  async function generatePlan() {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects, days, hours }),
    });

    const data = await res.json();
    setPlan(data.plan);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50">
      <h1 className="text-3xl font-bold mb-4">📘 StudyGenie AI Agent</h1>

      <div className="w-full max-w-md space-y-3 bg-white p-6 rounded shadow">
        <input
          className="border p-2 w-full rounded"
          placeholder="Subjects (e.g. Math, Physics)"
          onChange={(e) => setSubjects(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Days until exam"
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Study hours per day"
          onChange={(e) => setHours(e.target.value)}
        />

        <button
          onClick={generatePlan}
          className="bg-black text-white p-2 rounded w-full"
        >
          Generate Study Plan
        </button>

        {plan && (
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">
            {plan}
          </pre>
        )}
      </div>
    </main>
  );
}
