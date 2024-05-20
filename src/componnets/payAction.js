export default {
  props: [
    'ticketNumbers',
    'ticketPrice'
  ],
  computed: {
    totalPriceVerbose () {
      return (this.ticketNumbers.length * this.ticketPrice).toFixed(2).replace('.', ',')
    }
  },
  template: `
    <button class="pay-action">
      <div class="sub">{{ ticketNumbers.length }} bilhetes selecionados</div>
      <div>Pague <strong>R\${{ totalPriceVerbose }}</strong> com Pix</div>
    </button>
  `
}
