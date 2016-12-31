<style>
</style>

<template>
  <div>
    <div class="form_couleurs_container" v-show="colorvisible">
      <h3>Couleur</h3>
      <form @submit.prevent="colorSubmit" class="ui form">
        <div class="two fields">
          <div class="field">
            <label>Nom de la couleur :
              <input type="text" v-model="colorName" :class="{ 'error': errors.fields.couleur_title }">
            </label>
            <div class="errors">
              {{ errors.fields.couleur_title }}
            </div>
          </div>
          <div class="field">
            <color-picker  name="Couleur : " :colors="colors" @change-color="onChange"></color-picker>
          </div>
        </div>
        <div class="form_couleur_row">
          <button type="submit" class="ui teal button">Valider</button>
          <button type="button" class="ui red button" @click="escape">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
// import { Chrome } from 'vue-color'
import ColorPickerComponent from 'src/components/colorpicker/Colorpicker.vue'
import { mapActions } from 'vuex'
// import { addCouleur, modifyCouleur } from 'src/store/actions/settings'

export default {
  props: {
    colorvisible: {type: Boolean, default: true},
    colorid: {type: Number}
  },
  data () {
    return {
      errors: {
        fields: { couleur_title: '' }
      },
      colorName: '',
      colors: defaultProps
    }
  },
  components: {
    colorPicker: ColorPickerComponent
  },
  computed: {
    couleur: function () {
      let index = this.$store.getters.couleurs.findIndex((c) => c.id === this.colorid)
      return this.$store.getters.couleurs[index]
    }
  },
  watch: {
    colorid: function (val) {
      if (val !== 0) {
        this.colorName = this.couleur.title
        this.colors.hex = this.couleur.couleur
      }
    }
  },
  methods: {
    ...mapActions([
      'addCouleur',
      'modifyCouleur'
    ]),
    colorSubmit: function () {
      if (this.colorid !== 0) {
        this.modifyCouleur({
          id: this.colorid,
          couleur: {
            title: this.colorName,
            couleur: this.colors.hex
          }
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.errors.fields.couleur_title = ''
            this.colorName = ''
            this.colors.hex = '#FFFFFF'
            this.$emit('closed')
          }
        })
      } else {
        this.addCouleur({
          title: this.colorName,
          couleur: this.colors.hex
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.errors.fields.couleur_title = ''
            this.colorName = ''
            this.colors.hex = '#FFFFFF'
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.errors.fields.couleur_title = ''
      this.colorName = ''
      this.colors.hex = '#FFFFFF'
      this.$emit('closed')
    },
    onChange (val) {
      this.colors = val
    }
  }
}

var defaultProps = {
  hex: '#FF0000',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}
</script>
