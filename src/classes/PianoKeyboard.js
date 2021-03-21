import { Note, Range } from "@tonaljs/tonal";
import musyngkite from "@/json/musyngkite.json"

export default class PianoKeyboard {
    constructor(minNote, maxNote) {
        this.minNote = minNote;
        this.maxNote = maxNote;
        this.keyboard;
        this.keyboardDict;
        this.sustainPedal;
        this.soundfont = musyngkite;
        this.instrument = require('soundfont-player').instrument(new AudioContext(), 'acoustic_grand_piano', {
                soundfont: 'MusyngKite',
                gain: 2
                });
        this.gainNodes = {};
        this.lastKey = "";
        this.init();
    }
    init() {
        this.gainNodes = {};
        this.instrument.then( (instr) => instr.stop());
        this.keyboard = Note.sortedNames(Range.chromatic([this.minNote, this.maxNote]));
        this.keyboardDict = this.keyboard.reduce((arr,curr) => (arr[curr]={}, arr[Note.enharmonic(curr)]={}, arr), {})
    }
    getKeyboard() {
        return this.keyboard;
    }
    getKeyboardDict() {
        return this.keyboardDict;
    }
    //keys
    pressKey(note) {
        if (!(this.keyboardDict[note] || this.keyboardDict[Note.enharmonic(note)])) { return; } //Check note is part of piano range
        this.keyboardDict[note].isPressed = this.keyboardDict[Note.enharmonic(note)].isPressed = true;
        if (this.gainNodes[note]) { this.gainNodes[note].stop(); }
        this.instrument.then((instr) => { this.gainNodes[note] = instr.play(note, 0, 1); });
        this.lastKey = note;
    }
    releaseKey(note) {
        if (!(this.keyboardDict[note] || this.keyboardDict[Note.enharmonic(note)])) { return; } //Check note is part of piano range
        this.keyboardDict[note].isPressed = this.keyboardDict[Note.enharmonic(note)].isPressed = false;
        this.instrument.then(() => { if (!this.sustainPedal && this.gainNodes[note]) { this.gainNodes[note].stop(); delete this.gainNodes[note]; } })
    }
    getIsPressed(note) {
        if (this.keyboardDict[note]) { return this.keyboardDict[note].isPressed; }
        if (this.keyboardDict[note]) { return this.keyboardDict[note].isPressed; }
        return false;
    }
    getLastKey() {
        return this.lastKey;
    }
    //pedal
    getSustainPedal() {
        return this.sustainPedal;
    }
    pressSustainPedal() {
        this.sustainPedal = true;
    }
    liftSustainPedal() {
        this.sustainPedal = false;
        for (let note in this.gainNodes) {
            if (this.keyboardDict[note].isPressed == false) {
                this.gainNodes[note].stop();
                delete this.gainNodes[note];
            }
        }
    }
    //range
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