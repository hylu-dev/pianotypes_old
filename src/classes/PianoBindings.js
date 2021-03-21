import { Note, Scale } from "@tonaljs/tonal";

export default class KeyBindingStore {
    constructor(base) {
        this.bindings = {};
        this.r1 = ['z','x','c','v','b','n','m',',','.','/'];
        this.r2 = ['a','s','d','f','g','h','j','k','l',';',"'"];
        this.r3 = ['q','w','e','r','t','y','u','i','o','p','[',']'];
        this.r4 = ['1','2','3','4','5','6','7','8','9','0','-','='];
        this.mode = 0;
        this.maxNote = "C9";
        this.base = base;
        this.createBindings();
    }
    createBindings() {
        this.bindings = {}
        let cScale = Scale.rangeOf("C major")(this.base, this.maxNote);
        let chromatic = Scale.rangeOf("C chromatic")(this.base, this.maxNote);
        let isWhite = (note) => cScale.includes(note) || cScale.includes(Note.enharmonic(note));
        let index1 = 0; // row1 white keys
        let index2 = 0; // row2 black keys
        let index3 = 0; // row3 white keys
        let index4 = 0; // row4 black keys  
        let noteIndex = 0;
        if (isWhite(chromatic[noteIndex])) { index2++; } // shift blacks keys 1 if starting on white
        while (index1<this.r1.length && noteIndex<chromatic.length) {
            let note = chromatic[noteIndex++];
            isWhite(note) ? this.bindings[this.r1[index1++]] = note : this.bindings[this.r2[index2++]] = note
            if (isWhite(note) == isWhite(Note.transpose(note, "m2"))) {
                index2+=1;
            }
        }
        if (!isWhite(chromatic[noteIndex])) { this.bindings[this.r2[index2++]] = chromatic[noteIndex]; } //include apostrophe binding if possible
        if (isWhite(chromatic[noteIndex])) { index4++; } // shift blacks keys 1 if starting on white
        while (index3<this.r3.length && noteIndex<chromatic.length) {
            let note = chromatic[noteIndex++];
            isWhite(note) ? this.bindings[this.r3[index3++]] = note : this.bindings[this.r4[index4++]] = note
            if (isWhite(note) == isWhite(Note.transpose(note, "m2"))) {
                index4+=1;
            }
        }
    }
    setMode(mode) {
        this.mode = mode;
    }
    getBase() {
        return this.base;
    }
    setBase(note) {
        let n = Note.simplify(note)
        if (Note.octave(n) >= 0) {
            this.base = Note.simplify(n);
            this.createBindings();
        }
    }
    getKeyNoteBinding(key) {
        if (this.bindings[key]) {
            return this.bindings[key];
        } else if (this.bindings[key.toLowerCase()]) {
            return this.bindings[key.toLowerCase()];
        }
    }
    getNoteKeyBinding(note) {
        let keybindings = "";
        if (note) {
            for (const [key, value] of Object.entries(this.bindings)) {
                if (Note.midi(note) == Note.midi(value)) {
                    keybindings += key;
                }
            }
        }
        return keybindings;
    }
    updateBinding(key, note) {
        this.bindings[key] = note;
    }
}