<style lang="scss">

</style>

<template>
  <div>
    <div class="convention_container" v-show="conventionvisible">
      <h3>Convention</h3>
      <form @submit.prevent="Submitconvention">
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Nom de la convention :
              <input type="text" v-model="title" :class="{ 'error': errors.fields.convention_title }" >
            </label>
            <div class="errors">
              {{ errors.fields.convention_title }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Temps maximum par jour en heures :
              <input type="text" v-model="tpsMaxJ" :class="{ 'error': errors.fields.convention_tpsMaxJ }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMaxJ }}
            </div>
          </div>
          <div class="form_convention_input">
            <label>Temps minimum par jour en heures :
              <input type="text" v-model="tpsMinJ" :class="{ 'error': errors.fields.convention_tpsMinJ }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMinJ }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Temps maximum par période de travail en heures :
              <input type="text" v-model="tpsMaxPeriode" :class="{ 'error': errors.fields.convention_tpsMaxPeriode }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMaxPeriode }}
            </div>
          </div>
          <div class="form_convention_input">
            <label>Temps minimum entre deux période de travail en heures :
              <input type="text" v-model="tpsMinInterPeriode" :class="{ 'error': errors.fields.convention_tpsMinInterPeriode }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMinInterPeriode }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Amplitude maximum par jour en heures :
              <input type="text" v-model="ampMaxJ" :class="{ 'error': errors.fields.convention_ampMaxJ }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_ampMaxJ }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Temps minimum de repo sans compensation entre 2 jours de travail en heures :
              <input type="text" v-model="tpsMinRepo" :class="{ 'error': errors.fields.convention_tpsMinRepo }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMinRepo }}
            </div>
          </div>
          <div class="form_convention_input">
            <label>Temps minimum de repo avec compensation( heure de recuperation ) entre 2 jours de travail en heures :
              <input type="text" v-model="tpsMinRepoComp" :class="{ 'error': errors.fields.convention_tpsMinRepoComp }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMinRepoComp }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Nombre maximum d'heures de travail sur une semaine :
              <input type="text" v-model="tpsMaxS" :class="{ 'error': errors.fields.convention_tpsMaxS }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMaxS }}
            </div>
          </div>
          <div class="form_convention_input">
            <label>Nombre maximum d'heures de travail sur douze semaine consécutive :
              <input type="text" v-model="tpsMax12s" :class="{ 'error': errors.fields.convention_tpsMax12s }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsMax12s }}
            </div>
          </div>
        </div>
        <div class="form_convention_row">
          <div class="form_convention_input">
            <label>Nombre maximum de jour de travail consecutif :
              <input type="text" v-model="nbrJMaxConse" :class="{ 'error': errors.fields.convention_nbrJMaxConse }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_nbrJMaxConse }}
            </div>
          </div>
          <div class="form_convention_input">
            <label>Temps de repo hebdomadaire en heures :
              <input type="text" v-model="tpsRepoHebdo" :class="{ 'error': errors.fields.convention_tpsRepoHebdo }">
            </label>
            <div class="errors">
              {{ errors.fields.convention_tpsRepoHebdo }}
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
    conventionid: {type: Number, default: 0},
    conventionvisible: {type: Boolean, default: true}
  },
  data: function () {
    return {
      title: 'Syndéac',
      tpsMaxJ: 12,
      tpsMinJ: 4,
      tpsMaxPeriode: 6,
      tpsMinInterPeriode: 1,
      ampMaxJ: 15,
      tpsMinRepo: 11,
      tpsMinRepoComp: 9,
      tpsMaxS: 48,
      tpsMax12s: 44,
      nbrJMaxConse: 6,
      tpsRepoHebdo: 35,
      errors: {
        fields: {
          convention_title: '',
          convention_tpsMaxJ: '',
          convention_tpsMinJ: '',
          convention_tpsMaxPeriode: '',
          convention_tpsMinInterPeriode: '',
          convention_ampMaxJ: '',
          convention_tpsMinRepo: '',
          convention_tpsMinRepoComp: '',
          convention_tpsMaxS: '',
          convention_tpsMax12s: '',
          convention_nbrJMaxConse: '',
          convention_tpsRepoHebdo: ''
        }
      }
    }
  },
  computed: {
    convention: function () {
      let index = this.$store.getters.conventions.findIndex((c) => c.id === this.conventionid)
      return this.$store.getters.conventions[index]
    }
  },
  watch: {
    conventionid: function (val, oldval) {
      if (val !== 0) {
        this.title = this.convention.title
        this.tpsMaxJ = this.convention.tps_max_j
        this.tpsMinJ = this.convention.tps_min_j
        this.tpsMaxPeriode = this.convention.tps_max_periode
        this.tpsMinInterPeriode = this.convention.tps_min_inter_periode
        this.ampMaxJ = this.convention.amp_max_j
        this.tpsMinRepo = this.convention.tps_min_repo
        this.tpsMinRepoComp = this.convention.tps_min_repo_comp
        this.tpsMaxS = this.convention.tps_max_s
        this.tpsMax12s = this.convention.tps_max12s
        this.nbrJMaxConse = this.convention.nbr_j_max_conse
        this.tpsRepoHebdo = this.convention.tps_repo_hebdo
      }
    }
  },
  methods: {
    ...mapActions([
      'addConvention',
      'modifyConvention'
    ]),
    Submitconvention: function () {
      if (this.conventionid === 0) {
        this.addConvention({
          title: this.title,
          tpsMaxJ: this.tpsMaxJ,
          tpsMinJ: this.tpsMinJ,
          tpsMaxPeriode: this.tpsMaxPeriode,
          tpsMinInterPeriode: this.tpsMinInterPeriode,
          ampMaxJ: this.ampMaxJ,
          tpsMinRepo: this.tpsMinRepo,
          tpsMinRepoComp: this.tpsMinRepoComp,
          tpsMaxS: this.tpsMaxS,
          tpsMax12s: this.tpsMax12s,
          nbrJMaxConse: this.nbrJMaxConse,
          tpsRepoHebdo: this.tpsRepoHebdo
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.$emit('closed')
          }
        })
      } else {
        this.modifyConvention({
          id: this.conventionid,
          convention: {
            title: this.title,
            tpsMaxJ: this.tpsMaxJ,
            tpsMinJ: this.tpsMinJ,
            tpsMaxPeriode: this.tpsMaxPeriode,
            tpsMinInterPeriode: this.tpsMinInterPeriode,
            ampMaxJ: this.ampMaxJ,
            tpsMinRepo: this.tpsMinRepo,
            tpsMinRepoComp: this.tpsMinRepoComp,
            tpsMaxS: this.tpsMaxS,
            tpsMax12s: this.tpsMax12s,
            nbrJMaxConse: this.nbrJMaxConse,
            tpsRepoHebdo: this.tpsRepoHebdo
          }
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.errors.fields = {
        convention_title: '',
        convention_tpsMaxJ: '',
        convention_tpsMinJ: '',
        convention_tpsMaxPeriode: '',
        convention_tpsMinInterPeriode: '',
        convention_ampMaxJ: '',
        convention_tpsMinRepo: '',
        convention_tpsMinRepoComp: '',
        convention_tpsMaxS: '',
        convention_tpsMax12s: '',
        convention_nbrJMaxConse: '',
        convention_tpsRepoHebdo: ''
      }
      this.$emit('closed')
    }
  }
}
</script>
