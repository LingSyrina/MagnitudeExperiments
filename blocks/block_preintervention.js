function GetSlide(prompts, trial_num, task_name) {
  // Dynamically create the trial
  const createTrial = () => ({
    type: jsPsychCanvasSliderResponse,
    stimulus: async function(c) {
      // Access timeline variables during execution
      const radiusA = jsPsych.timelineVariable('radius_a'); // Access at runtime
      const radiusB = jsPsych.timelineVariable('radius_b'); // Access at runtime

      await Morphfunction(c, radiusA, radiusB);
      return c;
    },
    canvas_size: [400, 900],
    labels: ['a', 'b'],
    prompt: `<p>Where would you posit the object?</p>`,
    response_ends_trial: true,
    data: {
      task: jsPsych.timelineVariable('task_name'),
      stimuli_1: () => jsPsych.timelineVariable('radius_a'), // Dynamic access
      stimuli_2: () => jsPsych.timelineVariable('radius_b'), // Dynamic access
    },
  });

  // Generate timeline variables
  const block_a_stimuli = GenerateMorphpair(trial_num, task_name);
  console.log(block_a_stimuli); // Debug: Ensure variables are generated correctly

  // Define the timeline for this block
  const pauseAndTrialTimeline = {
    timeline: [prompts.fixation, prompts.pause, createTrial()], // Dynamically create trial
    timeline_variables: block_a_stimuli, // Pass timeline variables here
  };

  return pauseAndTrialTimeline; // Return the block configuration
}

window.GetSlide = GetSlide;
