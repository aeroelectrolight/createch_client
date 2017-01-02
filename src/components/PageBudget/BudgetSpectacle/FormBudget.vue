<style>
</style>

<template>
  <div class="ui orange segment" v-if="isVisible">
    <h1>Formulaire de budget</h1>
    <form class="ui form">
      <div class="ui grid">
        <div class="two wide column">
          <div :class="{ 'field': true, 'error': errors.fields.budget_compte }">
            <label for="compte">Compte :</label>
            <input type="text" v-model="compte">
            <div class="ui pointing red basic label" v-if="errors.fields.budget_compte">
              {{ errors.fields.budget_compte }}
            </div>
          </div>
        </div>
        <div class="nine wide column">
          <div :class="{ 'field': true, 'error': errors.fields.budget_nature }">
            <label for="compte">Nature :</label>
            <input type="text" v-model="dnature">
            <div class="ui pointing red basic label" v-if="errors.fields.budget_nature">
              {{ errors.fields.budget_nature }}
            </div>
          </div>
        </div>
        <div class="five wide column">
          <div :class="{ 'field': true, 'error': errors.fields.budget_nom }">
            <label for="compte">Nom / Entreprise :</label>
            <input type="text" v-model="nom">
            <div class="ui pointing red basic label" v-if="errors.fields.budget_nom">
              {{ errors.fields.budget_nom }}
            </div>
          </div>
        </div>
        <div class="sixteen wide column">
          <div :class="{ 'field': true, 'error': errors.fields.budget_detail }">
            <label for="compte">detail :</label>
            <textarea type="text" name="name" v-model="detail"></textarea>
            <div class="ui pointing red basic label" v-if="errors.fields.budget_detail">
              {{ errors.fields.budget_detail }}
            </div>
          </div>
        </div>
        <div class="four wide column" v-show="dnature === 'Techniciens'">
          <div class="field">
            <label for="compte">Heures prévisionnelles :</label>
            <input type="text" name="name" v-model.number="estimatedHours">
          </div>
        </div>
        <div class="four wide column" v-show="dnature === 'Techniciens'">
          <div class="field">
            <label for="compte">Heures réelles :</label>
            <input type="text" name="name" v-model.number="realHours">
          </div>
        </div>
        <div class="four wide column" v-show="dnature === 'Techniciens'">
          <div class="field">
            <label for="compte">Tarif horaire :</label>
            <div class="ui icon input">
              <input type="text" name="name" v-model="tarifh">
              <i class="euro icon"></i>
            </div>
          </div>
        </div>
        <div class="four wide column" v-show="dnature === 'Techniciens'">
          <div class="field">
            <label for="compte">Charges :</label>
            <div class="ui icon input">
              <input type="text" name="name" v-model="cotisP">
              <i class="euro icon"></i>
            </div>
          </div>
        </div>
        <div class="five wide column">
          <div :class="{ 'field': true, 'inline': true, 'error': errors.fields.budget_provisional_amount }">
            <label for="compte">Montant previsionnel :</label>
            <div class="ui icon input">
              <input type="text" name="name" v-model="provisionalAmount">
              <i class="euro icon"></i>
            </div>
            <div class="ui pointing red basic label" v-if="errors.fields.budget_provisional_amount">
              {{ errors.fields.budget_provisional_amount }}
            </div>
          </div>
        </div>
        <div class="five wide column">
          <div :class="{ 'field': true, 'inline': true, 'error': errors.fields.budget_real_amount }">
            <label for="compte">Montant réel :</label>
            <div class="ui icon input">
              <input type="text" name="name" v-model="realAmount">
              <i class="euro icon"></i>
            </div>
            <div class="ui pointing red basic label" v-if="errors.fields.budget_real_amount">
              {{ errors.fields.budget_real_amount }}
            </div>
          </div>
        </div>
        <div class="six wide column">
          <button type="button" name="ajout" class="ui blue button" @click="BudgetSubmit">Ajout</button>
          <button type="button" name="annuler" class="ui orange button" @click="Escape" >Annuler</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'

export default {
  props: {
    isVisible: { type: Boolean, default: true },
    nature: { type: String, default: '' },
    budgetId: { type: Number, default: 0 },
    eventId: { type: Number, required: true }
  },
  data: function () {
    return {
      compte: 10,
      dnature: '',
      nom: '',
      detail: '',
      provisionalAmount: '',
      realAmount: '',
      estimatedHours: '',
      realHours: '',
      tarifh: 15.4,
      cotisP: 1.65,
      errors: {
        fields: {
          budget_compte: '',
          budget_nature: '',
          budget_nom: '',
          budget_detail: '',
          budget_provisional_amount: '',
          budget_real_amount: '',
          budget_estimated_hours: '',
          budget_real_amount_hours: ''
        }
      }
    }
  },
  computed: {
    budget () {
      let index = this.$store.getters.budgets.findIndex((c) => c.id === this.budgetId)
      return this.$store.getters.budgets[index]
    }
  },
  watch: {
    budgetId (val) {
      if (this.budgetId !== 0) {
        this.compte = this.budget.compte
        this.dnature = this.budget.nature
        this.nom = this.budget.nom
        this.detail = this.budget.detail
        this.provisionalAmount = parseFloat(this.budget.provisional_amount)
        this.realAmount = parseFloat(this.budget.real_amount)
        this.estimatedHours = parseFloat(this.budget.estimated_hours)
        this.realHours = parseFloat(this.budget.real_hours)
        this.tarifh = parseFloat(this.budget.tarifh)
      }
    },
    estimatedHours (val) {
      if (val) {
        this.provisionalAmount = parseInt(val) * this.tarifh * this.cotisP
      }
    },
    realHours (val) {
      if (val) {
        this.realAmount = parseInt(val) * this.tarifh * this.cotisP
      }
    },
    tarifh (val) {
      this.provisionalAmount = parseInt(val) * this.estimatedHours * this.cotisP
      this.realAmount = parseInt(val) * this.realHours * this.cotisP
    }
  },
  beforeUpdate () {
    if (this.budgetId === 0) {
      this.dnature = this.nature
    }
  },
  methods: {
    ...mapActions([
      'addBudget',
      'modifyBudget',
      'reloadEvent'
    ]),
    BudgetSubmit () {
      if (this.budgetId !== 0) {
        this.modifyBudget({
          id: this.budgetId,
          budget: {
            compte: this.compte,
            nature: this.dnature,
            nom: this.nom,
            detail: this.detail,
            provisionalAmount: this.provisionalAmount,
            realAmount: this.realAmount,
            estimatedHours: this.estimatedHours,
            realHours: this.realHours,
            tarifh: this.tarifh,
            events: this.eventId
          }
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.reloadEvent()
            this.Escape()
          }
        })
      } else {
        this.addBudget({
          compte: this.compte,
          nature: this.dnature,
          nom: this.nom,
          detail: this.detail,
          provisionalAmount: this.provisionalAmount,
          realAmount: this.realAmount,
          estimatedHours: this.estimatedHours,
          realHours: this.realHours,
          tarifh: this.tarifh,
          events: this.eventId
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        }).then((response) => {
          if (response) {
            this.reloadEvent()
            this.Escape()
          }
        })
      }
    },
    Escape () {
      this.errors.fields = {
        budget_compte: '',
        budget_dnature: '',
        budget_nom: '',
        budget_detail: '',
        budget_provisional_amount: '',
        budget_real_amount: '',
        budget_estimated_hours: '',
        budget_real_amount_hours: '',
        budget_tarifh: 15.4
      }
      this.Clean()
      this.$emit('cancel')
    },
    Clean () {
      this.compte = 10
      this.dnature = ''
      this.nom = ''
      this.detail = ''
      this.provisionalAmount = ''
      this.realAmount = ''
      this.estimatedHours = ''
      this.realHours = ''
      this.tarifh = 15.4
    }
  }
}
</script>
