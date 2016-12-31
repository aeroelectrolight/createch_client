<style>
</style>

<template>
  <div class="ui orange segment">
    <h2>
      Ajout ou édition des maintenances :
      <div class="ui large pointing below red label" v-if="maintenanceId !== 0">
        <i class="icon warning sign"></i>
        Attention !!! Edition de : maintenance
      </div>
    </h2>

    <form class="ui form">
      <div class="fields">
        <div class="two wide field"></div>
        <div class="three wide field">
          <div :class="{ 'field': true, 'error': errors.body.fields.maintenance_title }">
            <label for="compte">Titre :</label>
            <input type="text" v-model="title">
            <div class="ui pointing red basic label" v-if="errors.body.fields.maintenance_title">
              {{ errors.body.fields.maintenance_title }}
            </div>
          </div>
        </div>
        <div class="two wide field">
          <datepicker :value="dateOrigin" name="Date du problème" :timevisible="false" @onchange="NewOriginDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateVisit" name="Date de visite" :timevisible="false" @onchange="NewVisitDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateWork" name="Date de maintenance" :timevisible="false" @onchange="NewWorkDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateResolved" name="Date résolu" :timevisible="false" @onchange="NewResolvedDate"></datepicker>
        </div>
      </div>
      <div class="fields">
        <div class="two wide field"></div>
        <div class="six wide field">
          <label>Short Text</label>
          <textarea rows="2"></textarea>
          <div class="ui pointing red basic label" v-if="errors.body.fields.maintenance_title">
            {{ errors.body.fields.maintenance_title }}
          </div>
        </div>
        <div class="one wide field"></div>
        <div class="two wide field">
          <label>Short Text</label>
          <select class="">
            <option value="option">option</option>
          </select>
        </div>
        <div class="four wide field createch-vertical-center">
          <div class="">
            <button class="ui mini blue button float-right" type="button" @click="SubmitMaintenance">
              <i class="icon add square"></i>
              add vérification
            </button>
            <button class="ui mini basic button float-right" type="button" @click="ClearForm">
              <i class="icon file outline"></i>
              effacer le formulaire
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'
import datepickerComponent from 'src/components/datepicker/Datepicker.vue'
// import { mapActions } from 'vuex'

export default {
  props: {
    maintenanceId: { type: Number, default: 0 }
  },
  data () {
    return {
      title: '',
      dateOrigin: moment().format('YYYY-MM-DD'),
      dateVisit: moment().format('YYYY-MM-DD'),
      dateWork: moment().format('YYYY-MM-DD'),
      dateResolved: moment().format('YYYY-MM-DD'),
      errors: {
        body: {
          fields: {
            maintenance_title: ''
          }
        }
      }
    }
  },
  components: {
    datepicker: datepickerComponent
  },
  methods: {
    NewOriginDate (val) {
      this.dateOrigin = val
    },
    NewVisitDate (val) {
      this.dateVisit = val
    },
    NewWorkDate (val) {
      this.dateWork = val
    },
    NewResolvedDate (val) {
      this.dateResolved = val
    },
    SubmitMaintenance () {
      
    },
    ClearForm () {
    }
  }
}
</script>
