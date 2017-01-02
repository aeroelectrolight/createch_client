<style>
</style>

<template>
  <div class="ui orange segment" id="form_maintenance">
    <h2>
      Ajout ou édition des maintenances :
      <div class="ui large pointing below red label" v-if="maintenanceId !== 0">
        <i class="icon warning sign"></i>
        Attention !!! Edition de la maintenance : {{ maintenance.title }}
      </div>
    </h2>

    <form class="ui form">
      <div class="fields">
        <div class="two wide field"></div>
        <div class="three wide field" :class="{'error': errors.fields.maintenances_title}">
            <label for="compte">Titre :</label>
            <input type="text" v-model="title">
            <div class="ui pointing red basic label" v-if="errors.fields.maintenances_title">
              {{ errors.fields.maintenances_title }}
            </div>
        </div>
        <div class="two wide field" :class="{'disabled': maintenanceId !== 0 }">
          <datepicker :value="dateOrigin" name="Date du problème :" :timevisible="false" @onchange="NewOriginDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateVisit" name="Date de visite :" :timevisible="false" @onchange="NewVisitDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateWork" name="Date de maintenance :" :timevisible="false" @onchange="NewWorkDate"></datepicker>
        </div>
        <div class="two wide field">
          <datepicker :value="dateResolved" name="Date résolu :" :timevisible="false" @onchange="NewResolvedDate"></datepicker>
        </div>
      </div>
      <div class="fields">
        <div class="two wide field"></div>
        <div class="six wide field" :class="{'error': errors.fields.maintenances_description}">
          <label>Description :</label>
          <textarea rows="2" v-model='description'></textarea>
          <div class="ui pointing red basic label" v-if="errors.fields.maintenances_description">
            {{ errors.fields.maintenances_description }}
          </div>
        </div>
        <div class="one wide field"></div>
        <div class="two wide field">
          <label>Catégorie :</label>
          <select v-model='category'>
            <option value="batiment">Batîment</option>
            <option value="materiel">Matériel</option>
          </select>
        </div>
        <div class="four wide field createch-vertical-center">
          <div class="">
            <button class="ui mini red button float-right" type="button" @click="DeleteMaintenance" v-if="maintenanceId">
              <i class="icon remove circle"></i>
              Delete
            </button>
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
import { mapActions } from 'vuex'

export default {
  props: {
    maintenanceId: { type: Number, default: 0 }
  },
  components: {
    datepicker: datepickerComponent
  },
  data () {
    return {
      title: '',
      dateOrigin: moment().format('YYYY-MM-DD'),
      dateVisit: moment().format('YYYY-MM-DD'),
      dateWork: moment().format('YYYY-MM-DD'),
      dateResolved: moment().format('YYYY-MM-DD'),
      description: '',
      category: 'materiel',
      errors: {
        fields: {
          maintenance_title: '',
          maintenance_description: ''
        }
      }
    }
  },
  computed: {
    maintenance () {
      let index = this.$store.getters.maintenances.findIndex((m) => m.id === this.maintenanceId)
      return this.$store.getters.maintenances[index]
    }
  },
  watch: {
    maintenanceId (val) {
      if (val !== 0) {
        this.title = this.maintenance.title
        this.dateOrigin = moment(this.maintenance.date_origin).format('YYYY-MM-DD')
        this.dateVisit = moment(this.maintenance.date_visit).format('YYYY-MM-DD')
        this.dateWork = moment(this.maintenance.date_work).format('YYYY-MM-DD')
        this.dateResolved = moment(this.maintenance.date_resolved).format('YYYY-MM-DD')
        this.description = this.maintenance.description
        this.category = this.maintenance.category
      }
    },
    dateOrigin (val) {
      if (this.maintenanceId === 0) {
        this.dateVisit = this.dateWork = this.dateResolved = val
      }
    }
  },
  methods: {
    ...mapActions([
      'addMaintenance',
      'modifyMaintenance',
      'deleteMaintenance'
    ]),
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
      if (this.maintenanceId !== 0) {
        this.modifyMaintenance({
          id: this.maintenanceId,
          maintenance: {
            title: this.title,
            dateOrigin: this.dateOrigin,
            dateVisit: this.dateVisit,
            dateWork: this.dateWork,
            dateResolved: this.dateResolved,
            description: this.description,
            category: this.category
          }
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
        })
      } else {
        this.addMaintenance({
          title: this.title,
          dateOrigin: this.dateOrigin,
          dateVisit: this.dateVisit,
          dateWork: this.dateWork,
          dateResolved: this.dateResolved,
          description: this.description,
          category: this.category
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {

        })
      }
    },
    DeleteMaintenance () {
      this.deleteMaintenance(this.maintenanceId)
      this.ClearForm()
    },
    ClearForm () {
      this.$emit('clearId')
      this.title = ''
      this.dateOrigin = moment().format('YYYY-MM-DD')
      this.dateVisit = moment().format('YYYY-MM-DD')
      this.dateWork = moment().format('YYYY-MM-DD')
      this.dateResolved = moment().format('YYYY-MM-DD')
      this.description = ''
      this.category = 'materiel'
      this.errors.fields = {
        maintenance_title: '',
        maintenance_description: ''
      }
    }
  },
  mounted () {
  }
}
</script>
