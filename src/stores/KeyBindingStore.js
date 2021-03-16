import { reactive } from 'vue';
import { Note } from "@tonaljs/tonal";
import keybindings from '@/json/keybindings'

const KeyBindingStore = {
    state: reactive({
        bindings: keybindings
    }),
    getKeyNoteBinding(keybinding) {
        if (this.state.bindings[keybinding]) { //key is bound
            return this.state.bindings[keybinding].note;
        } else if (this.state.bindings[keybinding.toLowerCase()]) {
            return this.state.bindings[keybinding.toLowerCase()].note;
        }
    },
    getNoteKeyBinding(note) {
        let keybindings = ""
        if (note) {
            for (const [key, value] of Object.entries(this.state.bindings)) {
                if (Note.midi(note) == Note.midi(value.note)) {
                    keybindings += key;
                }
            }
        }
        return keybindings;
    },
}

export default KeyBindingStore;