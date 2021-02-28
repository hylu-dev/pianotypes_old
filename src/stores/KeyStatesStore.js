import { reactive } from 'vue';
import keystates from '../json/keystates.json';

const KeyStatesStore = {
    state: reactive({
        keyboard: keystates,
    }),
    updateKeyPressed(key) {
        this.state.keyboard[key].isPressed = true;
    },
    updateKeyReleased(key) {
        this.state.keyboard[key].isPressed = false;
    },
    getKeyPressedState(key) {
        return this.state.keyboard[key].isPressed;
    },
    resetKeyStates() {
        for (let key in this.state.keyboard) {
            this.state.keyboard[key].isPressed = false;
        }
    }
}

export default KeyStatesStore;