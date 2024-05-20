export default {
  data () {
    return {
      rifa: null,
      reloading: false,
      ticketNumbers: [],
      payData: null
    }
  },
  methods: {
    async reloadRifa () {
      this.reloading = true
      this.rifa = await this.$rifa.retrieve()
      this.reloading = false
    },
    pay () {
      this.payData = {
        ticketNumbers: this.ticketNumbers,
        config: this.rifa.config
      }
    },
    async payFinished () {
      this.payData = null
      this.ticketNumbers = []
      await this.reloadRifa()
    }
  },
  async mounted () {
    this.rifa = await this.$rifa.retrieve()
  },
  template: `
    <pay
      v-if="payData"
      :data="payData"
      @finished="payFinished()" />
    <div v-if="rifa === null">Carregando...</div>
    <div
      v-else
      class="rifa">
      <h1>{{ rifa.config.title }}</h1>
      <p>{{ rifa.config.description }}</p>
      <p><strong>Valor do bilhete:</strong> R\${{ rifa.config.ticketPrice }}</p>
      <p>
        <button
          @click="reloadRifa()"
          :disabled="reloading">Recarregar</button>
      </p>
      <div class="tickets">
        <ticket
          v-for="ticketNumber in new Array(rifa.config.ticketTotal).fill().map((_, i) => i+1)"
          :key="ticketNumber"
          :tickets-status="rifa.ticketsStatus"
          :ticket-number="ticketNumber"
          :value="ticketNumber"
          v-model="ticketNumbers" />
      </div>
    </div>
    <pay-action
      v-if="!payData && ticketNumbers.length > 0"
      :ticketNumbers="ticketNumbers"
      :ticketPrice="rifa.config.ticketPrice"
      @click="pay()" />
  `
}
