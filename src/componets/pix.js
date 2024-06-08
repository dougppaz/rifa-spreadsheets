export default {
  props: [
    'pixUrl',
    'pixQrCode'
  ],
  methods: {
    inputOnClick (event) {
      const el = event.srcElement
      el.select()
      el.setSelectionRange(0, el.value.length)
      this.copyPix()
    },
    copyPix () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.pixUrl)
      }
    }
  },
  template: `
    <div
      v-if="pixQrCode"
      class="pixQRCode">
      <img :src="pixQrCode" />
    </div>
    <div
      v-if="pixUrl"
      class="pixUrl">
      <input
        v-model="pixUrl"
        @click="inputOnClick"
        readonly />
      <button @click="copyPix()">Copiar</button>
    </div>
  `
}
