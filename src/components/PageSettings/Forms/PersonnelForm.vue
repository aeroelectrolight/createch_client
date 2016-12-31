<style>
</style>

<template>
  <div>
    <div v-show="personnelvisible">
      <h3>Personnel</h3>
      <form @submit.prevent="Submitpersonnel">
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le pseudonyme :
              <input type="text" v-model="user" :class="{ 'error': errors.fields.personnel_user }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_user }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le nom :
              <input type="text" v-model="nom" :class="{ 'error': errors.fields.personnel_nom }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_nom }}
            </div>
          </div>
          <div class="form_personnel_input">
            <label>Le prénom :
              <input type="text" v-model="prenom" :class="{ 'error': errors.fields.personnel_prenom }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_prenom }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>L'adresse mail :
              <input type="text" v-model="mail" :class="{ 'error': errors.fields.personnel_mail }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_mail }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le statut de la personne :
              <select v-model="statut">
                <option value="Intermittent">Intermittent</option>
                <option value="Permanent">Permanent</option>
                <option value="Contractuel">Contractuel</option>
              </select>
            </label>
          </div>
          <div class="form_personnel_input">
            <label>La convention de la personne :
              <select v-model="convention">
                <option v-for="charter in conventions" :value="charter.id">{{ charter.title }}</option>
              </select>
            </label>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <datepicker :value="dateNaissance" name="La date de naissance" :timevisible="true" @onchange="newDate"></datepicker>
          </div>
          <div class="form_personnel_input">
            <label>Le lieu de naissance :
              <input type="text" v-model="lieuNaissance" :class="{ 'error': errors.fields.personnel_lieuNaissance }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_lieuNaissance }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le telephone :
              <input type="text" v-model="telephone" :class="{ 'error': errors.fields.personnel_telephone }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_telephone }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le numéro de la rue :
              <input type="text" v-model="numero" :class="{ 'error': errors.fields.personnel_numero }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_numero }}
            </div>
          </div>
          <div class="form_personnel_input">
            <label>La rue :
              <input type="text" v-model="rue" :class="{ 'error': errors.fields.personnel_rue }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_rue }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le code postal :
              <input type="text" v-model="cPostal" :class="{ 'error': errors.fields.personnel_cPostal }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_cPostal }}
            </div>
          </div>
          <div class="form_personnel_input">
            <label>La ville :
              <input type="text" v-model="ville" :class="{ 'error': errors.fields.personnel_ville }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_ville }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le numéro de sécurité social :
              <input type="text" v-model="numSecu" :class="{ 'error': errors.fields.personnel_numSecu }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_numSecu }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le numéro de congé spectacle :
              <input type="text" v-model="numConge" :class="{ 'error': errors.fields.personnel_numConge }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_numConge }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <div class="form_personnel_input">
            <label>Le relevé d'identité bancaire :
              <input type="text" v-model="rib" :class="{ 'error': errors.fields.personnel_rib }">
            </label>
            <div class="errors">
              {{ errors.fields.personnel_rib }}
            </div>
          </div>
        </div>
        <div class="form_personnel_row">
          <button type="submit" class="button-success">Valider</button>
          <button type="button" class="button-alert" @click="escape">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
// import Datepicker from 'vue-datepicker'
import DatepickerComponent from 'src/components/datepicker/Datepicker.vue'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  components: {
    'datepicker': DatepickerComponent
  },
  props: {
    personnelvisible: {type: Boolean, default: true},
    personnelid: {type: Number, default: 0}
  },
  data: function () {
    return {
      user: '',
      nom: '',
      prenom: '',
      mail: '',
      statut: '',
      convention: this.conventions,
      dateNaissance: moment().subtract(30, 'years').format('YYYY-MM-DD'),
      lieuNaissance: '',
      telephone: '',
      numero: '',
      rue: '',
      cPostal: '',
      ville: '',
      numSecu: '',
      numConge: '',
      rib: '',
      errors: {
        fields: {
          personnel_user: '',
          personnel_nom: '',
          personnel_prenom: '',
          personnel_mail: '',
          personnel_lieuNaissance: '',
          personnel_telephone: '',
          personnel_numero: '',
          personnel_rue: '',
          personnel_cPostal: '',
          personnel_ville: '',
          personnel_numConge: '',
          personnel_rib: ''
        }
      }
    } // end of return
  },
  computed: {
    conventions () {
      return this.$store.getters.conventions
    },
    personnel: function () {
      let index = this.$store.getters.personnels.findIndex((p) => p.id === this.personnelid)
      return this.$store.getters.personnels[index]
    }
  },
  watch: {
    personnelid: function (val) {
      if (val !== 0) {
        this.user = this.personnel.user
        this.nom = this.personnel.nom
        this.prenom = this.personnel.prenom
        this.mail = this.personnel.mail
        this.statut = this.personnel.statut
        this.convention = this.personnel.convention.id
        this.dateNaissance = this.personnel.date_naissance
        this.lieuNaissance = this.personnel.lieu_naissance
        this.telephone = this.personnel.telephone
        this.numero = this.personnel.numero
        this.rue = this.personnel.rue
        this.cPostal = this.personnel.c_postal
        this.ville = this.personnel.ville
        this.numSecu = this.personnel.num_secu
        this.numConge = this.personnel.num_conge
        this.rib = this.personnel.rib
      }
    }
  },
  methods: {
    ...mapActions([
      'addPersonnel',
      'modifyPersonnel'
    ]),
    Submitpersonnel: function () {
      if (this.personnelid === 0) {
        this.addPersonnel({
          user: this.user,
          nom: this.nom,
          prenom: this.prenom,
          mail: this.mail,
          statut: this.statut,
          convention: this.convention,
          dateNaissance: this.dateNaissance,
          lieuNaissance: this.lieuNaissance,
          telephone: this.telephone,
          numero: this.numero,
          rue: this.rue,
          cPostal: this.cPostal,
          ville: this.ville,
          numSecu: this.numSecu,
          numConge: this.numConge,
          rib: this.rib
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.clean()
            this.$emit('closed')
          }
        })
      } else {
        this.modifyPersonnel({
          id: this.personnelid,
          personnel: {
            user: this.user,
            nom: this.nom,
            prenom: this.prenom,
            mail: this.mail,
            statut: this.statut,
            convention: this.convention,
            dateNaissance: this.dateNaissance,
            lieuNaissance: this.lieuNaissance,
            telephone: this.telephone,
            numero: this.numero,
            rue: this.rue,
            cPostal: this.cPostal,
            ville: this.ville,
            numSecu: this.numSecu,
            numConge: this.numConge,
            rib: this.rib
          }
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.clean()
            this.$emit('closed')
          }
        })
      }
    },
    escape: function () {
      this.errors.fields = {
        personnel_user: '',
        personnel_nom: '',
        personnel_prenom: '',
        personnel_mail: '',
        personnel_lieuNaissance: '',
        personnel_telephone: '',
        personnel_numero: '',
        personnel_rue: '',
        personnel_cPostal: '',
        personnel_ville: '',
        personnel_numConge: '',
        personnel_rib: ''
      }
      this.clean()
      this.$emit('closed')
    },
    newDate (val) {
      this.dateNaissance = val
    },
    clean () {
      this.user = ''
      this.nom = ''
      this.prenom = ''
      this.mail = ''
      this.statut = ''
      this.convention = this.conventions
      this.dateNaissance = '15/03/1985'
      this.lieuNaissance = ''
      this.telephone = ''
      this.numero = ''
      this.rue = ''
      this.cPostal = ''
      this.ville = ''
      this.numSecu = ''
      this.numConge = ''
      this.rib = ''
    }
  }
}
</script>
