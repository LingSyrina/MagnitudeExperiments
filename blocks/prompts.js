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
    <p>In this section, you will see a pair of objects and a description of the relationship between them.</p>
     <p>Carefully observe the objects and the accompanying line describing the pair.</p>
     <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActLabel_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>You will continue see pairs of objects.</p>
    <p>Your task now is to <b>select the description</b> that best matches the relationship between the objects.</p>
    <p>You must answer each question correctly to proceed.</p>
    <p>(Press the space bar to continue.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var PassDegree_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see an object along with its measurement description.</p>
    <p>Observe the object carefully and review the accompanying measurement details.</p>
    <p>(Press the space bar to begin.)</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var ActDegree_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this section, you will see an object and an incomplete measurement description.</p>
    <p>Your task is to carefully observe the object and provide an approximate value for the measurement.</p>
    <p>You can only proceed if your approximation is within one unit of the actual value.</p>
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
    PassDegree_instruction: PassDegree_instruction,
    ActDegree_instruction: ActDegree_instruction, 
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
const PreLabelSlider = `
    <p style="margin-Bottom: 2px !important;">Using the scale, in relation to the <i>grey objects on the two ends</i>,</p>
    <p style="margin-Top: 0px !important;"><b>Where would you place the pink object?</b></p>
  `;
const DegQSlider = `
      <p style="margin-Bottom: 2px !important;">Using the scale to answer, <b>how {label} is the pink object?</b></p>
    `;
const EquaSlider = `
      <p style="margin-Bottom: 2px !important;">The pink object is <b>as <i>{label}</i> as</b> the grey object,</p>
      <p style="margin-Bottom: 2px !important;">On the scale, where would you place the pink object?</p>
    `;
const CompSlider = `
      <p style="margin-Bottom: 2px !important;">The pink object is <b><i>{label}er</i></b> than the grey object,</p>
      <p style="margin-Bottom: 2px !important;">On the scale, where would you place the pink object?</p>
    `;
const OverSlider = `
      <p style="margin-Bottom: 2px !important;">On the scale, <b> where would you place the pink object?</b></p>
    `;
const LabelLearn = `
      <p style="margin-Bottom: 2px !important;">The pink object is <b><i>{label}er</i> than</b> the grey object.</br>
      (Press the space bar to continue.)</p>
    `;
const MeaLearn = `
      <p style="margin-Bottom: 2px !important;">The pink object is <b><i>{degree} formons</i></b>.</br>
      (Press the space bar to continue.) </p>
    `;
const DualLabelLearnAct = `
      <p style="margin-Bottom: 2px !important;">Compared to the grey object, the pink object is </br>
      <strong>Q</strong>: <strong>{A}er</strong>.&emsp;&emsp; <strong>P</strong>: <strong>{B}er</strong>.</p>
    `;
const FouriorLabelLearnAct = `
      <p style="margin-Bottom: 2px !important;">Compared to the grey object, the pink object is </br>
      <strong>Q</strong>: <strong>{A}er</strong>.&emsp;&emsp; <strong>W</strong>: <strong>{B}er</strong>.&emsp;&emsp;
      <strong>O</strong>: <strong>{C}er</strong>.&emsp;&emsp; <strong>P</strong>: <strong>{D}er</strong>.</p>
    `;
const MeaLearnAct = `
      <p style="margin-Bottom: 2px !important;">Approximate its <b>measure (1-6 formons)</b> using the <b>keyboard</b>. </br>
      (Correct if error within 1 formon. ) </p>
    `;

// takes in a label dictionary, and a trial type, output the resulting prompt
function getprompts({ labels = {}, trialtype = 'PreLabelSlider' }) {
    const promptTemplates = {   // Predefined prompt templates for different trial types
        // pre-intervention prompt
        PreLabelSlider: PreLabelSlider, // no label
        // post-intervention prompt
        DegQSlider: DegQSlider, // random label
        EquaSlider: EquaSlider, // random label
        CompSlider: CompSlider, // true label
        OverSlider: OverSlider,
        // intervention prompt
        LabelLearn: LabelLearn, // true label
        MeaLearn: MeaLearn, // true label
        DualLabelLearnAct: DualLabelLearnAct,
        FouriorLabelLearnAct:FouriorLabelLearnAct,
        MeaLearnAct: MeaLearnAct
    };
    const template = promptTemplates[trialtype];
    if (!template) {
        throw new Error(`Unknown trial type for prompt: ${trialtype}`);
    }
    const prompt = Object.keys(labels).reduce(
        (result, key) => result.replace(`{${key}}`, labels[key]),
        template
    );
    return prompt;
}

window.getprompts = getprompts;
