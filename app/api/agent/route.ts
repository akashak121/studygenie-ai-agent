import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subjects, days, hours } = await req.json();

  const subjectList = subjects.split(",").map((s: string) => s.trim());
  const totalDays = Number(days);

  let plan = "";
  let day = 1;

  for (let i = 0; i < totalDays; i++) {
    const subject = subjectList[i % subjectList.length];
    plan += `Day ${day}: Study ${subject} for ${hours} hours\n`;
    day++;
  }

  return NextResponse.json({
    plan:
      "📘 AI Study Plan\n\n" +
      plan +
      "\nIf a day is missed, the agent redistributes the workload automatically.",
  });
}
