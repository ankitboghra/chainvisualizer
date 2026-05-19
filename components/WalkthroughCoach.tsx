"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, MousePointerClick, Play, X } from "lucide-react";
import type { ConsensusMode, GasPriority, SimulationStage } from "@/lib/types";

type Props = {
  open: boolean;
  stage: SimulationStage;
  consensus: ConsensusMode;
  gas: GasPriority;
  onClose: () => void;
  onSend: () => void;
  onTamper: () => void;
  canTamper: boolean;
  isRunning: boolean;
};

const stageIndex: Record<SimulationStage, number> = {
  idle: 0,
  broadcasting: 1,
  mempool: 2,
  validation: 3,
  block_creation: 4,
  chain_update: 5,
  confirmed: 6,
  tampered: 7,
};

function gasLine(gas: GasPriority) {
  if (gas === "high") return "You chose high gas, so your transaction jumps near the front of the line.";
  if (gas === "low") return "You chose low gas, so your transaction is cheaper but waits longer.";
  return "Normal gas is the middle path: decent speed without paying the highest fee.";
}

function stageMessage(stage: SimulationStage, consensus: ConsensusMode, gas: GasPriority) {
  switch (stage) {
    case "idle":
      return {
        title: "Hi, I am your blockchain guide.",
        body: "Think of a blockchain like a notebook shared by lots of computers. We will send Alice's payment to Bob and watch how it becomes permanent.",
        hint: "Press Send Transaction when you are ready.",
      };
    case "broadcasting":
      return {
        title: "Alice just made a payment request.",
        body: "Nothing is confirmed yet. The app is pretending Alice signed a transaction, then shouted it out to the network so computers can see it.",
        hint: "Watch the glowing packet travel across the broadcast path.",
      };
    case "mempool":
      return {
        title: "Now it waits in the mempool.",
        body: `The mempool is like a waiting room for transactions. ${gasLine(gas)}`,
        hint: "Move the gas slider and send again to see priority change.",
      };
    case "validation":
      return consensus === "pow"
        ? {
            title: "A miner is trying to win the next block.",
            body: "In Proof of Work, miners race to find a lucky number called a nonce. The winner gets to add the next block.",
            hint: "The nonce counter is the fake puzzle-solving animation.",
          }
        : {
            title: "A validator was chosen.",
            body: "In Proof of Stake, the network picks validators based on how much they have staked. Less racing, more selection.",
            hint: "Switch back to Proof of Work to compare the story.",
          };
    case "block_creation":
      return {
        title: "The payment is being packed into a block.",
        body: "A block is just a bundle of transactions plus two important fingerprints: its own hash and the previous block's hash.",
        hint: "That previous hash is what makes blocks connect like a chain.",
      };
    case "chain_update":
      return {
        title: "The new block is joining the chain.",
        body: "Because this block points to the block before it, changing an older block would make the link stop matching.",
        hint: "This is the key idea behind blockchain immutability.",
      };
    case "confirmed":
      return {
        title: "Confirmed. The payment is now in history.",
        body: "Bob can trust the payment because it has been added to the shared notebook. Now try the tamper button to see why old records are hard to fake.",
        hint: "Click Tamper With Old Transaction for the big aha moment.",
      };
    case "tampered":
      return {
        title: "Boom: history does not match anymore.",
        body: "We changed an old transaction from 2 ETH to 20 ETH. That changed its hash, so every later block that depended on it now looks broken.",
        hint: "That hash mismatch is why cheating is obvious.",
      };
  }
}

export function WalkthroughCoach({ open, stage, consensus, gas, onClose, onSend, onTamper, canTamper, isRunning }: Props) {
  const message = stageMessage(stage, consensus, gas);
  const percent = Math.round((stageIndex[stage] / 7) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-xl rounded-[8px] border border-amber-200/25 bg-zinc-950/92 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:left-auto sm:right-6 sm:mx-0"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber-200/35 bg-amber-200/15 text-amber-100">
              <Bot size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-100/70">Noob Walkthrough</p>
                  <h2 className="mt-1 text-lg font-bold text-white">{message.title}</h2>
                </div>
                <button onClick={onClose} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-400 transition hover:text-white" title="Close walkthrough">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-3 rounded-[8px] border border-white/10 bg-white/[0.055] p-3">
                <p className="text-sm leading-6 text-zinc-200">{message.body}</p>
                <p className="mt-3 flex items-start gap-2 text-sm leading-5 text-amber-100">
                  <MousePointerClick className="mt-0.5 shrink-0" size={16} />
                  {message.hint}
                </p>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-200 via-teal-200 to-rose-300" animate={{ width: `${percent}%` }} transition={{ duration: 0.35 }} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {stage === "idle" && (
                  <button onClick={onSend} disabled={isRunning} className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-100 disabled:opacity-50">
                    <Play size={15} fill="currentColor" />
                    Start the journey
                  </button>
                )}
                {stage === "confirmed" && (
                  <button onClick={onTamper} disabled={!canTamper} className="inline-flex items-center gap-2 rounded-full bg-rose-300 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-rose-200 disabled:opacity-50">
                    Break history
                    <ArrowRight size={15} />
                  </button>
                )}
                {stage === "tampered" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-2 text-sm font-semibold text-teal-100">
                    <CheckCircle2 size={15} />
                    You just learned immutability
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Step {stageIndex[stage] + 1} of 8</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
