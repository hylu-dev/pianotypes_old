export default class Keyboard {
    // note format ex: C#4
    constructor(minNote, minOctave, maxNote, maxOctave) {
        this.minNote = minNote;
        this.minOctave = minOctave;
        this.maxNote = maxNote;
        this.maxOctave = maxOctave;
        this.scale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']; // does not support flats
        this.keyboard;
        this.keyboardDict;
        this.init();
    }
    init() {
        this.keyboard = [];
        this.keyboardDict = {}
        let noteIndex = this.scale.indexOf(this.minNote);
        for (let curr = this.minOctave; curr <= this.maxOctave; curr++) {
            while (noteIndex < this.scale.length && this.scale[noteIndex]+curr != this.getNext(this.maxNote, this.maxOctave)) {
                this.keyboard.push(this.scale[noteIndex]+curr);
                this.keyboardDict[this.scale[noteIndex]+curr] = {};
                noteIndex++;
            }   
            noteIndex = 0;
        }
    }
    getKeyboard() {
        return this.keyboard;
    }
    getKeyboardDict() {
        return this.keyboardDict;
    }
    getNext(note, octave) {
        return note == 'B' ? 'C'+octave : this.scale[this.scale.indexOf(note)+1]+octave;
    }
    getPrevious(note, octave) {
        return note == 'C' ? 'B'+(octave-1) : this.scale[this.scale.indexOf(note)-1]+octave;
    }
    updateMin(note, octave) {
        this.minNote = note;
        this.minOctave = octave;
        this.init();
    }
    updateMax(note, octave) {
        this.maxNote = note;
        this.maxOctave = octave;
        this.init();
    }
  }