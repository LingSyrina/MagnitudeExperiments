
var trial = {
    type: jsPsychCanvasSliderResponse,
    stimulus: twoSquares,
    labels: ['0','10'],
    canvas_size: [150, 500],
    prompt: `<p>How different would you say the colors of these two squares are
            on a scale from 0 (the same) to 10 (completely different)</p>`,
    data: {color1: colors[0], color2: colors[1]}
}

const prompts = getprompts();
const timeline = [];
timeline.push(prompts.instruct_C, prompts.fixation, prompts.pause);

function getblockC(){
  return timeline
}
