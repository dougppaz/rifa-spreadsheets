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
      this.ticketNumbers = []
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
      class="rifa">
      <h1>{{ rifa.config.title }}</h1>
      <p><strong>Valor do bilhete:</strong> R\${{ rifa.config.ticketPrice }}</p>
      <p>{{ rifa.config.description }}</p>
      <p><strong>Selecione os bilhetes que você quer reservar abaixo:</strong></p>
      <div class="tickets">
        <ticket
          v-for="ticketNumber in new Array(rifa.config.ticketTotal).fill().map((_, i) => i+1)"
          :key="ticketNumber"
          :tickets-status="rifa.ticketsStatus"
          :ticket-number="ticketNumber"
          :value="ticketNumber"
          v-model="ticketNumbers" />
      </div>
      <p>
        <button
          @click="reloadRifa()"
          :disabled="reloading">Recarregar</button>
      </p>
    </div>
    <pay-action
      v-if="ticketNumbers.length > 0"
      :ticketNumbers="ticketNumbers"
      :ticketPrice="rifa.config.ticketPrice"
      @click="pay()" />
  `
}
