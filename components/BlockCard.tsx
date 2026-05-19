"use client";

import { motion } from "framer-motion";
import { Box, Link2, TriangleAlert } from "lucide-react";
import type { DemoBlock } from "@/lib/types";

export function BlockCard({ block, compact = false, active = false }: { block: DemoBlock; compact?: boolean; active?: boolean }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={`group relative rounded-[8px] border p-3 transition ${
        block.valid
          ? active
            ? "border-teal-300/55 bg-teal-300/15 shadow-glow"
            : "border-white/12 bg-white/[0.06]"
          : "border-rose-400/50 bg-rose-500/15 shadow-danger"
      } ${compact ? "w-[138px]" : "w-full"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`grid h-8 w-8 place-items-center rounded-full ${block.valid ? "bg-teal-300/15 text-teal-200" : "bg-rose-400/20 text-rose-200"}`}>
            {block.valid ? <Box size={16} /> : <TriangleAlert size={16} />}
          </div>
          <div>
            <p className="text-sm font-bold text-white">Block #{block.number}</p>
            {!compact && <p className="text-xs text-zinc-500">{block.timestamp}</p>}
          </div>
        </div>
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${block.valid ? "bg-teal-300/15 text-teal-100" : "bg-rose-400/20 text-rose-100"}`}>
          {block.valid ? "valid" : "broken"}
        </span>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-zinc-500">Txs</span>
          <span className="text-zinc-200">{block.transactions.length}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-zinc-500">Prev</span>
          <span className="font-mono text-zinc-300">{block.previousHash.slice(0, 8)}...</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-zinc-500">Hash</span>
          <span className={`font-mono ${block.valid ? "text-teal-100" : "text-rose-100"}`}>{block.hash.slice(0, 8)}...</span>
        </div>
      </div>

      {compact && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-64 -translate-x-1/2 rounded-[8px] border border-white/12 bg-zinc-950/95 p-3 text-xs text-zinc-300 shadow-2xl group-hover:block">
          <p className="font-semibold text-white">Block #{block.number}</p>
          <p className="mt-2">Tx count: {block.transactions.length}</p>
          <p className="mt-1 font-mono">Hash: {block.hash}</p>
          <p className="mt-1 font-mono">Previous: {block.previousHash}</p>
        </div>
      )}

      {block.tampered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-[8px] border border-rose-300/25 bg-rose-400/15 p-2 text-xs text-rose-100"
        >
          <Link2 size={14} />
          Tx edited: 2 ETH → 20 ETH
        </motion.div>
      )}
    </motion.div>
  );
}
