import { createApp } from 'vue'
import App from './App'
import './index.css'
import Unicon from 'vue-unicons'
import { uniPrevious, uniStepForward, uniPauseCircle, uniPlayCircle, uniVolume, uniVolumeMute, uniVolumeOff } from 'vue-unicons/dist/icons'

Unicon.add([uniPrevious, uniStepForward, uniPauseCircle, uniPlayCircle, uniVolume, uniVolumeMute, uniVolumeOff])

createApp(App).use(Unicon).mount('#app')
