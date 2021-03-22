import { reactive } from 'vue';
import PianoBindings from '@/classes/PianoBindings'

const KeyBindingStore = {
    state: reactive({
        pianoBindings: new PianoBindings("F2")
    })
}

export default KeyBindingStore;