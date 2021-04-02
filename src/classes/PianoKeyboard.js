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
        this.instrument = 'acoustic_grand_piano';
        this.ac;
        this.player;
        this.gainNodes = {};
        this.lastKey = "";
        this.init();
    }
    init() {
        let a = window.AudioContext || window.webkitAudioContext || false;
        if (a) {
            this.ac = new a;
        }
        this.updateInstrument();
        this.updateKeyboard();
    }
    updateKeyboard() {
        this.gainNodes = {};
        this.player.then( (instr) => instr.stop());
        this.keyboard = Note.sortedNames(Range.chromatic([this.minNote, this.maxNote]));
        this.keyboardDict = this.keyboard.reduce((arr,curr) => (arr[curr]={}, arr[Note.enharmonic(curr)]={}, arr), {})
    }
    updateInstrument() {
        this.player = require('soundfont-player').instrument(this.ac, this.instrument, {
            soundfont: 'MusyngKite',
            release: 2
        });
    }
    getKeyboard() {
        return this.keyboard;
    }
    getKeyboardDict() {
        return this.keyboardDict;
    }
    //keys
    pressKey(note, gain) {
        if (!(this.keyboardDict[note] || this.keyboardDict[Note.enharmonic(note)])) { return; } //Check note is part of piano range
        this.keyboardDict[note].isPressed = this.keyboardDict[Note.enharmonic(note)].isPressed = true;
        if (this.gainNodes[note]) { this.gainNodes[note].stop(); }
        this.player.then((instr) => { this.gainNodes[note] = instr.play(note, 0, {'gain': gain}); });
        this.lastKey = note;
    }
    releaseKey(note) {
        if (!(this.keyboardDict[note] || this.keyboardDict[Note.enharmonic(note)])) { return; } //Check note is part of piano range
        this.keyboardDict[note].isPressed = this.keyboardDict[Note.enharmonic(note)].isPressed = false;
        this.player.then(() => { if (!this.sustainPedal && this.gainNodes[note]) { this.gainNodes[note].stop(); delete this.gainNodes[note]; } })
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
    //instrument
    getInstrument() {
        return this.instrument;
    }
    setInstrument(instrument) {
        this.instrument = instrument;
        this.updateInstrument();
    }
    //range
    getMin() {
        return this.minNote;
    }
    setMin(note) {
        if (Note.octave(note) >= 0 && Note.octave(note) < 9) {
            this.minNote = Note.simplify(note);
            this.updateKeyboard();
        }
    }
    getMax() {
        return this.maxNote;
    }
    setMax(note) {
        if (Note.octave(note) >= 0 && Note.octave(note) < 9) {
            this.maxNote = Note.simplify(note);
            this.updateKeyboard();
        }
    }
  }