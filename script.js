let pianoContainer = document.querySelector('.piano-container');
let btns = document.querySelectorAll('button');

// create synth
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

// create notes
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// decl start octave
let startOctave = 4;

// CHANGE OCTAVE FUNCTIONS

// every time octave is changed
const octaveChange = () => {
  pianoContainer.innerHTML = '';
  createPiano();
  updateDOM();
};

// octave down function
const octaveDown = () => {
  if (startOctave > 1) {
    startOctave--;
  }
};
// octave down event listeners
btns[0].addEventListener('click', () => {
  octaveDown();
  octaveChange();
});
document.addEventListener('keydown', (e) => {
  if (e.key === '[') {
    octaveDown();
    octaveChange();
  }
});

// octave up function
const octaveUp = () => {
  if (startOctave < 6) {
    startOctave++;
  }
};
// octave up event listeners
btns[1].addEventListener('click', () => {
  octaveUp();
  octaveChange();
});
document.addEventListener('keydown', (e) => {
  if (e.key === ']') {
    octaveUp();
    octaveChange();
  }
});

// CREATING PIANO
const createPiano = () => {
  // number of octaves
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < notes.length; i++) {
      // defining if key has sharp
      let hasSharp = true;
      if (notes[i] === 'E' || notes[i] === 'B') {
        hasSharp = false;
      }
      // white keys
      let key = document.createElement('div');
      key.setAttribute('data-note', notes[i] + (k + startOctave));
      key.classList.add('white', 'key');
      pianoContainer.appendChild(key);
      // black keys
      if (hasSharp) {
        let key = document.createElement('div');
        key.setAttribute('data-note', notes[i] + '#' + (k + startOctave));
        key.classList.add('black', 'key');
        pianoContainer.appendChild(key);
      }
    }
  }
};
createPiano();

// decl DOM elements
let keydowns = {};
let keys;

// pressing keys function
const updateDOM = () => {
  // updating DOM
  keys = document.querySelectorAll('.key');
  // defining keys pressed on keyboard interact
  keydowns = {
    z: 'C' + startOctave,
    s: 'C#' + startOctave,
    x: 'D' + startOctave,
    d: 'D#' + startOctave,
    c: 'E' + startOctave,
    v: 'F' + startOctave,
    g: 'F#' + startOctave,
    b: 'G' + startOctave,
    h: 'G#' + startOctave,
    n: 'A' + startOctave,
    j: 'A#' + startOctave,
    m: 'B' + startOctave,
    ',': 'C' + (startOctave + 1),
    q: 'C' + (startOctave + 1),
    l: 'C#' + (startOctave + 1),
    2: 'C#' + (startOctave + 1),
    '.': 'D' + (startOctave + 1),
    w: 'D' + (startOctave + 1),
    ';': 'D#' + (startOctave + 1),
    3: 'D#' + (startOctave + 1),
    '/': 'E' + (startOctave + 1),
    e: 'E' + (startOctave + 1),
    r: 'F' + (startOctave + 1),
    5: 'F#' + (startOctave + 1),
    t: 'G' + (startOctave + 1),
    6: 'G#' + (startOctave + 1),
    y: 'A' + (startOctave + 1),
    7: 'A#' + (startOctave + 1),
    u: 'B' + (startOctave + 1),
  };
};
updateDOM();

// NOTE PRESS FUNCTIONS

// key color change
const changeColor = (note, blackKeys, whiteKeys) => {
  let keyElement = document.querySelector(`[data-note="${note}"]`);
  for (let key in keydowns) {
    if (note === keydowns[key]) {
      keyElement.style.backgroundColor =
        note.length > 2 ? blackKeys : whiteKeys;
    }
  }
};

// finds note played
const findNote = (e) => (e.key ? keydowns[e.key] : e.dataset.note);

// playing with mouse click

// mouse click event listener
keys.forEach((key) => {
  key.addEventListener('click', () => {
    let note = findNote(key);
    synth.triggerAttackRelease(note, '16n');
    changeColor(note, 'rgb(54, 54, 54)', 'rgb(220, 220, 220)');
    setTimeout(() => changeColor(note, 'Black', 'White'), 200);
  });
});

// playing with keyboard

// decl last key pressed
let lastKey;
// keydown event listener
document.addEventListener('keydown', (e) => {
  // makes sure not to press same key more than once when held
  if (e.key === lastKey) return;
  lastKey = e.key;
  // decl note for color change and sound
  let note = findNote(e);
  changeColor(note, 'rgb(54, 54, 54)', 'rgb(220, 220, 220)');
  synth.triggerAttack(note);
  recordNote(note);
});
// keyup event listener
document.addEventListener('keyup', (e) => {
  lastKey = '';
  let note = findNote(e);
  changeColor(note, 'Black', 'White');
  synth.triggerRelease(note);
});

// recording notes played
let notePlayed = [];
let recordNote = (note) => {
  notePlayed.push({ played: note, time: Math.floor(performance.now()) });
  console.log(notePlayed);
};
