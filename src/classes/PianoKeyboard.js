import { Note, Range } from "@tonaljs/tonal";

export default class PianoKeyboard {
    constructor(minNote, maxNote) {
        this.minNote = minNote;
        this.maxNote = maxNote;
        this.keyboard;
        this.keyboardDict;
        this.init();
    }
    init() {
        this.keyboard = Note.sortedNames(Range.chromatic([this.minNote, this.maxNote]));
        this.keyboardDict = this.keyboard.reduce((arr,curr) => (arr[curr]={},arr),{})
    }
    getKeyboard() {
        return this.keyboard;
    }
    getKeyboardDict() {
        return this.keyboardDict;
    }
    getMin() {
        return this.minNote;
    }
    setMin(note) {
        if (Note.octave(note) >= 0) {
            this.minNote = Note.name(note);
            this.init();
        }
    }
    getMax() {
        return this.maxNote;
    }
    setMax(note) {
        if (Note.octave(note) >= 0) {
            this.maxNote = Note.name(note);
            this.init();
        }
    }
  }