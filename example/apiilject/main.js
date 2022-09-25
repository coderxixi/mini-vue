import {createApp} from "../../lib/mini-vue.esm.js"
import {Provider} from "./App.js"
const rootContainer=document.querySelector('#app')

createApp(Provider).mount(rootContainer)