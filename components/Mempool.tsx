"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { gasQueuePosition } from "@/lib/blockchainSimulator";
import { gasLabels } from "@/lib/constants";
import type { DemoTransaction, GasPriority } from "@/lib/types";

export function Mempool({ txs, gas, setGas }: { txs: DemoTransaction[]; gas: GasPriority; setGas: (gas: GasPriority) => void }) {
  const sorted = [...txs].sort((a, b) => gasQueuePosition(a.gas) - gasQueuePosition(b.gas));

  return (
    <div className="glass min-h-[250px] rounded-[8px] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Mempool Queue</p>
          <p className="mt-1 text-xs text-zinc-400">Higher gas floats upward.</p>
        </div>
        <Clock3 size={18} className="text-teal-200" />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Low</span>
          <span className="font-semibold text-teal-200">Gas: {gasLabels[gas]}</span>
          <span>High</span>
        </div>
        <input
          aria-label="Gas fee priority"
          className="range mt-2 w-full"
          type="range"
          min={0}
          max={2}
          value={gas === "low" ? 0 : gas === "normal" ? 1 : 2}
          onChange={(event) => setGas(["low", "normal", "high"][Number(event.target.value)] as GasPriority)}
        />
      </div>

      <div className="relative mt-5 h-32 overflow-hidden rounded-[8px] border border-white/10 bg-black/20 p-2">
        <AnimatePresence>
          {sorted.map((tx, index) => (
            <motion.div
              layout
              key={tx.id}
              initial={{ opacity: 0, x: -30, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: index * 42, scale: tx.from === "Alice" ? 1.02 : 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className={`absolute left-2 right-2 flex items-center justify-between rounded-[8px] border px-3 py-2 text-xs ${
                tx.gas === "high" ? "border-teal-300/35 bg-teal-300/15" : tx.gas === "normal" ? "border-amber-300/25 bg-amber-300/10" : "border-white/10 bg-white/[0.05]"
              }`}
            >
              <span className="font-mono text-zinc-300">{tx.id}</span>
              <span className="flex items-center gap-1 text-zinc-200">
                {tx.from} <ArrowUpRight size={13} /> {tx.to}
              </span>
              <span>{tx.amount} ETH</span>
              <span className="font-semibold text-teal-200">{gasLabels[tx.gas]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
