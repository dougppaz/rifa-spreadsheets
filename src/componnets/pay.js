import { Pix } from 'faz-um-pix/lib'

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
    async pay () {
      const ticketNumber = this.data.ticketNumber
      const {
        pixKey,
        pixKeyOwnerName,
        pixKeyOwnerCity,
        ticketPrice,
        title
      } = this.data.config
      const pixArgs = [
        pixKey,
        pixKeyOwnerName,
        pixKeyOwnerCity,
        ticketPrice,
        `${title}: Bilhete ${ticketNumber}`
      ]
      this.pix = await Pix(...pixArgs)
      this.pixQrCode = await Pix(...pixArgs, true)
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
  template: `
    <div class="pay">
      <div v-if="payData">
        <div class="qrCode">
          <img :src="pixQrCode" />
        </div>
        <div>
          <input
            v-model="pix"
            disabled />
          <button>Copiar</button>
        </div>
        <div v-if="registering">Registrando pedido...</div>
        <div>
          <button
            @click="finish()"
            :disabled="registering">Finalizar</button>
        </div>
      </div>
      <form
        v-else
        @submit.prevent="pay()">
        <div>
          <label>Nome:</label>
          <input v-model="name" />
        </div>
        <div>
          <label>Telefone:</label>
          <input v-model="phoneNumber" />
        </div>
        <div>
          <button type="submit">Pagar R\${{ data.config.ticketPrice }} por PIX</button>
        </div>
      </form>
    </div>
  `
}
