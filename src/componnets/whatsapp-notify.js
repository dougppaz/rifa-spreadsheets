export const DEFAULT_MESSAGE = 'Olá, acabei de fazer o pagamento do bilhete [ticketNumber] por Pix.'

export default {
  props: [
    'phoneNumber',
    'message',
    'ticketNumber'
  ],
  computed: {
    uri () {
      const params = new URLSearchParams()
      const text = (this.message || DEFAULT_MESSAGE).replaceAll('[ticketNumber]', this.ticketNumber)
      params.set('text', text)
      return `https://wa.me/${this.phoneNumber}?${params.toString()}`
    }
  },
  template: `
    <div class="whatsapp-notify">
      <p>Já fez o Pix?</p>
      <p><a
        :href="uri"
        target="_blank">Me avise pelo Whatsapp</a></p>
    </div>
  `
}
