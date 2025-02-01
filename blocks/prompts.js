/* * * * * * * * * * * * * * * * * * Instructions * * * * * * * * * *  * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var PreSlider_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see a slider. </br>
    Each end of the slider will have an item as a reference point. </br>
    Your task is to <b>place the pink item</b> along the slider based on the given references.</p>
    <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PostSlider_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
   <p>In this section, you will see one or a pair of items. </br>
    Each end of the slider will have an item as a reference point. </br>
    Your task is to <b>place the pink item</b> on the slider to answer the question below the image.
    <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PassLabel_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see an objects and a description of the object.</p>
     <p>Carefully observe the object and the accompanying line describing the object.</p>
     <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActLabel_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>You will continue to see objects.</p>
    <p>Your task now is to <b>select the description</b> that best matches the object.</p>
    <p>You must answer each question correctly to proceed.</p>
    <p>(Press the space bar to continue.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PassRel_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see a pair of objects and a description of the relationship between them.</p>
     <p>Carefully observe the objects and the accompanying line describing the pair.</p>
     <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActRel_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>You will continue to see pairs of objects.</p>
    <p>Your task now is to <b>select the description</b> that best matches the relationship between the objects.</p>
    <p>You must answer each question correctly to proceed.</p>
    <p>(Press the space bar to continue.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PassAbs_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see an object along with a more detailed description.</p>
    <p>Observe the object carefully and review the accompanying details.</p>
    <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActAbs_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see an object and an incomplete description.</p>
    <p>Your task is to carefully observe the object and complete the description.</p>
    <p>You can only proceed if your response matches with the correct answer.</p>
    <p>(Press the space bar to continue.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PassLearn_continue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
     <p>Now you will be given the description again.</p>
     <p>Carefully observe the object(s) and read the description.</p>
     <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActLearn_continue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Now let's try again to <b>select the description</b> that best matches the object(s).</p>
    <p>You must answer each question correctly to proceed.</p>
    <p>(Press the space bar to continue.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};


/* * * * * * * * * * * * * * * * * * Open message * * * * * * * * * *  * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size:20px;font-weight:bold;"> Thank you for your participation! </p>
            <p>Press the space bar to begin.</p>
            `,
  choices: [' '], // restricts to space bar press
};

var waiting = {
 type: jsPsychHtmlKeyboardResponse,
 stimulus: `<p> Thanks! Please press any key to save your responses.
            </br> It may take a few seconds -- please <strong>do not close the window </strong>
            until you see the confirmation page.</p>`
};

var closing = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size:20px;font-weight:bold;"> Thank you for your participation! </p>
            <p>You can close your window whenever you feel comfortable.</p>`
};

/* * * * * * * * * * * * * * * * * * Fixation * * * * * * * ** * * * *  * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var fixation = {
 type: jsPsychHtmlKeyboardResponse,
 stimulus: `<div style="font-size:60px;">+</div>`,
 choices: "NO_KEYS",
 trial_duration: 500
};

var pause = {
 type: jsPsychHtmlKeyboardResponse,
 stimulus: `
   <p style="font-size:20px;font-weight:bold;"> Look at this pink object! </p>
   <p>(Press the space bar to continue.)</p>
 `,
 choices: [' '], // restricts to space bar press
};

function getpromptTrials() {
  return {
    // block instructions
    PreSlider_instruction:  PreSlider_instruction,
    PostSlider_instruction:  PostSlider_instruction,
    PassLabel_instruction:  PassLabel_instruction,
    ActLabel_instruction: ActLabel_instruction,
    PassRel_instruction: PassRel_instruction,
    ActRel_instruction: ActRel_instruction,
    PassAbs_instruction: PassAbs_instruction,
    ActAbs_instruction: ActAbs_instruction,
    PassLearn_continue: PassLearn_continue,
    ActLearn_continue: ActLearn_continue,
    // welcome and closue
    openning: welcome,
    waiting: waiting,
    closing: closing,
    // fixation
    fixation: fixation,
    pause: pause
  };
}

window.getpromptTrials = getpromptTrials;

/* * * * * * * * * * * * * * * * * * Prompts * * * * * * * ** * * * *  * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// slider prompts
// No variables needed, so keep as constants
const PreLabelSlider = `
  <p style="margin-Bottom: 2px !important;">Using the scale, in relation to the <i>grey objects on the two ends</i>,</p>
  <p style="margin-Top: 0px !important;"><b>Where would you place the pink object?</b></p>
`;

function DegQSlider(stimulus) {
  const randomlabel = stimulus.randomlabel;
  return `
    <p style="margin-Bottom: 2px !important;">Using the scale to answer, <b>how ${randomlabel} is the pink object?</b></p>
`;}
function EquaSlider(stimulus) {
  const randomlabel = stimulus.randomlabel;
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is <b>as <i>${randomlabel}</i> as</b> the grey object,</p>
    <p style="margin-Bottom: 2px !important;">On the scale, where would you place the pink object?</p>
`;}
function CompSlider(stimulus) {
  const adj = stimulus.adj;
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is <b><i>${adj}er</i></b> than the grey object,</p>
    <p style="margin-Bottom: 2px !important;">On the scale, where would you place the pink object?</p>
`;}
const OverSlider = `
  <p style="margin-Bottom: 2px !important;">On the scale, <b> where would you place the pink object?</b></p>
`;

// label prompts (passive)
function LabLearn(stimulus, labelType) {
  const adj = stimulus.adj;
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is ${(labelType === 'MP') ? 'about ' : ''}
    <b><i>${adj}</i></b>.</br>
    (Press the space bar to continue.) </p>
`;}
function AbsLearn(stimulus, labelType) {
  const modifier = (labelType === 'MP') ? stimulus.deg + ' frms' : (labelType === 'Adv') ? stimulus.adv : '';
  const adj = (labelType === 'Bare' || labelType === 'Adv') ? stimulus.adj : '';
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is ${(labelType === 'MP') ? 'about ' : ''}
    <b><i>${modifier ? modifier + ' ' : ''}${adj}</i></b>.</br>
    (Press the space bar to continue.) </p>
`;}
function RelLearn(stimulus, labelType) {
  const modifier = (labelType === 'Adv') ? stimulus.adv : stimulus.deg + ' frm(s)';
  const adj = stimulus.adj;
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is ${(labelType === 'MP') ? 'about ' : ''}
    <b><i>${modifier ? modifier + ' ' : ''}${adj}er</i></b> than the grey object.</br>
    (Press the space bar to continue.) </p>
`;}
// label prompts (active) // change to get correct key
function LabLearnAct(stimulus, labelType) {
  const correct = stimulus.key; //assume key is a level (numeric)
  const LevArray = Array.from({ length: linglabels.length }, (_, i) => i);
  const remainingLabels = LevArray.filter(label => label !== correct);
  const randomLabel = remainingLabels[Math.floor(Math.random() * remainingLabels.length)];
  const [Ia, Ib] = Shuffle([randomLabel, correct]);
  stimulus.key = (Ia === correct) ? 'q': 'p';
  const [A, B] = [linglabels[Ia], linglabels[Ib]];
  //console.log(linglabels, [Ia, Ib], [A, B]);
  return `
    <p style="margin-Bottom: 2px !important;">The pink object is </br>
    <strong>Q</strong>: <strong>${A}</strong>.&emsp;&emsp; <strong>P</strong>: <strong>${B}</strong>.</p>
`;}
function AbsLearnAct(stimulus, labelType) { //three level for complement adv/MP
  const [A, B, C] = (labelType === 'MP') ? ['about 3 frms', 'about 4 frms', 'about 5 frms']:['slightly', 'somewhat', 'very'];
  const adj = stimulus.adj;
  return `
    <p style="margin-Bottom: 2px !important;">How ${adj} is the pink object?</br>
    <strong>Q</strong>: <strong>${A}</strong>.&emsp;&emsp; <strong>T</strong>: <strong>${B}</strong>.&emsp;&emsp; <strong>P</strong>: <strong>${C}</strong>.</p>
`;}
function RelLearnAct(stimulus, labelType) { //three level for modifier adv/MP
  const [A, B, C] = (labelType === 'MP') ? ['about 1 frm', 'about 2 frms', 'about 3 frms']:['slightly', 'somewhat', 'much'];
  const adj = stimulus.adj;
  return `
    <p style="margin-Bottom: 2px !important;">Compared to the grey object, how much ${adj}er is the pink object?</br>
    <strong>Q</strong>: <strong>${A}</strong>.&emsp;&emsp; <strong>T</strong>: <strong>${B}</strong>.&emsp;&emsp; <strong>P</strong>: <strong>${C}</strong>.</p>
`;}
// takes in a label dictionary, and a trial type, output the resulting prompt
function getprompts({ stimulus, promptType, labelType }) {
    const promptTemplates = {   // Predefined prompt templates for different trial types
      PreLabelSlider: () => PreLabelSlider,  // No variables, return directly
      DegQSlider: () => DegQSlider(stimulus),  // Uses {label}
      EquaSlider: () => EquaSlider(stimulus),  // Uses {label}
      CompSlider: () => CompSlider(stimulus),  // Uses {label}
      OverSlider: () => OverSlider,  // No variables, return directly
      LabLearn: () => LabLearn(stimulus, labelType), // Uses {label}
      AbsLearn: () => AbsLearn(stimulus, labelType), // Uses {complement}
      RelLearn: () => RelLearn(stimulus, labelType), // Uses {modifier}, {Adj}
      LabLearnAct: () => LabLearnAct(stimulus, labelType),  // Uses {A}, {B} for Adj
      AbsLearnAct: () => AbsLearnAct(stimulus, labelType),  // Uses {A}, {B}, {C} for complement
      RelLearnAct: () => RelLearnAct(stimulus, labelType),  // Uses {A}, {B}, {C} for modifier
    };
    const template = promptTemplates[promptType];
    if (!template) {
        throw new Error(`Unknown trial type for prompt: ${promptType}`);
    }
    return template();
}

window.getprompts = getprompts;
