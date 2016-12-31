<style>
</style>

<template>
  <div>
    <div class="function_container" v-show="functionvisible">
      <h3>Fonction</h3>
      <form class="" @submit.prevent="Submitfunction">
        <div class="form_function_row">
          <div class="form_function_input">
            <label>Nom de la fonction :
              <input type="text" v-model="title" :class="{ 'error': errors.fields.fonction_title}">
            </label>
            <div class="errors">
              {{ errors.fields.fonction_title }}
            </div>
          </div>
        </div>
        <div class="form_function_row">
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
    functionvisible: {type: Boolean, default: true},
    functionid: {type: Number, default: 0}
  },
  data: function () {
    return {
      title: '',
      errors: {
        fields: {fonction_title: ''}
      }
    }
  },
  computed: {
    fonction: function () {
      let index = this.$store.getters.fonctions.findIndex((f) => f.id === this.functionid)
      return this.$store.getters.fonctions[index]
    }
  },
  watch: {
    functionid: function (val) {
      if (val !== 0) {
        this.title = this.fonction.title
      }
    }
  },
  methods: {
    ...mapActions([
      'addFonction',
      'modifyFonction'
    ]),
    Submitfunction: function () {
      if (this.functionid === 0) {
        this.addFonction({
          title: this.title
        }).catch((err) => {
          this.errors = err.data
          console.log(err)
        }).then((response) => {
          if (response) {
            this.title = ''
            this.$emit('closed')
          }
        })
      } else {
        this.modifyFonction({
          id: this.functionid,
          fonction: {
            title: this.title
          }
        }).catch((err) => {
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.title = ''
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.title = ''
      this.errors.fields.fonction_title = ''
      this.$emit('closed')
    }
  }
}
</script>
