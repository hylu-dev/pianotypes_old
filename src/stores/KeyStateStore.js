import { reactive } from 'vue';
import Keyboard from '../classes/Keyboard'

const KeyStateStore = {
    state: reactive({
        keyboard: new Keyboard("F", 2, "C", 6),
        lastKey: ""
    }),
    updateKeyPressed(key) {
        this.state.keyboard.getKeyboardDict()[key].isPressed = true;
        this.state.lastKey = key;
    },
    updateKeyReleased(key) {
        this.state.keyboard.getKeyboardDict()[key].isPressed = false;
    },
    getKeyPressedState(key) {
        return this.state.keyboard.getKeyboardDict()[key].isPressed ? true : false;
    },
    resetKeyStates() {
        this.state.keyboard.init();
    }
}

export default KeyStateStore;