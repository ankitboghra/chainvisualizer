export type SimulationStage =
  | "idle"
  | "broadcasting"
  | "mempool"
  | "validation"
  | "block_creation"
  | "chain_update"
  | "confirmed"
  | "tampered";

export type LearningMode = "beginner" | "technical";
export type ConsensusMode = "pow" | "pos";
export type SpeedMode = "slow" | "normal" | "fast";
export type GasPriority = "low" | "normal" | "high";

export type DemoTransaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  gas: GasPriority;
  status: "draft" | "broadcasting" | "pending" | "confirmed" | "tampered";
};

export type DemoBlock = {
  number: number;
  timestamp: string;
  previousHash: string;
  hash: string;
  transactions: DemoTransaction[];
  valid: boolean;
  tampered?: boolean;
};
