import { reactive } from 'vue';
import Piano from '@/classes/PianoKeyboard'

const PianoStateStore = {
    state: reactive({
        keyboard: new Piano("F2", "C6")
    })
}

export default PianoStateStore;