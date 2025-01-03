/* * * * * * * * * * * * * * * * * * Instructions * * * * * * * * * *  * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var blockA_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p> In this section, you will </p>
    <p>Press the space bar to begin.</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var blockB_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p> In this section, you will </p>
    <p>Press the space bar to begin.</p>
  `,
  choices: [' '], // restricts to space bar press
  post_trial_gap: 500
};

var blockC_instruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p> In this section, you will </p>
    <p>Press the space bar to begin.</p>
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
    instruct_A:  blockA_instruction,
    instruct_B:  blockB_instruction,
    instruct_C:  blockC_instruction,
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
      <p style="margin-Bottom: 2px !important;">The pink object is as <i>{label}</i> as the grey object,</p>
      <p style="margin-Bottom: 2px !important;">On the scale, <b> where would you place the pink object?</b></p>
    `;
const CompSlider = `
      <p style="margin-Bottom: 2px !important;">The pink object is <i>{label}er</i> than the grey object,</p>
      <p style="margin-Bottom: 2px !important;">On the scale, <b> where would you place the pink object?</b></p>
    `;
const OverSlider = `
      <p style="margin-Bottom: 2px !important;">On the scale, <b> where would you place the pink object?</b></p>
    `;
const LabelLearn = `
      <p style="margin-Bottom: 2px !important;">The pink object is <i>{label}er</i> than the grey object.</p>
    `;
const MeaLearn = `
      <p style="margin-Bottom: 2px !important;">The pink object is <i>{degree} formons</i>.</p>
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
      <p style="margin-Bottom: 2px !important;">Approximate its measure (0-5 formons) using the keyboard. </br>
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
