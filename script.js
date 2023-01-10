let pianoContainer = document.querySelector('.piano-container');

let synth = new Tone.Synth().toDestination();

let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

for (let octave = 0; octave < 2; octave++) {
  for (let i = 0; i < notes.length; i++) {
    let hasSharp = true;
    if (notes[i] === 'E' || notes[i] === 'B') {
      hasSharp = false;
    }
    let key = document.createElement('div');
    key.setAttribute('data-note', notes[i] + (octave + 4));
    key.classList.add('white', 'key');
    pianoContainer.appendChild(key);
    if (hasSharp) {
      let key = document.createElement('div');
      key.setAttribute('data-note', notes[i] + '#' + (octave + 4));
      key.classList.add('black', 'key');
      pianoContainer.appendChild(key);
    }
  }
}
let keys = document.querySelectorAll('.key');

// keys.data.note.style = 'rgb(220, 220, 220)';

let keydowns = {
  z: 'C4',
  s: 'C#4',
  x: 'D4',
  d: 'D#4',
  c: 'E4',
  v: 'F4',
  g: 'F#4',
  b: 'G4',
  n: 'A4',
  m: 'B4',
};

keys.forEach((key) => {
  key.addEventListener('click', () =>
    synth.triggerAttackRelease(key.dataset.note, '16n')
  );
});

document.addEventListener('keydown', (e) => {
  synth.triggerAttackRelease(keydowns[e.key], '16n');
  let note = keydowns[e.key];
  let keyElement = document.querySelector(`[data-note="${note}"]`);

  keyElement.style.backgroundColor =
    note.length > 2 ? 'rgb(54, 54, 54)' : 'rgb(220, 220, 220)';
  setTimeout(() => {
    keyElement.style.backgroundColor = note.length > 2 ? 'black' : 'white';
  }, 200);
});
