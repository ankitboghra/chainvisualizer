"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildInitialChain, gasDelay, makeBlock, makeTransaction, tamperChain } from "@/lib/blockchainSimulator";
import type { ConsensusMode, DemoBlock, DemoTransaction, GasPriority, LearningMode, SimulationStage, SpeedMode } from "@/lib/types";

const speedFactor: Record<SpeedMode, number> = {
  slow: 2.15,
  normal: 1.45,
  fast: 0.9,
};

export function useBlockchainSimulation() {
  const [mode, setMode] = useState<LearningMode>("beginner");
  const [consensus, setConsensus] = useState<ConsensusMode>("pow");
  const [speed, setSpeed] = useState<SpeedMode>("normal");
  const [gas, setGas] = useState<GasPriority>("normal");
  const [amount, setAmount] = useState(2);
  const [stage, setStage] = useState<SimulationStage>("idle");
  const [chain, setChain] = useState<DemoBlock[]>(() => buildInitialChain());
  const [currentTx, setCurrentTx] = useState<DemoTransaction | null>(null);
  const [mempoolTxs, setMempoolTxs] = useState<DemoTransaction[]>([]);
  const [nonce, setNonce] = useState(1280);
  const [selectedValidator, setSelectedValidator] = useState("Nova Node");
  const [builtBlock, setBuiltBlock] = useState<DemoBlock | null>(null);
  const runId = useRef(0);

  const isRunning = !["idle", "confirmed", "tampered"].includes(stage);
  const delay = (ms: number) => ms * speedFactor[speed];

  useEffect(() => {
    if (stage !== "validation" || consensus !== "pow") return;
    const interval = window.setInterval(() => setNonce((value) => value + Math.floor(17 + Math.random() * 53)), 90);
    return () => window.clearInterval(interval);
  }, [stage, consensus]);

  const sendTransaction = () => {
    const id = runId.current + 1;
    runId.current = id;
    const tx = makeTransaction(amount, gas, id);
    setCurrentTx(tx);
    setMempoolTxs([]);
    setBuiltBlock(null);
    setStage("broadcasting");
    setNonce(1280);
    setSelectedValidator(["Nova Node", "Atlas Stake", "Beacon Labs"][id % 3]);

    window.setTimeout(() => {
      if (runId.current !== id) return;
      setCurrentTx({ ...tx, status: "pending" });
      setMempoolTxs([
        { id: "Tx #1834", from: "Ava", to: "Kai", amount: 0.8, gas: "low", status: "pending" },
        { id: "Tx #1835", from: "Liam", to: "Zoe", amount: 4.1, gas: "high", status: "pending" },
        { ...tx, status: "pending" },
      ]);
      setStage("mempool");
    }, delay(1300));

    window.setTimeout(() => {
      if (runId.current !== id) return;
      setStage("validation");
    }, delay(1300 + gasDelay(gas)));

    window.setTimeout(() => {
      if (runId.current !== id) return;
      setStage("block_creation");
      const block = makeBlock(chain, tx, consensus);
      setBuiltBlock(block);
    }, delay(1300 + gasDelay(gas) + 2100));

    window.setTimeout(() => {
      if (runId.current !== id) return;
      setStage("chain_update");
      setChain((blocks) => [...blocks, makeBlock(blocks, tx, consensus)]);
      setMempoolTxs((txs) => txs.filter((item) => item.id !== tx.id));
    }, delay(1300 + gasDelay(gas) + 4100));

    window.setTimeout(() => {
      if (runId.current !== id) return;
      setCurrentTx((active) => (active ? { ...active, status: "confirmed" } : active));
      setStage("confirmed");
    }, delay(1300 + gasDelay(gas) + 5600));
  };

  const tamper = () => {
    runId.current += 1;
    setStage("tampered");
    setChain((blocks) => tamperChain(blocks));
    setCurrentTx((tx) => (tx ? { ...tx, amount: 20, status: "tampered" } : tx));
  };

  const reset = () => {
    runId.current += 1;
    setStage("idle");
    setCurrentTx(null);
    setMempoolTxs([]);
    setBuiltBlock(null);
    setChain(buildInitialChain());
  };

  return {
    mode,
    setMode,
    consensus,
    setConsensus,
    speed,
    setSpeed,
    gas,
    setGas,
    amount,
    setAmount,
    stage,
    chain,
    currentTx,
    mempoolTxs,
    nonce,
    selectedValidator,
    builtBlock,
    isRunning,
    sendTransaction,
    tamper,
    reset,
    progressIndex: useMemo(() => {
      if (stage === "tampered") return 5;
      return ["idle", "broadcasting", "mempool", "validation", "block_creation", "chain_update", "confirmed"].indexOf(stage);
    }, [stage]),
  };
}
