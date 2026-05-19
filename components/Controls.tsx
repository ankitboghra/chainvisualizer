"use client";

import { Gauge, MessagesSquare, Play, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import type { ConsensusMode, LearningMode, SpeedMode } from "@/lib/types";

type Props = {
  mode: LearningMode;
  setMode: (mode: LearningMode) => void;
  consensus: ConsensusMode;
  setConsensus: (mode: ConsensusMode) => void;
  speed: SpeedMode;
  setSpeed: (speed: SpeedMode) => void;
  onSend: () => void;
  onReset: () => void;
  onWalkthrough: () => void;
  walkthroughActive: boolean;
  disabled: boolean;
};

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { label: string; value: T }[]; onChange: (value: T) => void }) {
  return (
    <div className="flex rounded-full border border-white/10 bg-white/[0.06] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
            value === option.value ? "bg-white text-zinc-950 shadow-lg" : "text-zinc-300 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Controls(props: Props) {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-teal-300/30 bg-teal-300/15 text-teal-200 shadow-glow">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">See Blockchain</h1>
              <p className="mt-1 text-sm text-zinc-400 sm:text-base">Learn blockchain by watching it happen.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={props.onWalkthrough}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition ${
              props.walkthroughActive
                ? "border-amber-200/40 bg-amber-200 text-zinc-950 shadow-[0_0_34px_rgba(251,191,36,0.22)]"
                : "border-white/10 bg-white/[0.06] text-zinc-100 hover:bg-white/[0.1]"
            }`}
          >
            <MessagesSquare size={17} />
            Walkthrough
          </button>
          <button
            onClick={props.onSend}
            disabled={props.disabled}
            className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-bold text-zinc-950 shadow-glow transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play size={17} fill="currentColor" />
            Send Transaction
          </button>
          <button
            onClick={props.onReset}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-300 transition hover:text-white"
            title="Reset demo"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Segmented value={props.mode} onChange={props.setMode} options={[{ label: "Beginner", value: "beginner" }, { label: "Technical", value: "technical" }]} />
        <Segmented value={props.consensus} onChange={props.setConsensus} options={[{ label: "Proof of Work", value: "pow" }, { label: "Proof of Stake", value: "pos" }]} />
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1">
          <Gauge size={16} className="ml-1 text-amber-200" />
          <Segmented value={props.speed} onChange={props.setSpeed} options={[{ label: "Slow", value: "slow" }, { label: "Normal", value: "normal" }, { label: "Fast", value: "fast" }]} />
        </div>
        <div className="hidden items-center gap-2 text-sm text-zinc-400 lg:flex">
          <Zap size={16} className="text-rose-300" />
          frontend-only simulation
        </div>
      </div>
    </header>
  );
}
