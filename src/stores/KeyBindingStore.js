import { reactive } from 'vue';
import keybindings from '../json/keybindings'

const KeyBindingStore = {
    state: reactive({
        bindings: keybindings
    }),
    getKeyNoteBinding(keybinding) {
        if (this.state.bindings[keybinding]) { //key is bound
            return this.state.bindings[keybinding.toLowerCase()].note;
        }
    },
    getNoteKeyBinding(note) {
        let keybindings = ""
        if (note) {
            for (const [key, value] of Object.entries(this.state.bindings)) {
                if (note == value.note) {
                    keybindings += key;
                }
            }
        }
        return keybindings;
    },
}

export default KeyBindingStore;