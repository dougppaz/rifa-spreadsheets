import { createApp } from 'vue/dist/vue.esm-bundler'
import rifaService from './rifaService'
import rifa from './componnets/rifa'
import ticket from './componnets/ticket'
import pay from './componnets/pay'
import pix from './componnets/pix'
import './sass/main.scss'

const app = createApp()
app.use(rifaService)
app.component('Rifa', rifa)
app.component('Ticket', ticket)
app.component('Pay', pay)
app.component('Pix', pix)
app.mount('#app')

export default app
