"use client";

import { useState } from "react";
import { BlockchainCanvas } from "@/components/BlockchainCanvas";
import { Controls } from "@/components/Controls";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { WalkthroughCoach } from "@/components/WalkthroughCoach";
import { useBlockchainSimulation } from "@/hooks/useBlockchainSimulation";

export default function Home() {
  const sim = useBlockchainSimulation();
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Controls
        mode={sim.mode}
        setMode={sim.setMode}
        consensus={sim.consensus}
        setConsensus={sim.setConsensus}
        speed={sim.speed}
        setSpeed={sim.setSpeed}
        onSend={sim.sendTransaction}
        onReset={sim.reset}
        onWalkthrough={() => setWalkthroughOpen((open) => !open)}
        walkthroughActive={walkthroughOpen}
        disabled={sim.isRunning}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="min-w-0">
          <BlockchainCanvas
            mode={sim.mode}
            consensus={sim.consensus}
            gas={sim.gas}
            setGas={sim.setGas}
            amount={sim.amount}
            setAmount={sim.setAmount}
            stage={sim.stage}
            currentTx={sim.currentTx}
            mempoolTxs={sim.mempoolTxs}
            nonce={sim.nonce}
            selectedValidator={sim.selectedValidator}
            builtBlock={sim.builtBlock}
            chain={sim.chain}
            onSend={sim.sendTransaction}
            onTamper={sim.tamper}
            isRunning={sim.isRunning}
          />
        </div>
        <div>
          <ExplanationPanel stage={sim.stage} mode={sim.mode} progressIndex={sim.progressIndex} />
        </div>
      </div>
      <WalkthroughCoach
        open={walkthroughOpen}
        stage={sim.stage}
        consensus={sim.consensus}
        gas={sim.gas}
        onClose={() => setWalkthroughOpen(false)}
        onSend={sim.sendTransaction}
        onTamper={sim.tamper}
        canTamper={sim.stage === "confirmed" || sim.stage === "tampered"}
        isRunning={sim.isRunning}
      />
    </div>
  );
}
