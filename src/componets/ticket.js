const EM_ABERTO = 'EM ABERTO'
const DISPONIVEL = 'DISPONIVEL'
const PAGO = 'PAGO'
const TICKET_CLASS_MAP = {
  [EM_ABERTO]: 'not-paid',
  [PAGO]: 'paid',
  [DISPONIVEL]: 'available'
}
const TICKET_STATUS_TITLE_MAP = {
  [EM_ABERTO]: 'Reservado',
  [PAGO]: 'Pago',
  [DISPONIVEL]: 'Disponível'
}

export default {
  props: [
    'modelValue',
    'value',
    'ticketsStatus',
    'ticketNumber'
  ],
  computed: {
    checked: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
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
    statusClass () {
      return TICKET_CLASS_MAP[this.status]
    },
    checkedClass () {
      return this.checked.includes(this.value) ? 'checked' : 'non-checked'
    },
    disabled () {
      return this.status !== DISPONIVEL
    }
  },
  template: `
    <label :class="['ticket', statusClass, checkedClass]">
      <input
        type="checkbox"
        :disabled="disabled"
        v-model="checked"
        :value="value" />
      <div><strong>Nº{{ ticketNumber }}</strong></div>
      <div>{{ statusTitle }}</div>
    </label>
  `
}
