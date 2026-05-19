import type { ConsensusMode, DemoBlock, DemoTransaction, GasPriority } from "./types";

const hashSeeds = ["A12D9F", "D71B4C", "8F0E2A", "B44A90", "E91C07", "6AD3F1", "C902EE"];

export function fakeHash(seed: string | number) {
  const source = String(seed);
  let acc = 0;
  for (let i = 0; i < source.length; i += 1) acc = (acc * 31 + source.charCodeAt(i)) % 0xffffff;
  const prefix = hashSeeds[acc % hashSeeds.length];
  return `0x${prefix}${acc.toString(16).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}

export function txId(seed: number) {
  return `Tx #${1832 + seed}`;
}

export function buildInitialChain(): DemoBlock[] {
  return [180, 181, 182].map((number, index, list) => {
    const previousHash = index === 0 ? "0xGENESIS" : fakeHash(list[index - 1]);
    return {
      number,
      timestamp: `10:${26 + index} AM`,
      previousHash,
      hash: fakeHash(number),
      transactions: [
        {
          id: txId(index),
          from: "Maya",
          to: "Noah",
          amount: index + 1,
          gas: index === 2 ? "high" : "normal",
          status: "confirmed",
        },
      ],
      valid: true,
    };
  });
}

export function makeTransaction(amount: number, gas: GasPriority, count: number): DemoTransaction {
  return {
    id: txId(count + 4),
    from: "Alice",
    to: "Bob",
    amount,
    gas,
    status: "broadcasting",
  };
}

export function makeBlock(chain: DemoBlock[], tx: DemoTransaction, consensus: ConsensusMode): DemoBlock {
  const parent = chain[chain.length - 1];
  const number = parent.number + 1;
  const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const seed = `${number}-${parent.hash}-${tx.id}-${tx.amount}-${tx.gas}-${consensus}`;
  return {
    number,
    timestamp: stamp,
    previousHash: parent.hash,
    hash: fakeHash(seed),
    transactions: [{ ...tx, status: "confirmed" }],
    valid: true,
  };
}

export function gasDelay(gas: GasPriority) {
  return gas === "high" ? 1100 : gas === "normal" ? 2100 : 3500;
}

export function gasQueuePosition(gas: GasPriority) {
  return gas === "high" ? 0 : gas === "normal" ? 1 : 2;
}

export function tamperChain(chain: DemoBlock[]): DemoBlock[] {
  return chain.map((block, index) => {
    if (index === 1) {
      return {
        ...block,
        transactions: block.transactions.map((tx, txIndex) =>
          txIndex === 0 ? { ...tx, amount: 20, status: "tampered" } : tx,
        ),
        hash: fakeHash(`${block.hash}-tampered-20`),
        valid: false,
        tampered: true,
      };
    }

    if (index > 1) return { ...block, valid: false };
    return block;
  });
}
