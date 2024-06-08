import Rifa from './rifa'

export default {
  components: {
    Rifa
  },
  props: [],
  data () {
    return {
      rifas: [],
      rifaAtiva: null
    }
  },
  methods: {
    setRifaAtiva (url) {
      this.rifaAtiva = url
    }

  },
  async mounted () {
    this.rifas = await this.$rifaList.retrieve()
    console.log(this.rifas)
  },
  template: `
    <div class="">

      <div class="" v-if="!rifaAtiva">
        <h1 style="text-align: center">Rifas Disponíveis</h1>
        <ul style="padding-left: 0">
          <li v-for="rifa in rifas" :key="rifa[0]" style="text-align: center">
            <img v-if="rifa[2]" :src="rifa[2]" @click="setRifaAtiva(rifa[1])" style="max-width: 100%"/>
            <button v-if="!rifa[2]" class="botao-rifa" @click="setRifaAtiva(rifa[1])">{{rifa[0]}}</button>
            <hr>
          </li>

        </ul>
      </div>
      <div class="" v-else>
        <button class="botao-voltar" @click="setRifaAtiva(null)">Voltar</button>
        <rifa :url="rifaAtiva" />
      </div>

    </div>
  `
}
