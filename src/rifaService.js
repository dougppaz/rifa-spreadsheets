import axios from 'axios'

class Rifa {
  setUrl (url) {
    this.url = url
  }

  async retrieve () {
    const response = await axios.get(this.url)
    return response.data
  }

  async register ({ ticketNumbers, name, phoneNumber, email }) {
    const params = new URLSearchParams(ticketNumbers.map((tn) => (['ticketNumber', tn])))
    params.set('name', name)
    params.set('phoneNumber', phoneNumber)
    if (email) {
      params.set('email', email)
    }
    const response = await axios.post(`${this.url}?${params.toString()}`)
    return response.data
  }
}

export default {
  install: (app, { url }) => {
    const rifa = new Rifa()
    app.config.globalProperties.$rifa = rifa
  }
}
