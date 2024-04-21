export default {
  data () {
    return {
      rifa: null,
      reloading: false,
      payData: null
    }
  },
  methods: {
    async reloadRifa () {
      this.reloading = true
      this.rifa = await this.$rifa.retrieve()
      this.reloading = false
    },
    pay (ticketNumber) {
      this.payData = {
        ticketNumber,
        config: this.rifa.config
      }
    },
    async payFinished () {
      this.payData = null
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
      id="rifa">
      <h1>{{ rifa.config.title }}</h1>
      <p>{{ rifa.config.description }}</p>
      <p>Valor do bilhete R\${{ rifa.config.ticketPrice }}</p>
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
          @click="pay(ticketNumber)" />
      </div>
    </div>
  `
}
