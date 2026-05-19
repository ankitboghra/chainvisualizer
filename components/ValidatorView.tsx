"use client";

import { motion } from "framer-motion";
import { Cpu, Pickaxe, ShieldCheck } from "lucide-react";
import { consensusCopy } from "@/lib/constants";
import type { ConsensusMode, LearningMode, SimulationStage } from "@/lib/types";

export function ValidatorView({ consensus, mode, stage, nonce, selectedValidator }: { consensus: ConsensusMode; mode: LearningMode; stage: SimulationStage; nonce: number; selectedValidator: string }) {
  const active = stage === "validation" || stage === "block_creation";

  return (
    <div className="glass min-h-[250px] rounded-[8px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{consensus === "pow" ? "Miner" : "Validator"}</p>
          <p className="mt-1 text-xs text-zinc-400">{consensusCopy[consensus][mode]}</p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-full border ${active ? "border-teal-300/35 bg-teal-300/15 text-teal-200" : "border-white/10 bg-white/[0.05] text-zinc-400"}`}>
          {consensus === "pow" ? <Pickaxe size={19} /> : <ShieldCheck size={19} />}
        </div>
      </div>

      <div className="mt-7 grid place-items-center">
        {consensus === "pow" ? (
          <motion.div
            animate={active ? { rotate: [0, -8, 8, 0], scale: [1, 1.04, 1] } : {}}
            transition={{ repeat: active ? Infinity : 0, duration: 1.2 }}
            className="grid h-28 w-28 place-items-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-100"
          >
            <Pickaxe size={42} />
          </motion.div>
        ) : (
          <motion.div
            animate={active ? { boxShadow: ["0 0 0 rgba(45,212,191,0)", "0 0 40px rgba(45,212,191,.32)", "0 0 0 rgba(45,212,191,0)"] } : {}}
            transition={{ repeat: active ? Infinity : 0, duration: 1.65 }}
            className="grid h-28 w-28 place-items-center rounded-full border border-teal-300/30 bg-teal-300/10 text-teal-100"
          >
            <Cpu size={42} />
          </motion.div>
        )}
      </div>

      <div className="mt-6 rounded-[8px] border border-white/10 bg-black/20 p-3">
        {consensus === "pow" ? (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{active ? "Mining..." : "Ready"}</p>
            <p className="mt-1 font-mono text-lg text-amber-100">Nonce {nonce.toLocaleString()}</p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{active ? "Validator Selected" : "Validator Pool"}</p>
            <p className="mt-1 text-lg font-semibold text-teal-100">{selectedValidator}</p>
            <p className="mt-1 text-xs text-zinc-400">Stake: 42,000 SEE</p>
          </>
        )}
      </div>
    </div>
  );
}
