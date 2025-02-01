// Morph generation function
function Morphfunction({canvas, method, ...args}) {
    return new Promise((resolve, reject) => {
      const canvasMorpher = new CanvasMorpher(canvas);
      try {
        switch (method) {
          // methods for intervention blocks
          case 'MorphSingle': //method with one stimulus: for measure acquisition
              canvasMorpher.MorphSingle({canvas, ...args}, () => {
                resolve();
              });
              break;
          case 'MorphPair': //method with stimuli pair: for label acquisition
            canvasMorpher.MorphPair({canvas, ...args}, () => {
              resolve();
            });
            break;
          // methods for outcome blocks
          case 'SliderMorph': //slider method with one morph stimulus
            canvasMorpher.SliderMorph({canvas, ...args}, () => {
              resolve();
            });
            break;
          case 'SliderPair': //slider method with morph stimuli pair
            canvasMorpher.SliderPair({canvas, ...args}, () => {
              resolve();
            });
            break;
          case 'SliderOverlap': //slider method with morph stimuli overlap
            canvasMorpher.SliderOverlap({canvas, ...args}, () => {
              resolve();
            });
            break;
          default:
            reject(new Error(`Invalid method: ${method}`));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

//%%%%%%%% Randomization %%%%%%%%%//
function getRandomArbitrary(min, max) {
       let nn = Math.random() * (max - min) + min;
       return Math.round(nn*100)/100;
     }

function Shuffle(array) {
 let copy = [...array]; // Create a new copy
 for (let i = copy.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap in copy, not original
 }
 return copy; // Return new shuffled array
}
//%%%%%%%% Label generation %%%%%%%%%//
// random label for slider trials
function getRandomLabel() {
  const dualLabel = [linglabels[0], linglabels[linglabels.length - 1]]; // Corrected last element index
  return dualLabel[Math.floor(Math.random() * 2)];
}
// real Adj label for single morph, label contains (string, keypress)
function getTrueAdj({ labelDict, r }){
  //console.log(labelDict);
  for (const [range, label] of Object.entries(labelDict)) {
      const [min, max] = JSON.parse(range); // Parse the range string to an array
      if (r >= min && r < max) {
          return label;
    }
  }
  throw new Error(`No matching label found for radius: ${radius}`);
}

// real Adj label for morph pairs, label contains (string, keypress)
function getCompAdj({ Pos }) {
  const adj = Pos ?  linglabels[linglabels.length - 1]: linglabels[0];
  const key = Pos ? (linglabels.length - 1):0;
  return [adj, key];
}

// real degree and adv label given a position-based degree
// mode can be `modifier` (morph pair) or `complement` (single morph)
// To garantee 3 levels at both mode, d in [0.10, 0.50] modifier, in [0.4, 0.8] in complement
function getDegAdv({ d, mode = 'modifier' }){
  const degree = Math.round(d);
  let Adv, Ind;
  if (mode === 'modifier'){
    Ind = degree - 1;
    const Modadv = ['slightly', 'somewhat', 'much'];
    Adv = Modadv[Ind] || 'unknown';
  } else if (mode === 'complement') {
    Ind = Math.round(degree - 3);
    const Compadv = ['slightly', 'somewhat', 'very'];
    Adv = Compadv[Ind] || 'unknown'; // Avoid out-of-bounds error
  }
  const LevKey = ['q', 't', 'p'][Ind];
  return {Deg: degree, Adv: Adv, LevKey: LevKey};
}

//%%%%%%%% stimulus generation %%%%%%%%%//
// generate n * radius from min to max with step, default degree precision .15
function GenerateSingleMorph({ numStimuli = 20, DegPrecision = 0.15, step = 0.05, min = 0, max = 1, labelDict = [] }) {
  //console.log(labelDict);
  let stimuli = Array.from(
      { length: Math.ceil((max - min) / step) + 1 }, (_, i) => {
      const radius = parseFloat((min + i * step).toFixed(2));
      const label = getRandomLabel();
      const degAdv = getDegAdv({ d: (min + (i * step)) / DegPrecision, mode: 'complement' }); // Single call
      const [adj, key] = getTrueAdj({labelDict, r:radius});
      return { radius: radius, adj: adj, deg: degAdv.Deg, adv: degAdv.Adv, key: key, LevKey: degAdv.LevKey, randomlabel: label};
      }
    );
  if (stimuli.length > numStimuli) {
        stimuli = stimuli.sort(() => Math.random() - 0.5).slice(0, numStimuli); // Shuffle the stimuli array and pick the first `numStimuli` elements
    }
  else {
    while (stimuli.length < numStimuli) {
        const randomValue = Math.floor(getRandomArbitrary(min / step, max / step)) * step;
        const radius = parseFloat(randomValue.toFixed(2));
        const label = getRandomLabel();
        const degAdv = getDegAdv({ d: randomValue/DegPrecision, mode: 'complement' });
        const [adj, key] = getTrueAdj({labelDict, r:radius});
        stimuli.push({ radius: radius, adj: adj, deg: degAdv.Deg, adv: degAdv.Adv, key: key, LevKey: degAdv.LevKey, randomlabel: label });
      }
    };
  return stimuli;
}

// generate n * radius pair from min to max with controlled differences
function GeneratePairMorph({ numStimuli = 10, DegPrecision = 0.15, step = 0.05, min = 0, max = 1, labelDict = {} }) {
    const differences = [parseFloat((step * 3).toFixed(2)),parseFloat((step * 5).toFixed(2)),parseFloat((step * 7).toFixed(2)),
                        parseFloat((step * 9).toFixed(2))]; //d in [0.10, 0.50] modifier, step * 2 to step * 10;
    //console.log(differences);
    return Array.from({ length: numStimuli }, (_, j) => {
        const diff = differences[Math.floor(Math.random() * differences.length)];
        const isP1Less = j < numStimuli / 2; // Half have p1 < p2
        const p = parseFloat((Math.floor(getRandomArbitrary(min / step, (max - diff) / step)) * step).toFixed(2));
        const [p1, p2, Pos] = isP1Less ? [p, parseFloat((p + diff).toFixed(2)), true] : [parseFloat((p + diff).toFixed(2)), p, false]; //If isP1Less, p1 < p2, Pos=True.
        const [adj, key] = getCompAdj({Pos:Pos});
        const degAdv = getDegAdv({ d: diff/DegPrecision, mode: 'modifier' });
        return { radius: [p1, p2], adj: adj, deg: degAdv.Deg, adv: degAdv.Adv, key: key, LevKey: degAdv.LevKey }; //key is only used for active learning trials
    });
}

// generate n * radius pair from min to max with 0 differences
function GenerateEquaMorph({ numStimuli = 20, step = 0.05, min = 0, max = 1, labelDict = [] }) {
  let stimuli = Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) => ({ radius: [min + i * step, min + i * step], randomlabel: getRandomLabel()}));
  if (stimuli.length > numStimuli) { // this is only for debugging
        stimuli = stimuli.sort(() => Math.random() - 0.5).slice(0, numStimuli); // Shuffle the stimuli array and pick the first `numStimuli` elements
    }
  else {
    while (stimuli.length < numStimuli) {
        const randomValue = Math.floor(getRandomArbitrary(min / step, max / step)) * step;
        stimuli.push({ radius: [randomValue, randomValue], randomlabel:getRandomLabel() });
  }}
  return stimuli;
}

//******** Block arg preperation ********//
//Trial Type: LabPass, LabAct, AbsAct; RelPass, RelAct; SliderPre, SliderDeg, SliderComp, SliderEqua;
//Label Type: Bare, Adv, MP;
function BlockAppend({stimuliSet = [], labelDict = {}, numStimuli = numStimuli, trialType = trialType, labelType = ''}) {
    let stimuli;
    console.log(trialType, labelDict);
    //LabPass, LabAct, AbsAct;
    if (['LabLearn', 'LabLearnAct'].includes(trialType)) {
        stimuli = GenerateSingleMorph({ numStimuli, labelDict });
        method = 'MorphSingle';
      } else if (['AbsLearn', 'AbsLearnAct'].includes(trialType)) {
        stimuli = GenerateSingleMorph({ numStimuli, labelDict, min:0.4 , max:0.8  });
        method = 'MorphSingle';
      } else if (['RelLearn', 'RelLearnAct'].includes(trialType)) {
        stimuli = GeneratePairMorph({ numStimuli, labelDict });
        method = 'MorphPair';
      } else if (trialType == 'PreLabelSlider') {
        stimuli = GenerateSingleMorph({ numStimuli, labelDict });
        method = 'SliderMorph';
      } else if (trialType == 'DegQSlider'){
        stimuli = GenerateSingleMorph({ numStimuli, labelDict });
        method = 'MorphSingle';
      } else if (trialType == 'CompSlider'){
        stimuli = GeneratePairMorph({ numStimuli, labelDict });
        method = 'MorphPair';
      } else if (trialType == 'EquaSlider'){
        stimuli = GenerateEquaMorph({ numStimuli, labelDict });
        method = 'MorphPair';
      };
    for (const stimulus of stimuli) {
        stimulus.prompt = getprompts({stimulus, promptType:trialType, labelType:labelType});
        stimulus.method = method;//??
        const randomref = Shuffle([linglabels[linglabels.length - 1], linglabels[0]]);
        stimulus.reflabel = (trialType !== 'PreLabelSlider') ? randomref : [];
        stimulus.condition = [0,1][Math.floor(Math.random() * 2)]; //control for reference order for slider trials
    };

    stimuliSet.push(...stimuli); // Append stimuli to stimuliSet
    return stimuliSet;
}
//******** Incorporate functions globally ********//
window.Morphfunction = Morphfunction;
window.Shuffle = Shuffle;
window.BlockAppend = BlockAppend;
