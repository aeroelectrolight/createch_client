<style lang='scss'>

</style>

<template>
  <div>
    <div v-show="placevisible">
      <h3>Lieu</h3>
      <form @submit.prevent="Submitplace">
        <div class="form_lieu_row">
          <div class="form_lieu_input">
            <label>Le nom du lieu :
              <input type="text" v-model="title" :class="{ 'error': errors.fields.lieu_title }">
            </label>
            <div class="errors">
              {{ errors.fields.lieu_title }}
            </div>
          </div>
        </div>
        <fieldset>
          <legend>L'adresse</legend>
          <div class="form_lieu_row">
            <div class="form_lieu_input">
              <label>Le numero :
                <input type="text" v-model="numero" :class="{ 'error': errors.fields.lieu_numero }">
              </label>
              <div class="errors">
                {{ errors.fields.lieu_numero }}
              </div>
            </div>
            <div class="form_lieu_input">
              <label>Le nom de la rue :
                <input type="text" v-model="rue" :class="{ 'error': errors.fields.lieu_rue }">
              </label>
              <div class="errors">
                {{ errors.fields.lieu_rue }}
              </div>
            </div>
          </div>
          <div class="form_lieu_row">
            <div class="form_lieu_input">
              <label>Le code postal :
                <input type="text" v-model="cpostal" :class="{ 'error': errors.fields.lieu_cpostal }">
              </label>
              <div class="errors">
                {{ errors.fields.lieu_cpostal }}
              </div>
            </div>
            <div class="form_lieu_input">
              <label>La ville :
                <input type="text" v-model="ville" :class="{ 'error': errors.fields.lieu_ville }">
              </label>
              <div class="errors">
                {{ errors.fields.lieu_ville }}
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form_lieu_row">
          <div class="form_lieu_input">
            <label>Le telephone :
              <input type="text" v-model="telephone" :class="{ 'error': errors.fields.lieu_telephone }">
            </label>
            <div class="errors">
              {{ errors.fields.lieu_telephone }}
            </div>
          </div>
        </div>
        <div class="form_lieu_row">
          <button type="submit" class="button-success">Valider</button>
          <button type="button" class="button-alert" @click="escape">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'

export default {
  props: {
    placeid: {type: Number, default: 0},
    placevisible: {type: Boolean, default: true}
  },
  data: function () {
    return {
      title: '',
      numero: '',
      rue: '',
      cpostal: '',
      ville: '',
      telephone: '',
      errors: {
        fields: {
          lieu_title: '',
          lieu_numero: '',
          lieu_rue: '',
          lieu_cpostal: '',
          lieu_ville: '',
          lieu_telephone: ''
        }
      }
    }
  },
  computed: {
    lieu: function () {
      let index = this.$store.getters.lieux.findIndex((l) => l.id === this.placeid)
      return this.$store.getters.lieux[index]
    }
  },
  watch: {
    placeid: function (val) {
      if (val !== 0) {
        this.title = this.lieu.title
        this.numero = this.lieu.numero
        this.rue = this.lieu.rue
        this.cpostal = this.lieu.c_postal
        this.ville = this.lieu.ville
        this.telephone = this.lieu.telephone
      }
    }
  },
  methods: {
    ...mapActions([
      'addLieu',
      'modifyLieu'
    ]),
    Submitplace: function () {
      if (this.placeid === 0) {
        this.addLieu({
          title: this.title,
          numero: this.numero,
          rue: this.rue,
          cPostal: this.cpostal,
          ville: this.ville,
          telephone: this.telephone
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.title = ''
            this.numero = ''
            this.rue = ''
            this.cpostal = ''
            this.ville = ''
            this.telephone = ''
            this.$emit('closed')
          }
        })
      } else {
        this.modifyLieu({
          id: this.placeid,
          lieu: {
            title: this.title,
            numero: this.numero,
            rue: this.rue,
            cPostal: this.cpostal,
            ville: this.ville,
            telephone: this.telephone
          }
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.title = ''
            this.numero = ''
            this.rue = ''
            this.cpostal = ''
            this.ville = ''
            this.telephone = ''
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.errors.fields = {
        lieu_title: '',
        lieu_numero: '',
        lieu_rue: '',
        lieu_cpostal: '',
        lieu_ville: '',
        lieu_telephone: ''
      }
      this.title = ''
      this.numero = ''
      this.rue = ''
      this.cpostal = ''
      this.ville = ''
      this.telephone = ''
      this.$emit('closed')
    }
  }
}
</script>
