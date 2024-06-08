import axios from 'axios'

class RifaList {
  constructor (url) {
    this.url = url
  }

  async retrieve () {
    const response = await axios.get(this.url)
    return response.data
  }
}

export default {
  install: (app, { listasUrl }) => {
    app.config.globalProperties.$rifaList = new RifaList(listasUrl)
  }
}
