import { reactive } from 'vue';
import keystates from '../json/keystates.json';

const KeyStateStore = {
    state: reactive({
        keyStates: keystates,
        lastKey: ""
    }),
    updateKeyPressed(key) {
        this.state.keyStates[key].isPressed = true;
        this.state.lastKey = key;
    },
    updateKeyReleased(key) {
        this.state.keyStates[key].isPressed = false;
    },
    getKeyPressedState(key) {
        return this.state.keyStates[key].isPressed;
    },
    resetKeyStates() {
        for (let key in this.state.keyStates) {
            this.state.keyStates[key].isPressed = false;
        }
    }
}

export default KeyStateStore;