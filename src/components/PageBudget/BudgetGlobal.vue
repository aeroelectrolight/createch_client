<style>
</style>

<template>
  <div>
    <h2 class="ui block header">
      <i class="icon bar chart"></i>
      <div class="content">
        Budget Global
      </div>
    </h2>
    <form class="ui form" action="">
      <div class="two fields">
        <div class="field">
          <datepicker :value="dateDebut" name="La date de début : " :timevisible="false" @onchange="newInDate"></datepicker>
        </div>
        <div class="field">
          <datepicker :value="dateFin" name="La date de fin : " :timevisible="false" @onchange="newEndDate"></datepicker>
        </div>
      </div>
      <button type="button" name="button" class="ui olive button" @click="CalculBudget">
        <i class="icon share"></i>Load
      </button>
      <button type="button" name="button" class="ui olive button" @click="CreatePDF">
        <i class="icon file pdf outline"></i>Create PDF
      </button>
      <table class="ui sortable selectable celled structured table" id="topdf">
        <thead>
          <tr class="center aligned">
            <th rowspan="2" class="sorted" :class="sortSpectacle" @click="SortEvents">spectacle</th>
            <th rowspan="2" class="sorted" :class="sortCompte" @click="SortCount">Cpte</th>
            <th rowspan="2">Nature</th>
            <th colspan="2">Frais de régie</th>
            <th colspan="2">Loc</th>
            <th colspan="2">Intermittant</th>
          </tr>
          <tr>
            <th>Prévisionnel</th>
            <th>Réel</th>
            <th>Prévisionnel</th>
            <th>Réel</th>
            <th>Prévisionnel</th>
            <th>Réel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligne in budgetTrie">
            <td class="event-title">{{ ligne.events.title }}</td>
            <td class="event-compte">{{ ligne.compte }}</td>
            <td>{{ ligne.nature }}</td>
            <td>{{ ligne.nature === 'Achat' ? ligne.provisional_amount : '' }}</td>
            <td>{{ ligne.nature === 'Achat' ? ligne.real_amount : '' }}</td>
            <td>{{ ligne.nature === 'Location' ? ligne.provisional_amount : '' }}</td>
            <td>{{ ligne.nature === 'Location' ? ligne.real_amount : '' }}</td>
            <td>{{ ligne.nature === 'Techniciens' ? ligne.provisional_amount : '' }}</td>
            <td>{{ ligne.nature === 'Techniciens' ? ligne.real_amount : '' }}</td>
          </tr>
        </tbody>
        <tfoot class="full-width">
          <tr>
            <th>
              <h4>Total partiel :</h4>
            </th>
            <th colspan="2"></th>
            <th>frais prévi : {{ totalEstimAchat.toFixed(2) }}</th>
            <th>frais réel : {{ totalRealAchat.toFixed(2) }}</th>
            <th>Loc prévi : {{ totalEstimLoc.toFixed(2) }}</th>
            <th>Loc réel : {{ totalRealLoc.toFixed(2) }}</th>
            <th>Inter prévi : {{ totalEstimTech.toFixed(2) }}</th>
            <th>Inter réel : {{ totalRealTech.toFixed(2) }}</th>
          </tr>
          <tr>
            <th><h2>Total :</h2></th>
            <th colspan="4"></th>
            <th colspan="2">
              <div class="ui blue label float-right">
                Total Prévisionnel :
                {{ totalEstimated }}
                <i class="euro icon"></i>
              </div>
            </th>
            <th colspan="2">
              <div class="ui blue label float-right">
                Total Réel :
                {{ totalReal }}
                <i class="euro icon"></i>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </form>
  </div>
</template>

<script type="text/javascript">
import DatePicker from 'src/components/datepicker/Datepicker.vue'
import moment from 'moment'
import SortTable from 'src/modules/tablesort.js'
import $ from 'jquery'
import jsPDF from 'jspdf'
global.html2canvas = require('html2canvas')

export default {
  components: {
    datepicker: DatePicker
  },
  data () {
    return {
      dateDebut: moment().format('YYYY-MM-DD'),
      dateFin: moment().format('YYYY-MM-DD'),
      budgetTrie: [],
      totalEstimAchat: 0,
      totalEstimLoc: 0,
      totalEstimTech: 0,
      totalRealAchat: 0,
      totalRealLoc: 0,
      totalRealTech: 0,
      sortCompte: 'descending',
      sortSpectacle: 'descending'
    }
  },
  computed: {
    totalEstimated () {
      let total = this.totalEstimAchat + this.totalEstimLoc + this.totalEstimTech
      return total.toFixed(2)
    },
    totalReal () {
      let total = this.totalRealAchat + this.totalRealLoc + this.totalRealTech
      return total.toFixed(2)
    }
  },
  methods: {
    newInDate (val) {
      this.dateDebut = val
    },
    newEndDate (val) {
      this.dateFin = val
    },
    CalculBudget () {
      this.budgetTrie = []
      this.totalAchat = this.totalLoc = this.totalTech = 0
      this.$store.getters.budgets.forEach((budget) => {
        if (budget.events.start_datetime >= this.dateDebut && budget.events.start_datetime <= this.dateFin) {
          this.budgetTrie.push(budget)
          if (budget.nature === 'Achat') {
            this.totalEstimAchat += budget.provisional_amount
            this.totalRealAchat += budget.real_amount
          } else if (budget.nature === 'Location') {
            this.totalEstimLoc += budget.provisional_amount
            this.totalRealLoc += budget.real_amount
          } else {
            this.totalEstimTech += budget.provisional_amount
            this.totalRealTech += budget.real_amount
          }
        }
      })
    },
    SortEvents () {
      if (this.sortSpectacle !== 'descending') {
        this.sortSpectacle = 'descending'
        SortTable(true, 'event-title', 'topdf')
      } else {
        this.sortSpectacle = 'ascending'
        SortTable(false, 'event-title', 'topdf')
      }
    },
    SortCount () {
      if (this.sortCompte !== 'descending') {
        this.sortCompte = 'descending'
        SortTable(true, 'event-compte', 'topdf')
      } else {
        this.sortCompte = 'ascending'
        SortTable(false, 'event-compte', 'topdf')
      }
    },
    CreatePDF () {
      var doc = jsPDF()
      doc.addHTML($('#topdf')[0], function () {
        doc.save('a4.pdf')
      })
    }
  }
}
</script>
