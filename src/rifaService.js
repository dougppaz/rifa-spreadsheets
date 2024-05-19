import axios from 'axios'

class Rifa {
  constructor (url) {
    this.url = url
  }

  async retrieve () {
    const response = await axios.get(this.url)
    return response.data
  }

  async register ({ ticketNumber, name, phoneNumber, email }) {
    const params = new URLSearchParams()
    params.set('ticketNumber', ticketNumber)
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
    const rifa = new Rifa(url)
    app.config.globalProperties.$rifa = rifa
  }
}
