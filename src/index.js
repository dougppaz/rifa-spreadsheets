import { createApp } from 'vue/dist/vue.esm-bundler'
import rifaService from './rifaService'
import rifa from './componnets/rifa'
import ticket from './componnets/ticket'
import pay from './componnets/pay'
import pix from './componnets/pix'
import whatsappNotify from './componnets/whatsapp-notify'
import payAction from './componnets/payAction'
import './sass/main.scss'

const url = process.env.SCRIPT_GOOGLE_URL

const app = createApp()
app.use(rifaService, { url })
app.component('Rifa', rifa)
app.component('Ticket', ticket)
app.component('Pay', pay)
app.component('Pix', pix)
app.component('WhatsappNotify', whatsappNotify)
app.component('PayAction', payAction)
app.mount('#app')

export default app
