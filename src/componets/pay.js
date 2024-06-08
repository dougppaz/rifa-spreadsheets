import pixBuilder from '../pixBuilder'
import { verboseTicketNumbers } from '../utils'

export default {
  props: [
    'data',
    'url'
  ],
  data () {
    return {
      name: '',
      phoneNumber: '',
      email: '',
      payData: null,
      pixURL: null,
      pixQrCode: null,
      registering: false
    }
  },
  methods: {
    async register () {
      const ticketNumbers = this.data.ticketNumbers
      console.log('ticket numbers')
      console.log(ticketNumbers)
      this.payData = {
        ticketNumbers,
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.requiredParams.includes('email') ? this.email : undefined
      }
      if (this.data.config.payment.key === 'bc') {
        const { pixURL, pixQrCode } = await pixBuilder(
          this.data.config.pixKey,
          this.data.config.pixKeyOwnerName,
          this.data.config.pixKeyOwnerCity,
          this.data.config.ticketPrice * ticketNumbers.length,
          this.pixMessage
        )
        this.pixURL = pixURL
        this.pixQrCode = pixQrCode
      }
      this.registering = true
      this.$rifa.setUrl(this.url)
      const result = await this.$rifa.register(this.payData)
      if (this.data.config.payment.key !== 'bc') {
        this.pixURL = result.invoice.pixURL
        this.pixQrCode = result.invoice.pixQrCode
      }
      this.registering = false
    },
    finish () {
      this.payData = null
      this.pixURL = null
      this.pixQrCode = null
      this.registering = false
      this.$emit('finished')
    }
  },
  computed: {
    pixMessage () {
      return `${this.data.config.title} bilhetes: ${this.payData.ticketNumbers}`
    },
    ticketNumbersVerbose () {
      return verboseTicketNumbers(this.data.ticketNumbers)
    },
    totalPriceVerbose () {
      return (this.data.ticketNumbers.length * this.data.config.ticketPrice).toFixed(2).replace('.', ',')
    },
    requiredParams () {
      return this.data.config.payment.requiredParams
    }
  },
  template: `
    <div class="pay">
      <div
        v-if="payData"
        class="content">
        <div>
          <p>Pague com Pix e clique em finalizar.</p>
        </div>
        <pix
          v-if="pixURL && pixQrCode"
          :pix-url="pixURL"
          :pix-qr-code="pixQrCode" />
        <p v-else>Gerando cobrança Pix...</p>
        <whatsapp-notify
          v-if="data.config.whatsapp"
          :phone-number="data.config.whatsapp"
          :ticket-numbers="payData.ticketNumbers"
          :message="data.config.whatsappMessage" />
        <div v-if="registering">Registrando pedido...</div>
        <div>
          <button
            @click="finish()"
            :disabled="registering">Finalizar</button>
        </div>
      </div>
      <form
        v-else
        class="content"
        @submit.prevent="register()">
        <p><strong>Pague pelos bilhetes:</strong></p>
        <p>{{ ticketNumbersVerbose }}</p>
        <hr />
        <div>
          <label>Nome:</label>
          <input
            v-model="name"
            type="text"
            required />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            v-model="phoneNumber"
            type="text"
            required />
        </div>
        <div v-if="requiredParams.includes('email')">
          <label>E-mail:</label>
          <input
            v-model="email"
            type="email"
            required />
        </div>
        <div>
          <p><button type="submit">Pagar R\${{ totalPriceVerbose }} por Pix</button></p>
        </div>
        <p><button
          type="button"
          @click="finish()">Cancelar</button></p>
      </form>
    </div>
  `
}
