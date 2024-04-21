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
    inputOnClick (event) {
      const el = event.srcElement
      el.select()
      el.setSelectionRange(0, el.value.length)
      this.copyPix()
    },
    copyPix () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.pix)
      }
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
      <div
        v-if="payData"
        class="content">
        <div>
          <p>Pague com Pix e clique em finalizar.</p>
        </div>
        <div class="qrCode">
          <img :src="pixQrCode" />
        </div>
        <div>
          <input
            v-model="pix"
            @click="inputOnClick"
            readonly />
          <button @click="copyPix()">Copiar</button>
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
        class="content"
        @submit.prevent="pay()">
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
          <p><button type="submit">Pagar R\${{ data.config.ticketPrice }} por Pix</button></p>
          <p><button @click="finish()">Cancelar</button></p>
        </div>
      </form>
    </div>
  `
}
