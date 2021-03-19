import { reactive } from 'vue';
import PianoBindings from '@/classes/PianoBindings'

const KeyBindingStore = {
    state: reactive({
        pianoBindings: new PianoBindings("G2")
    })
}

export default KeyBindingStore;