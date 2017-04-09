<style lang="scss">
.marge-left {
  margin-left: 10px;
}
.createch-center {
  text-align: center;
}
</style>


<template >
  <div class="">
    <h2 class="ui block header">
      <i class="icon euro"></i>
      <div class="content">Budget par spectacle</div>
    </h2>
    <div class="ui raised segment">
      <div class="ui centered grid">
        <div class="six wide column">
          <h4 class="ui dividing header">Selection des dates de tri :</h4>
          <form class="ui small form">
            <div class="fields">
              <div class="six wide field">
                <datepicker :value="datein" name="La date de début : " :timevisible="false" @onchange="newInDate"></datepicker>
              </div>
              <div class="six wide field">
                <datepicker :value="dateout" name="La date de fin : " :timevisible="false" @onchange="newEndDate"></datepicker>
              </div>
            </div>
          </form>
        </div>
        <div class="four wide column">
          <form class="ui form">
            <div class="inline field">
              <label for="spectacle">Selection du Spectacle : </label>
              <select class="ui select" name="spectacle" v-model="eventId">
                <option v-for="spectacle in events" :value="spectacle.id">{{ spectacle.title }}</option>
              </select>
            </div>
          </form>
        </div>
        <div class="five wide createch-center column">
          <button type="button" class="ui mini blue button" @click="ShowFormEvent(0)">
            <i class="icon add square"></i>
            Add spectacle</button>
          <button type="button" class="ui mini orange button" @click="ShowFormEvent(eventId)" v-if="eventId !== 0">
            <i class="icon write"></i>
            Edit</button>
          <button type="button" class="ui mini red button" @click="DeleteEvent(eventId)" v-if="eventId !== 0">
            <i class="icon remove circle"></i>
            Delete</button>
        </div>
      </div>
    </div>
    <div class="ui olive segment" v-if="eventIndex !== -1">
      <div class="ui grid">
        <div class="twelve wide column">
          <h2>Nom du Spectacle : {{ events[eventIndex].title }}</h2>
        </div>
        <div class="four wide column">
          <div class="ui basic label float-right marge-right">
            Coût technique total prévisionnel : {{ provisionalTotal }}
            <i class="euro icon"></i>
          </div>
        </div>
        <div class="twelve wide column">
          <span><strong>Date : </strong>Le {{ dateFormatted }}</span>
          <span class="marge-left"><strong>Lieu : </strong>{{ events[eventIndex].lieu.title }}</span>
          <span class="marge-left"><strong>Ville : </strong>{{ events[eventIndex].lieu.ville }}</span>
        </div>
        <div class="four wide column">
          <div class="ui basic label float-right">
            Coût technique total réel : {{ realTotal }}
            <i class="euro icon"></i>
          </div>
        </div>
      </div>
      <div class="ui divided selection list">
        <a class="item" @click="ShowFormBudget('Location')">
          <div class="ui teal horizontal label">Ajout</div>
          Location
          <div class="ui horizontal label float-right">Coût location
            <i class="icon pointing right"></i>
             prévisionnel : {{ totalEstimLoc }}
            <i class="euro icon"></i>
            et réel : {{ totalRealLoc }}
            <i class="euro icon"></i>
          </div>
        </a>
        <a class="item" @click="ShowFormBudget('Achat')">
          <div class="ui yellow horizontal label">Ajout</div>
          Achat
          <div class="ui horizontal label float-right">Coût achat
            <i class="icon pointing right"></i>
            prévisionnel : {{ totalEstimAchat }}
            <i class="euro icon"></i>
            et réel : {{ totalRealAchat }}
            <i class="euro icon"></i>
          </div>
        </a>
        <a class="item" @click="ShowFormBudget('Techniciens')">
          <div class="ui grey horizontal label">Ajout</div>
          Techniciens
          <div class="ui horizontal label float-right">Coût techniciens
            <i class="icon pointing right"></i>
            prévisionnel : {{ totalEstimTech }}
            <i class="euro icon"></i>
            et réel : {{ totalRealTech }}
            <i class="euro icon"></i>
          </div>
        </a>
      </div>
      <formbudget :budgetId="budgetId" :eventId="eventId" :nature="nature" :isVisible="formbudgetvisible" @cancel="HideFormBudget"></formbudget>
      <!-- composant form techniciens -->
      <!-- composant form achat -->
      <table class="ui selectable celled structured table">
        <thead>
          <tr class="center aligned">
            <th>Cpte</th>
            <th>Nature</th>
            <th>nom</th>
            <th>Detail</th>
            <th>Montant prévisionnel</th>
            <th>Montant réel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligne in  events[eventIndex].budgets">
            <td>{{ ligne.compte }}</td>
            <td>{{ ligne.nature }}</td>
            <td>{{ ligne.nom }}</td>
            <td>{{ ligne.detail }}</td>
            <td>{{ ligne.provisional_amount }}</td>
            <td>{{ ligne.real_amount }}</td>
            <td class="center aligned">
              <a class="ui orange basic label" @click="EditBudget(ligne.id)">
                <i class="write icon"></i>
                edit
              </a>
              <a class="ui red basic label" @click="DeleteBudget(ligne.id)">
                <i class="remove circle icon"></i>
                supr
              </a>
            </td>
          </tr>
        </tbody>
        <tfoot class="full-width">
          <tr>
            <th><h2>Total :</h2></th>
            <th colspan="3"></th>
            <th class="center aligned">
              <div class="ui blue label">
                Prévisionnel :{{ provisionalTotal }}
                <i class="euro icon"></i>
              </div>
            </th>
            <th class="center aligned">
              <div class="ui blue label">
                Réel : {{ realTotal }}
                <i class="euro icon"></i>
              </div>
            </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <formevent :eventId="formeventid" :visible="formeventvisible" @cancel="HideFormEvent"></formevent>
  </div>
</template>


<script type="text/babel">
import DatepickerComponent from 'src/components/datepicker/Datepicker.vue'
import FormBudget from 'src/components/PageBudget/BudgetSpectacle/FormBudget.vue'
import FormEventComponent from 'src/components/PageBudget/BudgetSpectacle/FormEvent.vue'
import Colorpicker from 'src/components/colorpicker/Colorpicker.vue'
import moment from 'moment'
import { mapActions } from 'vuex'

/*
eslint-disable no-new
*/

export default {
  components: {
    datepicker: DatepickerComponent,
    formbudget: FormBudget,
    formevent: FormEventComponent,
    colorpicker: Colorpicker
  },
  data: function () {
    return {
      formeventid: 0,
      colors: defaultProps,
      formbudgetvisible: false,
      formeventvisible: false,
      nature: '',
      budgetId: 0,
      eventId: 0,
      datein: moment().format('YYYY-MM-DD'),
      dateout: moment().add(1, 'year').format('YYYY-MM-DD')
    }
  },
  computed: {
    events () {
      return this.$store.getters.events.filter((e) => e.start_datetime >= this.datein && e.start_datetime <= this.dateout)
    },
    eventIndex () {
      return this.events.findIndex((c) => c.id === this.eventId)
    },
    dateFormatted () {
      let dateevent = moment(this.events[this.eventIndex].start_datetime)
      return dateevent.format('DD/MM/YYYY à HH:mm')
    },
    provisionalTotal () {
      let total = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        total += ligne.provisional_amount
        return total
      })
      return total.toFixed(2)
    },
    realTotal () {
      let total = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        total += ligne.real_amount
        return total
      })
      return total.toFixed(2)
    },
    totalEstimLoc () {
      let totalLoc = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Location') {
          totalLoc += ligne.provisional_amount
        }
        return totalLoc
      })
      return totalLoc.toFixed(2)
    },
    totalEstimAchat () {
      let totalAchat = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Achat') {
          totalAchat += ligne.provisional_amount
        }
        return totalAchat
      })
      return totalAchat.toFixed(2)
    },
    totalEstimTech () {
      let totalTech = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Techniciens') {
          totalTech += ligne.provisional_amount
        }
        return totalTech
      })
      return totalTech.toFixed(2)
    },
    totalRealLoc () {
      let totalLoc = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Location') {
          totalLoc += ligne.real_amount
        }
        return totalLoc
      })
      return totalLoc.toFixed(2)
    },
    totalRealAchat () {
      let totalAchat = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Achat') {
          totalAchat += ligne.real_amount
        }
        return totalAchat
      })
      return totalAchat.toFixed(2)
    },
    totalRealTech () {
      let totalTech = 0
      this.events[this.eventIndex].budgets.forEach(function (ligne) {
        if (ligne.nature === 'Techniciens') {
          totalTech += ligne.real_amount
        }
        return totalTech
      })
      return totalTech.toFixed(2)
    }
  },
  watch: {
    datein (val) {
      this.dateout = moment(val).add(1, 'year').format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions([
      'deleteBudget',
      'reloadEvent'
    ]),
    newInDate (val) {
      this.datein = val
    },
    newEndDate (val) {
      this.dateout = val
    },
    ShowFormBudget (val) {
      this.nature = val
      this.budgetId = 0
      this.formbudgetvisible = true
    },
    HideFormBudget () {
      this.budgetId = 0
      this.formbudgetvisible = false
    },
    ShowFormEvent (val) {
      this.formeventid = val
      this.formeventvisible = true
    },
    HideFormEvent () {
      this.formeventvisible = false
    },
    EditBudget (id) {
      this.budgetId = id
      this.formbudgetvisible = true
    },
    DeleteBudget (id) {
      this.deleteBudget(id)
      this.reloadEvent()
    }
  }
}

var defaultProps = {
  hex: '#06E7FF',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}

</script>
