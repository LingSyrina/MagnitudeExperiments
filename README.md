Go to the [main experiment website](https://lingsyrina.github.io/MagnitudeExperiments/experiment.html)

# 1. Code structure
```
root --- experiment.html             /* The main experiment html         */  
 |  
 |  
utils --- canvasMorpher.js           /* Set canvas for stimuli           */  
 |    |-- util.js                    /* Stimuli parameters & generation  */  
 |      
blocks -- prompts.js                 /* Prompts and instruction blocks   */  
      |-- consent_handler.js         /* Subject ID, consent, data save   */  
      |-- slider_response.js         /* Slider blocks for outcome        */  
      |-- block_intervention.js      /* Learning block for label/measure */
```
# 2. Main functions
util.js -- BlockAppend
```
arg        |  value
-----------|-----------------------------------------------------------------
stimuliSet | [], can append stimuli of different types
labelDict  | {}, set label for different morph radius
numStimuli | required, set number of stimuli
method     | required, pick from 'SliderMorph', 'SliderPair', 'SliderOverlap'
           | 'MorphSingle', 'MorphPair' to generate morph canvas
promptType | required, pick from 'PreLabelSlider', 'DegQSlider', 'EquaSlider', 
           | 'CompSlider', 'LabelLearn', 'MeaLearn', 'DualLabelLearnAct',
           | 'FouriorLabelLearnAct', 'MeaLearnAct' to generate prompts 
```
   
slider_response.js -- GetSlider (slider blocks);  
block_intervention.js -- GetLabelPass, GetLabelActive, GetDegreePass, GetDegreeActive (learn blocks);  
```
arg           |  value
--------------|------------------------------------------------------------
prompts       | required, get fixation and break instructions from prompt.js
block_stimuli | required, get stimuli for task block
task_name     | required, set task name in final data
```
   
Example call for simple slider block:
```
let pre_stimuli = BlockAppend({numStimuli:pre_trial, promptType:'PreLabelSlider', method:'SliderMorph'}); // get stimuli
const prompts = getpromptTrials(); // get prompts from prompt.js
const preSlider = GetSlider(prompts, pre_stimuli, 'pre_intervention'); //define the block
...
timeline.push(preSlider);
...
```
# 3. Argument documentation for methods
## Methods (see canvasMorpher.js)
```
option        |  var      | description
-----------–--|-------------------------------------------------------------------
SliderMorph    /* a central morph and a slider w/ two reference morphs */
              | par       |p, radius that controls the central morph
              | r         |[0,1], radius of the two reference morphs
              | condition |0, control the order of the two reference morphs
SliderPair     /* central morph pair and a slider w/ two reference morphs */
              | par       |[p1,p2], radius pair that controls the morph pair
              | r         |[0,1], radius of the two reference morphs
              | condition |0, control the order of the two reference morphs
SliderOverlap  /* two overlapping morph and a slider w/ reference morphs */ 
              | par       |[p1,p2], radius pair that controls the morph overlap
              | r         |[0,1], radius of the two reference morphs
              | condition |0, control the order of the two reference morphs
MorphSingle   /* get a single morph */
              | par       |p, radius that controls the morph
              | n         |0, noise scale value
MorphPair     /* get a pair of morph */
              | par       |[p1, p2], radius pair that controls the morph pair
              | n         |[0, 0], noise scale value pair

```
