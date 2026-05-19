import type { ConsensusMode, GasPriority, LearningMode, SimulationStage } from "./types";

export const stageOrder: SimulationStage[] = [
  "idle",
  "broadcasting",
  "mempool",
  "validation",
  "block_creation",
  "chain_update",
  "confirmed",
  "tampered",
];

export const progressSteps = [
  { id: "idle", label: "Wallet" },
  { id: "broadcasting", label: "Broadcast" },
  { id: "mempool", label: "Mempool" },
  { id: "validation", label: "Validation" },
  { id: "block_creation", label: "Block" },
  { id: "confirmed", label: "Confirmed" },
] as const;

export const gasLabels: Record<GasPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
};

export const copy: Record<SimulationStage, Record<LearningMode, string>> = {
  idle: {
    beginner: "Choose an amount and send it. You are about to watch a payment become a confirmed block.",
    technical: "Prepare a mocked signed transaction from Alice to Bob.",
  },
  broadcasting: {
    beginner: "Your payment request is being shared with the network.",
    technical: "Signed transaction broadcasted to peer nodes.",
  },
  mempool: {
    beginner: "Transactions wait in line before being confirmed.",
    technical: "Pending transactions sit in the mempool; validators prioritize higher fees.",
  },
  validation: {
    beginner: "The network is deciding who gets to add the next block.",
    technical: "Consensus simulation selects the producer for the pending transaction batch.",
  },
  block_creation: {
    beginner: "The transaction is packed into a new block and given a fingerprint called a hash.",
    technical: "Block header fields are assembled and hashed against the previous block hash.",
  },
  chain_update: {
    beginner: "The new block connects to the chain by pointing at the block before it.",
    technical: "The new block references the parent hash, extending the canonical chain.",
  },
  confirmed: {
    beginner: "Confirmed. Bob can trust the payment because it is now part of the chain.",
    technical: "Transaction included in a finalized block with one confirmation.",
  },
  tampered: {
    beginner: "Changing old data changes every future block. This is why blockchains are hard to cheat.",
    technical: "Hash linkage invalidates descendant blocks after historical transaction mutation.",
  },
};

export const consensusCopy: Record<ConsensusMode, Record<LearningMode, string>> = {
  pow: {
    beginner: "Miners compete to solve a puzzle.",
    technical: "Proof of Work spends computation to discover a valid nonce.",
  },
  pos: {
    beginner: "Validators are chosen based on stake.",
    technical: "Proof of Stake selects a validator weighted by bonded stake.",
  },
};
