import { Pix } from 'faz-um-pix/lib'

export default {
  props: [
    'pixKey',
    'pixKeyOwnerName',
    'pixKeyOwnerCity',
    'ticketPrice',
    'message'
  ],
  data () {
    return {
      pixURL: null,
      pixQrCode: null
    }
  },
  methods: {
    inputOnClick (event) {
      const el = event.srcElement
      el.select()
      el.setSelectionRange(0, el.value.length)
      this.copyPix()
    },
    copyPix () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.pixURL)
      }
    }
  },
  async mounted () {
    const pixArgs = [
      this.pixKey,
      this.pixKeyOwnerName,
      this.pixKeyOwnerCity,
      this.ticketPrice.toFixed(2),
      this.message.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    ]
    this.pixURL = await Pix(...pixArgs)
    this.pixQrCode = await Pix(...pixArgs, true)
  },
  template: `
    <div
      v-if="pixQrCode"
      class="pixQRCode">
      <img :src="pixQrCode" />
    </div>
    <p v-else>Gerando QR Code do Pix...</p>
    <div
      v-if="pixURL"
      class="pixURL">
      <input
        v-model="pixURL"
        @click="inputOnClick"
        readonly />
      <button @click="copyPix()">Copiar</button>
    </div>
    <p v-else>Gerando URL Pix...</p>
  `
}
