// decl piano container
let pianoContainer = document.querySelector('.piano-container');
let btns = document.querySelectorAll('button');

// create synth
let synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();

// create notes
let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// decl start octave
let startOctave = 4;

// change octaves buttons
btns[0].addEventListener('click', () => {
  if (startOctave > 1) {
    startOctave--;
  }
  pianoContainer.innerHTML = '';
  createPiano();
  pressKeys();
});
btns[1].addEventListener('click', () => {
  if (startOctave < 6) {
    startOctave++;
  }
  pianoContainer.innerHTML = '';
  createPiano();
  pressKeys();
});

// CREATING PIANO
let createPiano = () => {
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
let pressKeys = () => {
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
  keys.forEach((key) => {
    key.addEventListener('click', () => {
      let note = key.dataset.note;
      synth.triggerAttackRelease(note, '16n');
      let keyElement = document.querySelector(`[data-note="${note}"]`);
      keyElement.style.backgroundColor =
        note.length > 2 ? 'rgb(54, 54, 54)' : 'rgb(220, 220, 220)';
      setTimeout(() => {
        keyElement.style.backgroundColor = note.length > 2 ? 'black' : 'white';
      }, 200);
      recordNote(note);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    for (let key in keydowns) {
      if (keydowns[e.key] === keydowns[key]) {
        let note = keydowns[e.key];
        synth.triggerAttack(note);
        recordNote(note);
        let keyElement = document.querySelector(`[data-note="${note}"]`);
        keyElement.style.backgroundColor =
          note.length > 2 ? 'rgb(54, 54, 54)' : 'rgb(220, 220, 220)';
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.repeat) return;
    for (let key in keydowns) {
      if (keydowns[e.key] === keydowns[key]) {
        let note = keydowns[e.key];
        synth.triggerRelease(note);
        let keyElement = document.querySelector(`[data-note="${note}"]`);
        keyElement.style.backgroundColor = note.length > 2 ? 'black' : 'white';
      }
    }
  });
};
pressKeys();

// recording notes played
let recordNote = (note) => {
  let notePlayed = [];
  notePlayed.push({ played: note, time: Math.floor(performance.now()) });
  console.log(notePlayed);
};
