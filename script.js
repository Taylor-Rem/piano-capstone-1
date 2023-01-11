// decl piano container
let pianoContainer = document.querySelector('.piano-container');
let btns = document.querySelectorAll('button');

// create synth
let synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

// create notes
let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// decl start octave
let startOctave = 4;
// decl next octave
let upOctave = startOctave + 1;

// deletes piano from DOM
let deletePiano = () => {
  while (pianoContainer.firstChild) {
    pianoContainer.removeChild(pianoContainer.firstChild);
  }
};

btns[0].addEventListener('click', () => {
  if (startOctave > 1) {
    startOctave--;
  }
  deletePiano();
  createPiano();
});
btns[1].addEventListener('click', () => {
  if (startOctave < 6) {
    startOctave++;
  }
  deletePiano();
  createPiano();
});

// CREATING PIANO
let createPiano = () => {
  // number of octaves
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < notes.length; i++) {
      let hasSharp = true;
      if (notes[i] === 'E' || notes[i] === 'B') {
        hasSharp = false;
      }

      let key = document.createElement('div');
      key.setAttribute('data-note', notes[i] + (k + startOctave));
      key.classList.add('white', 'key');
      pianoContainer.appendChild(key);
      if (hasSharp) {
        let key = document.createElement('div');
        key.setAttribute('data-note', notes[i] + '#' + (k + startOctave));
        key.classList.add('black', 'key');
        pianoContainer.appendChild(key);
      }
    }
  }
  let keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    key.addEventListener('click', () => {
      synth.triggerAttackRelease(key.dataset.note, '16n');
      changeColors(key);
    });
  });

  document.addEventListener('keydown', (e) => {
    synth.triggerAttackRelease(keydowns[e.key], '16n');
    changeColors(e);
  });
};
createPiano();

let keydowns = {
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
  q: 'C' + upOctave,
  2: 'C#' + upOctave,
  w: 'D' + upOctave,
  3: 'D#' + upOctave,
  e: 'E' + upOctave,
  r: 'F' + upOctave,
  5: 'F#' + upOctave,
  t: 'G' + upOctave,
  6: 'G#' + upOctave,
  y: 'A' + upOctave,
  7: 'A#' + upOctave,
  u: 'B' + upOctave,
};

let changeColors = (e) => {
  let note;
  if (e.key) {
    note = keydowns[e.key];
  } else {
    note = e.dataset.note;
  }
  let keyElement = document.querySelector(`[data-note="${note}"]`);
  keyElement.style.backgroundColor =
    note.length > 2 ? 'rgb(54, 54, 54)' : 'rgb(220, 220, 220)';
  setTimeout(() => {
    keyElement.style.backgroundColor = note.length > 2 ? 'black' : 'white';
  }, 200);
};
