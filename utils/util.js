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

//%%%%%%%% stimulus generation %%%%%%%%%//
function getRandomArbitrary(min, max) {
       let nn = Math.random() * (max - min) + min;
       return Math.round(nn*100)/100;
     }
//label generation: takes in a label dictionary mapping polarity & range with label
function getLabel({ labelDict, radius, Pos }) {
   const polarity = Pos ? 'pos' : 'neg';
   const r = Pos ? radius[0] : radius[1];
   for (const [range, label] of Object.entries(labelDict[polarity])) {
       const [min, max] = JSON.parse(range); // Parse the range string to an array
       if (r >= min && r < max) {
           return label;
       }
   }
   throw new Error(`No matching label found for radius: ${radius}`);
}

function getRandomLabel({ labelsGlob = [] }){
  return labelsGlob[Math.floor(Math.random() * labelsGlob.length)];
}
// generate n * radius from min to max with step
function GenerateSingleMorph({ numStimuli = 20, DegPrecision = 0.2, step = 0.05, min = 0, max = 1, labelsGlob = [] }) {
  let stimuli = Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) =>
      ({ radius: parseFloat((min + i * step).toFixed(2)), label: getRandomLabel({labelsGlob}), degree: i * step/DegPrecision}));
  if (stimuli.length > numStimuli) { // this is only for debugging
        stimuli = stimuli.sort(() => Math.random() - 0.5).slice(0, numStimuli); // Shuffle the stimuli array and pick the first `numStimuli` elements
    }
  else {
    while (stimuli.length < numStimuli) {
        const randomValue = Math.floor(getRandomArbitrary(min / step, max / step)) * step;
        stimuli.push({ radius: parseFloat(randomValue.toFixed(2)), label:getRandomLabel({labelsGlob}), degree: parseFloat(((randomValue-min)/step).toFixed(2)) });
  }}
  return stimuli;
}

// generate n * radius pair from min to max with controlled differences
function GeneratePairMorph({ numStimuli = 10, step = 0.05, min = 0, max = 1, labelDict = {} }) {
    const differences = [parseFloat((step * 5).toFixed(2)),parseFloat((step * 9).toFixed(2)),parseFloat((step * 13).toFixed(2)),
                        parseFloat((step * 16).toFixed(2))];
    return Array.from({ length: numStimuli }, (_, j) => {
        const diff = differences[Math.floor(Math.random() * differences.length)];
        const isP1Less = j < numStimuli / 2; // Half have p1 < p2
        const p = parseFloat((Math.floor(getRandomArbitrary(min / step, (max - diff) / step)) * step).toFixed(2));
        const [p1, p2, Pos] = isP1Less ? [p, parseFloat((p + diff).toFixed(2)), true] : [parseFloat((p + diff).toFixed(2)), p, false]; //If isP1Less, p1 < p2, Pos=True.
        const [label, key] = getLabel({labelDict:labelDict, Pos:Pos, radius:[p1, p2]});
        return { radius: [p1, p2], label:label, key:key }; //key is only used for active learning trials
    });
}

function GenerateEquaMorph({ numStimuli = 20, step = 0.05, min = 0, max = 1, labelsGlob = [] }) {
  let stimuli = Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) => ({ radius: [min + i * step, min + i * step], label: getRandomLabel({labelsGlob})}));
  if (stimuli.length > numStimuli) { // this is only for debugging
        stimuli = stimuli.sort(() => Math.random() - 0.5).slice(0, numStimuli); // Shuffle the stimuli array and pick the first `numStimuli` elements
    }
  else {
    while (stimuli.length < numStimuli) {
        const randomValue = Math.floor(getRandomArbitrary(min / step, max / step)) * step;
        stimuli.push({ radius: [randomValue, randomValue], label:getRandomLabel({labelsGlob}) });
  }}
  return stimuli;
}

//******** Block arg preperation ********//
function BlockAppend({stimuliSet = [], labelDict = {}, numStimuli = numStimuli, promptType = promptType, method = method}) {
    let stimuli;
    const labelsGlob = labelDict.neg && labelDict.pos
    ? [Object.values(labelDict['neg'])[0][0], // First value in 'pos'
      Object.values(labelDict['pos']).slice(-1)[0][0] ]// Last value in 'neg'
    : [];
    // Check the method and call the appropriate function
    if (promptType === 'EquaSlider') {  //handler for slider_equative trials
        stimuli = GenerateEquaMorph({ numStimuli, labelsGlob });
    } else if (['MorphPair', 'SliderPair'].includes(method)) {
        stimuli = GeneratePairMorph({ numStimuli, labelDict });
    } else {
        stimuli = GenerateSingleMorph({ numStimuli, labelsGlob });
    };
    if (promptType === 'DualLabelLearnAct'){
      labels = {A: Object.values(labelDict['neg'])[0][0], B:Object.values(labelDict['pos'])[0][0]};
      for (const stimulus of stimuli) {
          stimulus.prompt = getprompts({labels, trialtype:promptType});
          stimulus.method = method;
          stimulus.condition = [0,1][Math.floor(Math.random() * 2)];
      };
    } else if (promptType === 'FouriorLabelLearnAct'){
      labels = {A: Object.values(labelDict['neg'])[0][0], B:Object.values(labelDict['neg'])[1][0],
                C: Object.values(labelDict['pos'])[0][0], D:Object.values(labelDict['pos'])[1][0]};
      for (const stimulus of stimuli) {
          stimulus.prompt = getprompts({labels, trialtype:promptType});
          stimulus.method = method;
          stimulus.condition = [0,1][Math.floor(Math.random() * 2)];
      };
    } else if (['MeaLearn', 'MeaLearnAct'].includes(promptType)){
      for (const stimulus of stimuli) {
          labels = { degree: stimulus.degree };
          stimulus.prompt = getprompts({labels, trialtype:promptType});
          stimulus.method = method;
          stimulus.condition = [0,1][Math.floor(Math.random() * 2)];
      };
    } else {
      for (const stimulus of stimuli) {
          labels = { label: stimulus.label};
          stimulus.prompt = getprompts({labels, trialtype:promptType});
          stimulus.method = method;
          stimulus.condition = [0,1][Math.floor(Math.random() * 2)];
      };
    };
    stimuliSet.push(...stimuli); // Append stimuli to stimuliSet
    return stimuliSet;
}

//******** Incorporate functions globally ********//
window.Morphfunction = Morphfunction;
window.BlockAppend = BlockAppend;
