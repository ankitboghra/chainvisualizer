"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, Boxes, Sparkles } from "lucide-react";
import { WalletCard } from "./WalletCard";
import { Mempool } from "./Mempool";
import { ValidatorView } from "./ValidatorView";
import { BlockCard } from "./BlockCard";
import { BlockchainChain } from "./BlockchainChain";
import type { ConsensusMode, DemoBlock, DemoTransaction, GasPriority, LearningMode, SimulationStage } from "@/lib/types";

type Props = {
  mode: LearningMode;
  consensus: ConsensusMode;
  gas: GasPriority;
  setGas: (gas: GasPriority) => void;
  amount: number;
  setAmount: (value: number) => void;
  stage: SimulationStage;
  currentTx: DemoTransaction | null;
  mempoolTxs: DemoTransaction[];
  nonce: number;
  selectedValidator: string;
  builtBlock: DemoBlock | null;
  chain: DemoBlock[];
  onSend: () => void;
  onTamper: () => void;
  isRunning: boolean;
};

export function BlockchainCanvas(props: Props) {
  const hasConfirmed = props.stage === "confirmed" || props.stage === "tampered";

  return (
    <main className="w-full">
      <section className="relative min-h-[720px] overflow-hidden rounded-[8px] border border-white/10 bg-zinc-950/72 p-4 shadow-2xl sm:p-5">
        <div className="grid-floor pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-x-12 top-10 h-px bg-gradient-to-r from-transparent via-teal-200/60 to-transparent" />

        <div className="relative z-10 grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <WalletCard name="Alice Wallet" address="0xA11c...92F0" balance={12.4} accent="teal" />
              <WalletCard name="Bob Wallet" address="0xB0b0...17AE" balance={4.8} accent="amber" />
            </div>

            <div className="glass rounded-[8px] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="flex-1">
                  <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">Amount to send</span>
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={props.amount}
                    onChange={(event) => props.setAmount(Number(event.target.value))}
                    className="mt-2 w-full rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-teal-300/50"
                  />
                </label>
                <button
                  onClick={props.onSend}
                  disabled={props.isRunning}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-teal-300 px-5 py-3 font-bold text-zinc-950 shadow-glow transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send Transaction <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative min-h-[116px] overflow-hidden rounded-[8px] border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">Broadcast Path</p>
              <p className="mt-1 text-xs text-zinc-400">{props.mode === "beginner" ? "Your payment request moves into the network." : "Signed payload propagates to peers."}</p>
              <AnimatePresence>
                {props.stage === "broadcasting" && props.currentTx && (
                  <motion.div
                    initial={{ x: 0, opacity: 0, scale: 0.86 }}
                    animate={{ x: ["0%", "35%", "74%"], opacity: [0, 1, 1, 0], scale: [0.86, 1.08, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.9, ease: "easeInOut" }}
                    className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-teal-300/35 bg-teal-300/15 px-4 py-2 text-sm font-semibold text-teal-50 shadow-glow"
                  >
                    <Sparkles size={16} />
                    {props.currentTx.id} · {props.currentTx.amount} ETH
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Mempool txs={props.mempoolTxs} gas={props.gas} setGas={props.setGas} />
          </div>

          <div className="grid gap-4">
            <ValidatorView consensus={props.consensus} mode={props.mode} stage={props.stage} nonce={props.nonce} selectedValidator={props.selectedValidator} />

            <div className="glass min-h-[250px] rounded-[8px] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Block Creation</p>
                  <p className="mt-1 text-xs text-zinc-400">Hash generation links data to history.</p>
                </div>
                <Boxes size={18} className="text-amber-200" />
              </div>
              <AnimatePresence mode="wait">
                {props.builtBlock && ["block_creation", "chain_update", "confirmed"].includes(props.stage) ? (
                  <motion.div key={props.builtBlock.hash} initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.75 }}>
                    <BlockCard block={props.builtBlock} active />
                    {props.stage === "block_creation" && (
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-300 via-amber-200 to-rose-300" initial={{ width: "8%" }} animate={{ width: "100%" }} transition={{ duration: 2.4 }} />
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="empty" className="grid h-40 place-items-center rounded-[8px] border border-dashed border-white/10 text-center text-sm text-zinc-500">
                    Waiting for validated transactions
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4">
          <BlockchainChain chain={props.chain} stage={props.stage} />
        </div>

        <div className="relative z-10 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={props.onTamper}
            disabled={!hasConfirmed}
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-rose-300/30 bg-rose-400/14 px-5 py-3 font-bold text-rose-50 shadow-danger transition hover:bg-rose-400/22 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <AlertTriangle size={18} />
            Tamper With Old Transaction
          </button>
          <p className="text-sm text-zinc-400">{props.stage === "tampered" ? "Changing Alice → Bob 2 ETH to 20 ETH broke every future link." : "After confirmation, edit history to see immutability fail dramatically."}</p>
        </div>
      </section>
    </main>
  );
}
