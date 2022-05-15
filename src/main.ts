import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { units } from './tools/unit'

let data = [
	[12, 22, 31],
	[23, 44, 3],
]
new units(data, '英尺', '厘米', '长度')

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
