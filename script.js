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
  pressKeys();
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

// KEYBOARD INTERACT
let keydowns = {};

// pressing keys event handlers
const pressKeys = () => {
  let keys = document.querySelectorAll('.key');
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
    2: 'C#' + (startOctave + 1),
    '.': 'D' + (startOctave + 1),
    w: 'D' + (startOctave + 1),
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

  const findNote = (e) => (e.key ? keydowns[e.key] : e.dataset.note);

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      let note = findNote(key);
      synth.triggerAttackRelease(note, '16n');
      changeColor(note, 'rgb(54, 54, 54)', 'rgb(220, 220, 220)');
      let keyElement = changeColor(note);
      setTimeout(() => {
        keyElement.style.backgroundColor = note.length > 2 ? 'black' : 'white';
      }, 200);
      recordNote(note);
    });
  });

  const changeColor = (note, blackKeys, whiteKeys) => {
    let keyElement = document.querySelector(`[data-note="${note}"]`);
    for (let key in keydowns) {
      if (note === keydowns[key]) {
        keyElement.style.backgroundColor =
          note.length > 2 ? blackKeys : whiteKeys;
      }
    }
    return keyElement;
  };

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let note = findNote(e);
    changeColor(note, 'rgb(54, 54, 54)', 'rgb(220, 220, 220)');
    synth.triggerAttack(note);
  });
  document.addEventListener('keyup', (e) => {
    let note = findNote(e);
    changeColor(note, 'Black', 'White');
    synth.triggerRelease(note);
  });
  document.addEventListener('keyup', (e) => {
    let note = findNote(e);
    synth.triggerRelease(note);
  });
};
pressKeys();

// recording notes played
let recordNote = (note) => {
  let notePlayed = [];
  notePlayed.push({ played: note, time: Math.floor(performance.now()) });
  // console.log(notePlayed);
};
