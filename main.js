/***************
 * PCR Master Mix
 ***************/
const pcrCalcBtn = document.getElementById('pcrCalcBtn');
const pcrResult = document.getElementById('pcrResult');

pcrCalcBtn.addEventListener('click', () => {
  const numReactions = parseFloat(document.getElementById('pcrReactions').value);
  const volumePerReaction = parseFloat(document.getElementById('finalVolume').value);

  // Additional inputs: primer concentration, dNTP, etc.
  // Here’s just a placeholder calculation:
  if (!isNaN(numReactions) && !isNaN(volumePerReaction)) {
    // Example: total volume = #reactions * volume
    const totalVolume = numReactions * volumePerReaction;
    // Build a result message
    pcrResult.innerHTML = `
      <p>Total volume needed: <strong>${totalVolume} µL</strong></p>
      <p>(Add more details for each reagent in your final app.)</p>
    `;
  } else {
    pcrResult.textContent = 'Please enter valid inputs for number of reactions and volume.';
  }
});


/***********************
 * Bacterial Growth
 ***********************/
const growthCalcBtn = document.getElementById('growthCalcBtn');
const growthResult = document.getElementById('growthResult');

growthCalcBtn.addEventListener('click', () => {
  const initialOD = parseFloat(document.getElementById('initialOD').value);
  const doublingTime = parseFloat(document.getElementById('doublingTime').value);
  const growthHours = parseFloat(document.getElementById('growthTime').value);

  if (!isNaN(initialOD) && !isNaN(doublingTime) && !isNaN(growthHours)) {
    // Example formula: final OD = initialOD * 2^(total time / doubling time in hours->minutes)
    // Convert doublingTime from minutes to hours if needed
    const doublingTimeHours = doublingTime / 60;
    const finalOD = initialOD * Math.pow(2, (growthHours / doublingTimeHours));

    growthResult.innerHTML = `
      <p>Estimated OD after ${growthHours} hours: <strong>${finalOD.toFixed(2)}</strong></p>
    `;
  } else {
    growthResult.textContent = 'Please enter valid numbers for initial OD, doubling time, and growth time.';
  }
});


/*******************************
 * Gel Electrophoresis Calculator
 *******************************/
const gelCalcBtn = document.getElementById('gelCalcBtn');
const gelResult = document.getElementById('gelResult');

gelCalcBtn.addEventListener('click', () => {
  const gelVolume = parseFloat(document.getElementById('gelVolume').value);
  const gelPercentage = parseFloat(document.getElementById('gelPercentage').value);

  if (!isNaN(gelVolume) && !isNaN(gelPercentage)) {
    // mass (g) = (percentage / 100) * volume (mL)
    const agaroseMass = (gelPercentage / 100) * gelVolume;
    gelResult.innerHTML = `
      <p>Agarose needed: <strong>${agaroseMass.toFixed(2)} g</strong></p>
      <p>Buffer volume: <strong>${gelVolume} mL</strong></p>
    `;
  } else {
    gelResult.textContent = 'Please enter valid numbers for gel volume and percentage.';
  }
});


/*******************************
 * SDS-PAGE Calculator
 *******************************/
const sdsCalcBtn = document.getElementById('sdsCalcBtn');
const sdsResult = document.getElementById('sdsResult');

sdsCalcBtn.addEventListener('click', () => {
  const proteinMigration = parseFloat(document.getElementById('proteinMigration').value);

  // Placeholder logic. Real logic usually requires a standard curve or known ladder.
  if (!isNaN(proteinMigration)) {
    // For demonstration, let’s just invert it as a dummy “size”
    const approxSize = (50 / proteinMigration).toFixed(2); 

    sdsResult.innerHTML = `
      <p>Estimated protein size: <strong>${approxSize} kDa</strong></p>
      <p>(Replace with real ladder-based formula or regression.)</p>
    `;
  } else {
    sdsResult.textContent = 'Please enter a valid protein migration distance.';
  }
});


/*********************************
 * Molarity & Dilution Calculator
 *********************************/
const dilutionCalcBtn = document.getElementById('dilutionCalcBtn');
const dilutionResult = document.getElementById('dilutionResult');

dilutionCalcBtn.addEventListener('click', () => {
  const stockC = parseFloat(document.getElementById('stockConc').value);
  const finalC = parseFloat(document.getElementById('finalConc').value);
  const finalV = parseFloat(document.getElementById('finalVolume').value);

  if (!isNaN(stockC) && !isNaN(finalC) && !isNaN(finalV)) {
    // M1V1 = M2V2 => V1 = (M2 * V2) / M1
    const stockVolumeNeeded = (finalC * finalV) / stockC;
    // finalVolume is total volume => solvent = finalVolume - stockVolumeNeeded
    const solventNeeded = finalV - stockVolumeNeeded;
    dilutionResult.innerHTML = `
      <p>Stock volume needed (mL): <strong>${stockVolumeNeeded.toFixed(2)}</strong></p>
      <p>Solvent to add (mL): <strong>${solventNeeded.toFixed(2)}</strong></p>
    `;
  } else {
    dilutionResult.textContent = 'Please enter valid stock concentration, final concentration, and volume.';
  }
});


/***********************
 * Oligo Suite
 **********************/

/* a) Oligo Calculator */
const oligoCalcBtn = document.getElementById('oligoCalcBtn');
const oligoResult = document.getElementById('oligoResult');

oligoCalcBtn.addEventListener('click', () => {
  const seq = document.getElementById('oligoSequence').value.trim().toUpperCase();

  if (seq) {
    // Basic GC count
    let gCount = 0, cCount = 0, aCount = 0, tCount = 0;
    for (let i = 0; i < seq.length; i++) {
      switch (seq[i]) {
        case 'G': gCount++; break;
        case 'C': cCount++; break;
        case 'A': aCount++; break;
        case 'T': tCount++; break;
        // For RNA, handle 'U' instead of T, etc.
      }
    }
    const length = seq.length;
    const gcContent = ((gCount + cCount) / length) * 100;

    // Very simple Tm formula (Wallace rule): Tm = 2*(A+T) + 4*(G+C)
    const Tm = 2 * (aCount + tCount) + 4 * (gCount + cCount);

    oligoResult.innerHTML = `
      <p>Sequence length: <strong>${length}</strong></p>
      <p>GC content: <strong>${gcContent.toFixed(2)}%</strong></p>
      <p>Approx Tm: <strong>${Tm} °C</strong></p>
    `;
  } else {
    oligoResult.textContent = 'Please enter a DNA sequence.';
  }
});

/* b) Reverse Complement */
const rcCalcBtn = document.getElementById('rcCalcBtn');
const rcResult = document.getElementById('rcResult');

rcCalcBtn.addEventListener('click', () => {
  const seq = document.getElementById('rcSequence').value.trim().toUpperCase();
  if (seq) {
    let complement = '';
    for (let i = 0; i < seq.length; i++) {
      switch (seq[i]) {
        case 'A': complement += 'T'; break;
        case 'T': complement += 'A'; break;
        case 'G': complement += 'C'; break;
        case 'C': complement += 'G'; break;
        default: complement += 'N'; // unknown base
      }
    }
    const reverseComplement = complement.split('').reverse().join('');
    rcResult.innerHTML = `
      <p>Reverse Complement: <strong>${reverseComplement}</strong></p>
    `;
  } else {
    rcResult.textContent = 'Please enter a DNA sequence.';
  }
});

/* c) Transcription & Translation */
const transcribeTranslateBtn = document.getElementById('transcribeTranslateBtn');
const transResult = document.getElementById('transResult');

transcribeTranslateBtn.addEventListener('click', () => {
  const dnaSeq = document.getElementById('dnaInput').value.trim().toUpperCase();
  if (!dnaSeq) {
    transResult.textContent = 'Please enter a DNA sequence.';
    return;
  }

  // 1) Transcription: replace T with U
  const mrnaSeq = dnaSeq.replace(/T/g, 'U');

  // 2) Simple Translation: read codons in sets of 3
  // (We'll do a minimal codon table. Real usage might need more detail.)
  const codonTable = {
    'AUG': 'M', // Start codon
    'UUU': 'F', 'UUC': 'F',
    // ... fill out for all codons if you want accuracy
  };

  let protein = '';
  for (let i = 0; i < mrnaSeq.length; i += 3) {
    const codon = mrnaSeq.substring(i, i+3);
    if (codonTable[codon]) {
      protein += codonTable[codon];
    } else {
      protein += 'X'; // unknown or stop
    }
  }

  transResult.innerHTML = `
    <p>mRNA: <strong>${mrnaSeq}</strong></p>
    <p>Protein (approx): <strong>${protein}</strong></p>
  `;
});


/************************************
 * Centrifugation (RCF ↔ RPM) 
 ************************************/
const centrifugeCalcBtn = document.getElementById('centrifugeCalcBtn');
const centrifugeResult = document.getElementById('centrifugeResult');

centrifugeCalcBtn.addEventListener('click', () => {
  const rotorRadius = parseFloat(document.getElementById('rotorRadius').value);
  const rcfVal = parseFloat(document.getElementById('rcf').value);
  const rpmVal = parseFloat(document.getElementById('rpm').value);

  // RCF = 1.118 × 10^-5 × (rpm)^2 × radius
  // We'll decide which to calculate based on which field is filled
  if (!isNaN(rotorRadius)) {
    if (!isNaN(rcfVal) && isNaN(rpmVal)) {
      // Calculate RPM from RCF
      // rcf = 1.118e-5 * rpm^2 * radius => rpm = sqrt(rcf / (1.118e-5 * radius))
      const newRpm = Math.sqrt(rcfVal / (1.118e-5 * rotorRadius));
      centrifugeResult.innerHTML = `<p>RPM: <strong>${newRpm.toFixed(0)}</strong></p>`;
    } 
    else if (!isNaN(rpmVal) && isNaN(rcfVal)) {
      // Calculate RCF from RPM
      // rcf = 1.118e-5 * rpm^2 * radius
      const newRcf = 1.118e-5 * Math.pow(rpmVal, 2) * rotorRadius;
      centrifugeResult.innerHTML = `<p>RCF (g): <strong>${newRcf.toFixed(2)}</strong></p>`;
    } 
    else {
      centrifugeResult.textContent = 'Enter a valid value in either RCF or RPM (but not both).';
    }
  } else {
    centrifugeResult.textContent = 'Please enter a valid rotor radius.';
  }
});
