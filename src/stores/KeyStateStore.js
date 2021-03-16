import { reactive } from 'vue';
import { Note } from "@tonaljs/tonal";
import Piano from '@/classes/PianoKeyboard'

const KeyStateStore = {
    state: reactive({
        keyboard: new Piano("F2", "C6"),
        lastKey: ""
    }),
    updateKeyPressed(key) {
        if (!this.state.keyboard.getKeyboardDict()[key]) { return false }
        this.state.keyboard.getKeyboardDict()[key].isPressed = true;
        this.state.keyboard.getKeyboardDict()[Note.enharmonic(key)].isPressed = true;
        this.state.lastKey = key;
        return true;
    },
    updateKeyReleased(key) {
        if (!this.state.keyboard.getKeyboardDict()[key]) { return false }
        this.state.keyboard.getKeyboardDict()[key].isPressed = false;
        this.state.keyboard.getKeyboardDict()[Note.enharmonic(key)].isPressed = false;
        return true;
    },
    getKeyPressedState(key) {
        if (this.state.keyboard.getKeyboardDict()[key]) {
            return this.state.keyboard.getKeyboardDict()[key].isPressed ? true : false;
        } else if (this.state.keyboard.getKeyboardDict()[Note.enharmonic(key)]) {
            return this.state.keyboard.getKeyboardDict()[Note.enharmonic(key)].isPressed ? true : false;
        } else {
            return false;
        }

        
    },
    resetKeyStates() {
        this.state.keyboard.init();
    }
}

export default KeyStateStore;