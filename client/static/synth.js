setTimeout(function(){
let audioContext = new (window.AudioContext || window.webkitAudioContext);
let oscList = [];
let masterGainNode = null;
let whitekeys = document.querySelector(".whitekeys");
let blackkeys = document.querySelector(".blackkeys");
let wavePicker = document.querySelector("select[name='waveform']");
let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;
function createNoteTable() {
  let noteFreq = [];
  for (let i=0; i< 9; i++) {
    noteFreq[i] = [];
  }
  noteFreq[3]["C"] = 130.812782650299317;
  noteFreq[3]["C#"] = 138.591315488436048;
  noteFreq[3]["D"] = 146.832383958703780;
  noteFreq[3]["D#"] = 155.563491861040455;
  noteFreq[3]["E"] = 164.813778456434964;
  noteFreq[3]["F"] = 174.614115716501942;
  noteFreq[3]["F#"] = 184.997211355817199;
  noteFreq[3]["G"] = 195.997717990874647;
  noteFreq[3]["G#"] = 207.652348789972569;
  noteFreq[3]["A"] = 220.000000000000000;
  noteFreq[3]["A#"] = 233.081880759044958;
  noteFreq[3]["B"] = 246.941650628062055;

  noteFreq[4]["C"] = 261.625565300598634;
  noteFreq[4]["C#"] = 277.182630976872096;
  noteFreq[4]["D"] = 293.664767917407560;
  noteFreq[4]["D#"] = 311.126983722080910;
  noteFreq[4]["E"] = 329.627556912869929;
  noteFreq[4]["F"] = 349.228231433003884;
  noteFreq[4]["F#"] = 369.994422711634398;
  noteFreq[4]["G"] = 391.995435981749294;
  noteFreq[4]["G#"] = 415.304697579945138;
  noteFreq[4]["A"] = 440.000000000000000;
  noteFreq[4]["A#"] = 466.163761518089916;
  noteFreq[4]["B"] = 493.883301256124111;
  return noteFreq;
}
if (!Object.entries) {
    Object.entries = function entries(O) {
        return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
    };
}

function setup() {
  noteFreq = createNoteTable();

  // volumeControl.addEventListener("change", changeVolume, false);

  masterGainNode = audioContext.createGain();
  masterGainNode.connect(audioContext.destination);
  // masterGainNode.gain.value = volumeControl.value;

  // Create the keys; skip any that are sharp or flat; for
  // our purposes we don't need them. Each octave is inserted
  // into a <div> of class "octave".

  noteFreq.forEach(function(keys, idx) {
    let keyList = Object.entries(keys);
    let octaveElem = document.createElement("div");
    octaveElem.className = "octave";

    keyList.forEach(function(key) {
      if (key[0].length == 1) {

        octaveElem.appendChild(createKey(key[0], idx, key[1]));
      }

    });
    whitekeys.appendChild(octaveElem);
  });

   noteFreq.forEach(function(keys, idx) {
    let keyList = Object.entries(keys);
    let octaveElem = document.createElement("div");
    octaveElem.className = "octave";

    keyList.forEach(function(key) {
      if (key[0].length == 2) {

        octaveElem.appendChild(createKeyblack(key[0], idx, key[1]));
      }

    });
    blackkeys.appendChild(octaveElem);
  });
  document.querySelector("div[data-note='B'][data-octave='5']").scrollIntoView(false);

  sineTerms = new Float32Array([0, 0, 1, 0, 1]);
  cosineTerms = new Float32Array(sineTerms.length);
  customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

  for (i=0; i<9; i++) {
      oscList[i] = [];
  }
}
setup();function createKeyblack(note, octave, freq) {
  let keyElementblack = document.createElement("div");
  let labelElement = document.createElement("div");

  keyElementblack.className = "keyblack";
  keyElementblack.dataset["octave"] = octave;
  console.log(note, octave, freq);
  keyElementblack.dataset["note"] = note;
  keyElementblack.dataset["frequency"] = freq;

  labelElement.innerHTML = note + "<sub>" + octave + "</sub>";
  keyElementblack.appendChild(labelElement);

  keyElementblack.addEventListener("mousedown", notePressed, false);
  keyElementblack.addEventListener("mouseup", noteReleased, false);
  keyElementblack.addEventListener("mouseover", notePressed, false);
  keyElementblack.addEventListener("mouseleave", noteReleased, false);

  return keyElementblack;
}
setup();function createKey(note, octave, freq) {
  let keyElement = document.createElement("div");
  let labelElement = document.createElement("div");

  keyElement.className = "keywhite";
  keyElement.dataset["octave"] = octave;
  console.log(note, octave, freq);
  keyElement.dataset["note"] = note;
  keyElement.dataset["frequency"] = freq;

  labelElement.innerHTML = note + "<sub>" + octave + "</sub>";
  keyElement.appendChild(labelElement);

  keyElement.addEventListener("mousedown", notePressed, false);
  keyElement.addEventListener("mouseup", noteReleased, false);
  keyElement.addEventListener("mouseover", notePressed, false);
  keyElement.addEventListener("mouseleave", noteReleased, false);

  return keyElement;
}
function playTone(freq) {
  let osc = audioContext.createOscillator();
  osc.connect(masterGainNode);

  let type = wavePicker.options[wavePicker.selectedIndex].value;

  if (type == "custom") {
    osc.setPeriodicWave(customWaveform);
  } else {
    osc.type = type;
  }

  osc.frequency.value = freq;
  osc.start();

  return osc;
}
function notePressed(event) {
  if (event.buttons & 1) {
    let dataset = event.target.dataset;

    if (!dataset["pressed"]) {
      oscList[dataset["octave"][dataset["note"]]] = playTone(dataset["frequency"]);
      dataset["pressed"] = "yes";
    }
  }
}
function noteReleased(event) {
  let dataset = event.target.dataset;

  if (dataset && dataset["pressed"]) {
    oscList[dataset["octave"][dataset["note"]]].stop();
    oscList[dataset["octave"][dataset["note"]]] = null;
    delete dataset["pressed"];
  }
}
function changeVolume(event) {
  // masterGainNode.gain.value = volumeControl.value
}
}, 10)
var audioContext = new window.AudioContext(),
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 400;
    oscillator.start();

// Create an Oscilloscope instance
//   Parameters:
//     - The container in which the oschilloscope gets created
//     - an optional audio-context on which the oscilloscope creates an analyser-node,
//          and can connect to the destination.
//          If no audio-context is specified, a new one will be created created.
var oscilloscope = new Oscilloscope('.js-oscilloscope', audioContext);

// Connect the oscillator-node to the oscilloscope
oscillator.connect(oscilloscope.analyserNode);

// Start the oscilloscope
oscilloscope.start();
