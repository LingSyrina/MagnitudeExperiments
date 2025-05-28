// ********** Feedback trial **********//
const feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        // console.log(jsPsych.data.get().last(1).values()[0]);
        const last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        return last_trial_correct ? posprompt : negprompt;
    },
    choices: 'NO_KEYS',
    trial_duration: 700, // 0.7 second
};

// ********** Loop for each trial **********//
function createLoopedTrial(stim, createTrial, prompts) {
    return {
        timeline: [
            prompts.fixation,
            prompts.pause,
            { timeline: [createTrial(), feedback],
              timeline_variables: [stim], // Pass individual stimulus as timeline variable
              loop_function: function (data) {
                return !data.values()[0].correct; // Continue looping if the response was incorrect
            }}],
          }}

function GetLabelPass(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method')
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

function GetLabelActive(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      if (data.response != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  // Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) =>
      createLoopedTrial(stim, createTrial, prompts)
  );

  return {
      timeline: pauseAndTrialTimeline,
  };
}

function GetLabel(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    choices: ['p', 'q'],
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      if (data.response != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

function GetIntLabel(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    choices: ['1', '2', '3', '4', '5', '6'],
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      if (data.response != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

// ********** following functions are used with button response with mouse tracking **********//
const jsPsych = initJsPsych({
      extensions: [
        { type: jsPsychExtensionMouseTracking, params: {minimum_sample_time: 0} }
      ]
    });

function GetLabelActiveButton(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasButtonResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    on_start: function() {
      const container = jsPsych.getDisplayElement();
      container.innerHTML = ''; // Clear previous content
    },
    on_load: function() { // Move prompt div below canvas, before buttons
      const canvas = document.querySelector('canvas');
      const prompt = document.createElement('div');
      prompt.innerHTML = `<p><strong>The pink object is:</strong></p>`;
      prompt.style.textAlign = 'center';
      prompt.style.marginTop = '10px';
      canvas.insertAdjacentElement('afterend', prompt); // Insert the prompt after the canvas
    },
    canvas_size: [250,600],
    prompt: "",
    choices: jsPsych.timelineVariable('order'),
    response_ends_trial: true,
    extensions: [
      {type: jsPsychExtensionMouseTracking, params: {targets: ['#target']}}
    ],
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),//could need modification for exp 2
      order: () => jsPsych.timelineVariable('order'),
      truelabel:() => task_name.includes('label') ? jsPsych.timelineVariable('adj') : jsPsych.timelineVariable('LevKey'),//could need modification for exp 2
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      // console.log(data.response);
      data.subjectResponse = data.order[data.response];
      // console.log(data.subjectResponse, data.response, data.key);
      if (["p","q"][data.response] != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  // Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) =>
      createLoopedTrial(stim, createTrial, prompts)
  );

  return {
      timeline: pauseAndTrialTimeline,
  };
}

function GetLabelButton(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasButtonResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    on_start: function() {
      const container = jsPsych.getDisplayElement();
      container.innerHTML = ''; // Clear previous content
    },
    on_load: function() { // Move prompt div below canvas, before buttons
      const canvas = document.querySelector('canvas');
      const prompt = document.createElement('div');
      prompt.innerHTML = `<p><strong>The pink object is:</strong></p>`;
      prompt.style.textAlign = 'center';
      prompt.style.marginTop = '10px';
      canvas.insertAdjacentElement('afterend', prompt); // Insert the prompt after the canvas
    },
    canvas_size: [250,600],
    // prompt: jsPsych.timelineVariable('prompt'),
    choices: jsPsych.timelineVariable('order'),
    response_ends_trial: true,
    extensions: [
      {type: jsPsychExtensionMouseTracking, params: {targets: ['#target']}}
    ],
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),
      order: () => jsPsych.timelineVariable('order'),
      truelabel:() => task_name.includes('label') ? jsPsych.timelineVariable('adj') : jsPsych.timelineVariable('LevKey'),//could need modification for exp 2
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      // console.log(data.response);
      data.subjectResponse = data.order[data.response];
      // console.log(data.subjectResponse, data.response, data.key);
      if (["p","q"][data.response] != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

function GetIntLabelButton(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasButtonResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    on_start: function() {
      const container = jsPsych.getDisplayElement();
      container.innerHTML = ''; // Clear previous content
    },
    on_load: function() {
      const canvas = document.querySelector('canvas');
      const prompt = document.createElement('div');
      prompt.innerHTML = `<p><strong>The pink object is:</strong></p>`;
      prompt.style.textAlign = 'center';
      prompt.style.marginTop = '10px';
      canvas.insertAdjacentElement('afterend', prompt);
      const btnContainer = document.getElementById('jspsych-canvas-button-response-btngroup');
      if (btnContainer) {
        btnContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        btnContainer.style.gridTemplateRows = 'auto';
        btnContainer.style.gap = '2px';
        btnContainer.style.maxWidth = '700px';
        btnContainer.style.margin = '2px auto';
      }
    },
    canvas_size: [250,600],
    // prompt: jsPsych.timelineVariable('prompt'),
    choices: jsPsych.timelineVariable('order'),
    button_html: function(choice, i) {
      return '<button class="jspsych-btn">' + choice + '</button>';
    },
    response_ends_trial: true,
    extensions: [
      {type: jsPsychExtensionMouseTracking, params: {targets: ['#target']}}
    ],
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => task_name.includes('label') ? jsPsych.timelineVariable('key') : jsPsych.timelineVariable('LevKey'),
      order: () => jsPsych.timelineVariable('order'),
      truelabel:() => task_name.includes('label') ? jsPsych.timelineVariable('adj') : jsPsych.timelineVariable('LevKey'),//could need modification for exp 2
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      data.subjectResponse = data.order[data.response];
      // console.log(data.subjectResponse, data.response, data.key);
      if (["p","q"][data.response] != data.key) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

// ********** following functions are not used at the moment **********//
function GetDegreePass(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
    }
  });
  //Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) => ({
    timeline: [
      prompts.fixation,
      prompts.pause,
      createTrial(),
    ],
    timeline_variables: [stim], // Pass individual stimulus as timeline variable
  }));
  return {
    timeline: pauseAndTrialTimeline,
  };
}

function GetDegreeActive(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasKeyboardResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const rand = jsPsych.timelineVariable('rand');
      await Morphfunction({ canvas: c, par: radius, rand: rand, method: method });
      return c;
    },
    canvas_size: [250,600],
    prompt: jsPsych.timelineVariable('prompt'),
    response_ends_trial: true,
    data: {
      task: task_name,
      radius: () => jsPsych.timelineVariable('radius'),
      rand: () => jsPsych.timelineVariable('rand'),
      method: () => jsPsych.timelineVariable('method'),
      key: () => jsPsych.timelineVariable('degree'),
    },
    on_finish: function(data) { // Score the response as correct or incorrect.
      if (Math.floor(Math.abs(data.response - data.key)) > 1) {
        data.correct = false;
      } else {
        data.correct = true;
      }
    }
  });
  // Block configuration
  const pauseAndTrialTimeline = randomizedStimuli.map((stim) =>
      createLoopedTrial(stim, createTrial, prompts)
  );

  return {
      timeline: pauseAndTrialTimeline,
  };
}

// ********** Global Functions **********//
window.GetSlide = GetLabelPass;
window.GetInterActive = GetLabelActive;
window.GetDegreePass = GetDegreePass;
window.GetDegreeActive = GetDegreeActive;
