export default {
  data () {
    return {
      name: '',
      phoneNumber: '',
      payData: null,
      pix: null,
      pixQrCode: null,
      registering: false
    }
  },
  props: [
    'data'
  ],
  methods: {
    async register () {
      const ticketNumber = this.data.ticketNumber
      this.payData = {
        ticketNumber,
        name: this.name,
        phoneNumber: this.phoneNumber
      }
      this.registering = true
      await this.$rifa.register(this.payData)
      this.registering = false
    },
    finish () {
      this.payData = null
      this.pix = null
      this.pixQrCode = null
      this.registering = false
      this.$emit('finished')
    }
  },
  computed: {
    pixMessage () {
      return `${this.data.config.title} bilhete ${this.payData.ticketNumber}`
    },
    ticketPriceVerbose () {
      return this.data.config.ticketPrice.toFixed(2).replace('.', ',')
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
          :pix-key="data.config.pixKey"
          :pix-key-owner-name="data.config.pixKeyOwnerName"
          :pix-key-owner-city="data.config.pixKeyOwnerCity"
          :ticket-price="data.config.ticketPrice"
          :message="pixMessage" />
        <whatsapp-notify
          v-if="data.config.whatsapp"
          :phone-number="data.config.whatsapp"
          :ticket-number="payData.ticketNumber"
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
        <p>Pague pelo bilhete número {{ data.ticketNumber }}</p>
        <div>
          <label>Nome:</label>
          <input
            v-model="name"
            required />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            v-model="phoneNumber"
            required />
        </div>
        <div>
          <p><button type="submit">Pagar R\${{ ticketPriceVerbose }} por Pix</button></p>
          <p><button @click="finish()">Cancelar</button></p>
        </div>
      </form>
    </div>
  `
}
