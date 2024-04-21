import axios from 'axios'

class Rifa {
  constructor (url) {
    this.url = url
  }

  async retrieve () {
    const response = await axios.get(this.url)
    return response.data
  }

  async register ({ ticketNumber, name, phoneNumber }) {
    const params = new URLSearchParams()
    params.set('ticketNumber', ticketNumber)
    params.set('name', name)
    params.set('phoneNumber', phoneNumber)
    const response = await axios.post(`${this.url}?${params.toString()}`)
    return response.data
  }
}

export default {
  install: (app, options) => {
    const rifa = new Rifa('https://script.google.com/macros/s/AKfycbw95fo1VA91pltId12GJRuEnar9_Cr2i0U6X5X3xh7OjiQjWT5DMgAssgfWbeL4uJ5h/exec')
    app.config.globalProperties.$rifa = rifa
  }
}
