
import React, { useState, useEffect } from "react";

function App() {
  const [totalDose, setTotalDose] = useState('');
  const [fractions, setFractions] = useState('');
  const [alphaBeta, setAlphaBeta] = useState('');
  const [dosePerFraction, setDosePerFraction] = useState('');
  const [manualBED, setManualBED] = useState('');

  useEffect(() => {
    if (totalDose && fractions) {
      const calculatedDose = parseFloat(totalDose) / parseFloat(fractions);
      setDosePerFraction(calculatedDose.toFixed(2));
    } else {
      setDosePerFraction('');
    }
  }, [totalDose, fractions]);

  const calculateBED = () => {
    const dpf = parseFloat(dosePerFraction);
    const n = parseFloat(fractions);
    const ab = parseFloat(alphaBeta);
    if (!isNaN(dpf) && !isNaN(n) && !isNaN(ab)) {
      const BED = n * dpf * (1 + dpf / ab);
      return BED.toFixed(2);
    }
    return '';
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Calculateur BED</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Dose totale (Gy): </label>
        <input type="number" value={totalDose} onChange={e => setTotalDose(e.target.value)} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Nombre de fractions: </label>
        <input type="number" value={fractions} onChange={e => setFractions(e.target.value)} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Alpha/Beta (Gy): </label>
        <input type="number" value={alphaBeta} onChange={e => setAlphaBeta(e.target.value)} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Dose par fraction (calculée): </label>
        <input type="text" value={dosePerFraction} readOnly />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>BED totale autorisée (calculée): </label>
        <input type="text" value={calculateBED()} readOnly />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>OU BED restante autorisée (saisie manuelle): </label>
        <input type="number" value={manualBED} onChange={e => setManualBED(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
