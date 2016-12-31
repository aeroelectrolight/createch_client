<style lang="scss">

</style>

<template>
  <div>
    <div v-show="groupvisible">
      <h3>Groupe</h3>
      <form @submit.prevent="groupSubmit">
        <div class="form_groupe_row">
          <div class="form_groupe_input">
            <label>Nom du groupe :
              <input type="text" v-model="grouptitle" :class="{ 'error': errors.fields.groupe_title }">
            </label>
            <div class="errors">
              {{ errors.fields.groupe_title }}
            </div>
          </div>
        </div>
        <div class="form_groupe_row">
          <div class="form_groupe_input">
            <label>Selection des fonctions associées :
             <select v-model="groupfunctions" multiple>
               <option v-for="fonction in fonctions" :value="fonction.id">{{ fonction.title }}</option>
             </select>
            </label>
          </div>
          <div class="form_groupe_input">
            <label>Selection de la couleur associée :
              <select v-model="groupcolor">
                <option v-for="couleur in couleurs" :value="couleur.id">{{ couleur.title }}</option>
              </select>
            </label>
          </div>
        </div>
        <div class="form_groupe_row">
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
    groupid: {type: Number, default: 0},
    groupvisible: {type: Boolean, default: false}
  },
  data: function () {
    return {
      errors: {
        fields: { groupe_title: '' }
      },
      grouptitle: '',
      groupfunctions: [],
      groupcolor: ''
    }
  },
  computed: {
    groupe: function () {
      let index = this.$store.getters.groupes.findIndex((g) => g.id === this.groupid)
      return this.$store.getters.groupes[index]
    },
    fonctions () {
      return this.$store.getters.fonctions
    },
    couleurs () {
      return this.$store.getters.couleurs
    }
  },
  watch: {
    groupid: function (val) {
      if (val !== 0) {
        let arrayid = []
        this.groupe.fonctions.forEach((el, index, array) => {
          arrayid[index] = el.id
        })
        this.grouptitle = this.groupe.title
        this.groupfunctions = arrayid
        this.groupcolor = this.groupe.couleur.id
      }
    }
  },
  methods: {
    ...mapActions([
      'addGroupe',
      'modifyGroupe'
    ]),
    groupSubmit: function () {
      if (this.groupid === 0) {
        this.addGroupe({
          title: this.grouptitle,
          fonctions: this.groupfunctions,
          couleur: this.groupcolor
        }).catch((err) => {
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.grouptitle = ''
            this.groupfunctions = []
            this.groupcolor = ''
            this.$emit('closed')
          }
        })
      } else {
        this.modifyGroupe({
          id: this.groupid,
          groupe: {
            title: this.grouptitle,
            fonctions: this.groupfunctions,
            couleur: this.groupcolor
          }
        }).catch((err) => {
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.grouptitle = ''
            this.groupfunctions = []
            this.groupcolor = ''
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.grouptitle = ''
      this.errors.fields.groupe_title = ''
      this.$emit('closed')
    }
  }
}
</script>
