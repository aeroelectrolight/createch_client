<style>

</style>

<template>
  <div class="ui orange segment">
    <h2>
      Ajout ou édition des vérifications
      <div class="ui large pointing below red label" v-if="verificationId !== 0">
        <i class="icon warning sign"></i>
        Attention !!! Edition de : {{ verification.designation }}
      </div>
    </h2>

    <form class="ui form">
      <div class="ui grid">
        <div class="ui four wide column">
          <div :class="{ 'field': true, 'error': errors.fields.verifications_designation }">
            <label for="compte">Designation :</label>
            <input type="text" v-model="designation">
            <div class="ui pointing red basic label" v-if="errors.fields.verifications_designation">
              {{ errors.fields.verifications_designation }}
            </div>
          </div>
        </div>
        <div class="ui two wide column">
          <datepicker :value="lastVisite" name="Dernière visite" :timevisible="false" @onchange="NewLastVisite"></datepicker>
        </div>
        <div class="ui two wide column">
          <datepicker :value="nextVisite" name="Prochaine visite" :timevisible="false" @onchange="NewNextVisite"></datepicker>
        </div>
        <div class="ui four wide column">
          <div :class="{ 'field': true, 'error': errors.fields.verifications_organism }">
            <label for="compte">Organisme vérificateur :</label>
            <input type="text" v-model="organism">
            <div class="ui pointing red basic label" v-if="errors.fields.verifications_organism">
              {{ errors.fields.verifications_organism }}
            </div>
          </div>
        </div>
        <div class="ui two wide column">
          <div :class="{ 'field': true, 'error': errors.fields.verifications_alertDelay }">
            <label for="compte">Delai d'alerte en jour :</label>
            <input type="text" v-model="alertDelay">
            <div class="ui pointing red basic label" v-if="errors.fields.verifications_alertDelay">
              {{ errors.fields.verifications_alertDelay }}
            </div>
          </div>
        </div>
        <div class="ui two wide column">
          <div :class="{ 'field': true, 'error': errors.fields.verifications_periodicity }">
            <label for="compte">Périodicité en mois :</label>
            <input type="text" v-model="periodicity">
            <div class="ui pointing red basic label" v-if="errors.fields.verifications_periodicity">
              {{ errors.fields.verifications_periodicity }}
            </div>
          </div>
        </div>
        <div class="ui sixteen wide column">
          <button class="ui mini blue button float-right" type="button" @click="SubmitVerification">
            <i class="icon add square"></i>
            add vérification
          </button>
          <button class="ui mini basic button float-right" type="button" @click="ClearForm">
            <i class="icon file outline"></i>
            effacer le formulaire
          </button>
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
    verificationId: {type: Number, default: 0}
  },
  components: {
    datepicker: datepickerComponent
  },
  data () {
    return {
      designation: '',
      lastVisite: moment().format('YYYY-MM-DD'),
      nextVisite: moment().format('YYYY-MM-DD'),
      organism: '',
      alertDelay: 15,
      periodicity: 12,
      errors: {
        fields: {
          verifications_designation: '',
          verifications_lastvisite: '',
          verifications_nextvisite: '',
          verifications_organism: '',
          verifications_alertdelay: '',
          verifications_periodicity: ''
        }
      }
    }
  }, // end data
  computed: {
    verification () {
      let index = this.$store.getters.verifications.findIndex((v) => v.id === this.verificationId)
      return this.$store.getters.verifications[index]
    }
  },
  watch: {
    verificationId (val) {
      if (val !== 0) {
        this.designation = this.verification.designation
        this.lastVisite = moment(this.verification.last_visite).format('YYYY-MM-DD')
        this.nextVisite = moment(this.verification.next_isite).format('YYYY-MM-DD')
        this.organism = this.verification.organism
        this.alertDelay = this.verification.alert_delay
        this.periodicity = this.verification.periodicity
      }
    },
    lastVisite (val) {
      this.nextVisite = moment(val).add(this.periodicity, 'month').format('YYYY-MM-DD')
    },
    periodicity (val) {
      this.nextVisite = moment(this.lastVisite).add(val, 'month').format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions([
      'addVerification',
      'modifyVerification'
    ]),
    SubmitVerification () {
      if (this.verificationId !== 0) {
        this.modifyVerification({
          id: this.verificationId,
          verification: {
            designation: this.designation,
            lastVisite: this.lastVisite,
            nextVisite: this.nextVisite,
            organism: this.organism,
            alertDelay: this.alertDelay,
            periodicity: this.periodicity
          }
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.ClearForm()
          }
        })
      } else {
        this.addVerification({
          designation: this.designation,
          lastVisite: this.lastVisite,
          nextVisite: this.nextVisite,
          organism: this.organism,
          alertDelay: this.alertDelay,
          periodicity: this.periodicity
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.ClearForm()
          }
        })
      }
    },
    NewLastVisite (val) {
      this.lastVisite = val
    },
    NewNextVisite (val) {
      this.nextVisite = val
    },
    ClearForm () {
      this.verificationId = 0
      this.designation = ''
      this.lastVisite = moment().format('YYYY-MM-DD')
      this.nextVisite = moment().format('YYYY-MM-DD')
      this.organism = ''
      this.alertDelay = 15
      this.periodicity = 12
      this.errors.fields = {
        verifications_designation: '',
        verifications_lastvisite: '',
        verifications_nextvisite: '',
        verifications_organism: '',
        verifications_alertdelay: '',
        verifications_periodicity: ''
      }
    }
  }
}
</script>
