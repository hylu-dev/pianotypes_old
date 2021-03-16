import { reactive } from 'vue';
import Piano from '@/classes/PianoKeyboard'

const KeyStateStore = {
    state: reactive({
        keyboard: new Piano("F2", "C6"),
        lastKey: ""
    }),
    updateKeyPressed(key) {
        if (!this.state.keyboard.getKeyboardDict()[key]) { return false }
        this.state.keyboard.getKeyboardDict()[key].isPressed = true;
        this.state.lastKey = key;
        return true;
    },
    updateKeyReleased(key) {
        if (!this.state.keyboard.getKeyboardDict()[key]) { return false }
        this.state.keyboard.getKeyboardDict()[key].isPressed = false;
        return true;
    },
    getKeyPressedState(key) {
        if (!this.state.keyboard.getKeyboardDict()[key]) { return false }
        return this.state.keyboard.getKeyboardDict()[key].isPressed ? true : false;
    },
    resetKeyStates() {
        this.state.keyboard.init();
    }
}

export default KeyStateStore;