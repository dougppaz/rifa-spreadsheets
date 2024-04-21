const EM_ABERTO = 'EM ABERTO'
const DISPONIVEL = 'DISPONIVEL'
const PAGO = 'PAGO'
const TICKET_CLASS_MAP = {
  [EM_ABERTO]: 'not-paid',
  [PAGO]: 'paid',
  [DISPONIVEL]: 'available'
}
const TICKET_STATUS_TITLE_MAP = {
  [EM_ABERTO]: 'Em aberto',
  [PAGO]: 'Pago',
  [DISPONIVEL]: 'Disponível'
}

export default {
  props: [
    'ticketsStatus',
    'ticketNumber'
  ],
  computed: {
    status () {
      const status = this.ticketsStatus[this.ticketNumber]
      if (!status) {
        return DISPONIVEL
      }
      return status
    },
    statusTitle () {
      return TICKET_STATUS_TITLE_MAP[this.status]
    },
    ticketClass () {
      return TICKET_CLASS_MAP[this.status]
    },
    disabled () {
      return this.status !== DISPONIVEL
    }
  },
  template: `
    <button
      :class="['ticket', ticketClass]"
      :disabled="disabled"
      :title="statusTitle">Nº {{ ticketNumber }}</button>
  `
}
