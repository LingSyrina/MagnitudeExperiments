function GetSlider(prompts, block_stimuli, task_name) {
  // Dynamically create the trial
  const randomizedStimuli = jsPsych.randomization.shuffle(block_stimuli);
  const createTrial = () => ({
    type: jsPsychCanvasSliderResponse,
    stimulus: async function(c) {
      const method = jsPsych.timelineVariable('method');
      const radius = jsPsych.timelineVariable('radius');
      const condition = Math.random() < 0.5 ? 0 : 1; // governs reference order
      await Morphfunction({ canvas: c, par: radius, condition: condition, method: method });
      return c;
    },
    canvas_size: [250,600],
    slider_width: 500,
    prompt: jsPsych.timelineVariable('prompt'),
    response_ends_trial: true,
    require_movement: true,
    labels: jsPsych.timelineVariable('reflabel'),
    data: {
      task: task_name,
      stimulus: () => jsPsych.timelineVariable('radius'),
      method: () => jsPsych.timelineVariable('method'),
      condition: () => jsPsych.timelineVariable('condition')
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

window.GetSlide = GetSlider;
