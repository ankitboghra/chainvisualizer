"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

type Props = {
  name: string;
  address: string;
  balance: number;
  accent: "teal" | "amber";
};

export function WalletCard({ name, address, balance, accent }: Props) {
  const color = accent === "teal" ? "text-teal-200 bg-teal-300/15 border-teal-300/25" : "text-amber-200 bg-amber-300/15 border-amber-300/25";

  return (
    <motion.div layout className="glass rounded-[8px] p-4">
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 place-items-center rounded-full border ${color}`}>
          <Wallet size={22} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-zinc-400">{name}</p>
          <p className="truncate font-mono text-xs text-zinc-500">{address}</p>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Balance</p>
          <p className="mt-1 text-2xl font-semibold">{balance.toFixed(1)} ETH</p>
        </div>
      </div>
    </motion.div>
  );
}
