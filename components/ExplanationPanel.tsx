"use client";

import { BookOpen, CircleCheck, TriangleAlert } from "lucide-react";
import { copy, progressSteps } from "@/lib/constants";
import type { LearningMode, SimulationStage } from "@/lib/types";

export function ExplanationPanel({ stage, mode, progressIndex }: { stage: SimulationStage; mode: LearningMode; progressIndex: number }) {
  const danger = stage === "tampered";

  return (
    <aside className={`glass sticky bottom-4 top-4 rounded-[8px] p-4 ${danger ? "border-rose-400/35" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${danger ? "bg-rose-400/15 text-rose-100" : "bg-teal-300/15 text-teal-100"}`}>
          {danger ? <TriangleAlert size={19} /> : <BookOpen size={19} />}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Current Step</p>
          <h2 className="mt-1 text-xl font-semibold capitalize text-white">{stage.replace("_", " ")}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{copy[stage][mode]}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {progressSteps.map((step, index) => {
          const active = index <= progressIndex && !danger;
          return (
            <div key={step.id} className={`rounded-[8px] border px-2 py-2 text-center text-xs ${active ? "border-teal-300/30 bg-teal-300/12 text-teal-100" : danger && index > 1 ? "border-rose-400/35 bg-rose-400/12 text-rose-100" : "border-white/10 bg-white/[0.04] text-zinc-500"}`}>
              <CircleCheck size={13} className="mx-auto mb-1" />
              {step.label}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
