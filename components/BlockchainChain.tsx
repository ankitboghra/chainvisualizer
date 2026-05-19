"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BlockCard } from "./BlockCard";
import type { DemoBlock, SimulationStage } from "@/lib/types";

export function BlockchainChain({ chain, stage }: { chain: DemoBlock[]; stage: SimulationStage }) {
  return (
    <div className="glass rounded-[8px] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Blockchain</p>
          <p className="mt-1 text-xs text-zinc-400">Each block points to the one before it.</p>
        </div>
        {stage === "tampered" && <p className="rounded-full bg-rose-400/15 px-3 py-1 text-xs font-bold text-rose-100">Hash mismatch</p>}
      </div>
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max items-center gap-3">
          <AnimatePresence initial={false}>
            {chain.map((block, index) => (
              <div key={block.number} className="flex items-center gap-3">
                <motion.div initial={{ opacity: 0, x: 60, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 210, damping: 23 }}>
                  <BlockCard block={block} compact active={index === chain.length - 1 && stage !== "tampered"} />
                </motion.div>
                {index < chain.length - 1 && (
                  <motion.div
                    animate={block.valid && chain[index + 1].valid ? { opacity: [0.55, 1, 0.55] } : { opacity: [0.15, 0.55, 0.15], x: [-2, 2, -1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: block.valid && chain[index + 1].valid ? 1.8 : 0.34 }}
                    className={`h-1 w-12 rounded-full ${block.valid && chain[index + 1].valid ? "bg-gradient-to-r from-teal-300 to-amber-200" : "bg-rose-400"}`}
                  />
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
