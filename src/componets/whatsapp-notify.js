import { verboseTicketNumbers } from '../utils'

export const DEFAULT_MESSAGE = 'Olá, acabei de fazer o pagamento por Pix dos bilhetes [ticketNumbers].'

export default {
  props: [
    'phoneNumber',
    'message',
    'ticketNumbers'
  ],
  computed: {
    uri () {
      const params = new URLSearchParams()
      const text = (this.message || DEFAULT_MESSAGE).replaceAll('[ticketNumbers]', verboseTicketNumbers(this.ticketNumbers))
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
