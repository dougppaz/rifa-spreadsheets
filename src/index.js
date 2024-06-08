import { createApp } from 'vue/dist/vue.esm-bundler'
import rifaService from './rifaService'
import rifaListService from './rifaListService'
import rifa from './componets/rifa'
import ticket from './componets/ticket'
import pay from './componets/pay'
import pix from './componets/pix'
import whatsappNotify from './componets/whatsapp-notify'
import payAction from './componets/payAction'
import './sass/main.scss'
import Home from './componets/home'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const url = process.env.SCRIPT_GOOGLE_URL
const listasUrl = process.env.LIST_RIFAS_URL

const app = createApp()
app.use(rifaService, { url })
app.use(rifaListService, { listasUrl })
app.component('Rifa', rifa)
app.component('Ticket', ticket)
app.component('Pay', pay)
app.component('Pix', pix)
app.component('WhatsappNotify', whatsappNotify)
app.component('PayAction', payAction)
app.component('home', Home)
app.mount('#app')

export default app
