// Feedback trial
const feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        console.log(jsPsych.data.get().last(1).values()[0]);
        const last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        return last_trial_correct
            ? "<p style=font-size:20px;font-weight:bold;>Great job!</p>"
            : "<p style=font-size:20px;font-weight:bold;>Nope, let's try again!</p>";
    },
    choices: 'NO_KEYS',
    trial_duration: 700, // 0.7 second
};
// Loop for each trial
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

//rewrite to get the correct adj label
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

// following functions are not used at the moment
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

window.GetSlide = GetLabelPass;
window.GetInterActive = GetLabelActive;
window.GetDegreePass = GetDegreePass;
window.GetDegreeActive = GetDegreeActive;
