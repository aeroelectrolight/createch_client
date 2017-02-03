<style>
.loading {
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
  <div>
    <h2 class="ui block header">
      <i class="icon calendar outline"></i>
      <div class="content">
        Timesheet personnelle
      </div>
    </h2>
    <div class="ui four column centered grid">
      <div class="column">
        <div class="ui raised segment">
          <h4 class="ui dividing header">Selection des dates :</h4>
          <form class="ui small form">
            <div class="fields">
              <div class="field">
                <datepicker :value="datein" name="La date de début : " :timevisible="false" @onchange="newInDate"></datepicker>
              </div>
              <div class="field">
                <datepicker :value="dateout" name="La date de fin : " :timevisible="false" @onchange="newEndDate"></datepicker>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <div class="ui active centered inline loader"></div>
      <p>
        Chargement
      </p>
    </div>
    <div class="ui three column centered grid">
      <div class="column">
        <div class="ui middle aligned celled list">
          <div class="item" v-for="ligne in allTimesheetFormated">
            <div class="right floated content" v-if="ligne.direction !== 'startday' && ligne.direction !== 'stopday'">
              <a class="ui red basic circular label" @click="RemoveTimesheet(ligne.id)">
                <i class="icon large remove circle"></i>
                remove : {{ ligne.direction }} : {{ ligne.timeclock.format('LT') }}
              </a>
            </div>
            <div class="right floated content" v-else>
              <a class="ui orange basic circular label" @click="EditTimesheet(ligne.timeclock, ligne.id, ligne.direction)">
                <i class="icon large write"></i>
                edit : {{ ligne.direction }} : {{ ligne.timeclock.format('LT') }}
              </a>
            </div>
            <i class="large icon middle aligned green checked calendar" v-if="ligne.direction === 'startday'"></i>
            <i class="large middle aligned icon red delete calendar" v-if="ligne.direction === 'stopday'"></i>
            <div class="content">
              <div class="header">{{ ligne.direction }}</div>
              {{ ligne.timeclock.format('LLLL') }}
            </div>
          </div>
          <modal :display="modalDisplay" :modalDate="modalDate" @close="ClosedModal()" @recordNewdate="RecordNewdate"></modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Datepicker from 'src/components/datepicker/Datepicker.vue'
import Modal from 'src/components/Modal/ModalTime.vue'
import moment from 'moment'

export default {
  components: {
    datepicker: Datepicker,
    modal: Modal
  },
  data () {
    return {
      allTimesheet: [],
      datein: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      dateout: moment().add(1, 'days').format('YYYY-MM-DD'),
      toogle: {},
      modalDisplay: false,
      modalDate: moment(),
      modalId: '',
      worktime: {
        timeclock: moment().format('YYYY-MM-DD HH:mm'),
        direction: 'startday'
      },
      loading: false
    }
  },
  computed: {
    allTimesheetFormated () {
      let array = []
      array.push(...this.allTimesheet)
      array.forEach((e) => {
        let date = moment(e.timeclock)
        e.timeclock = date
      })
      return array
    }
  },
  watch: {
    datein () {
      this.SetAllTimesheet()
    },
    dateout () {
      this.SetAllTimesheet()
    }
  },
  methods: {
    newInDate (val) {
      this.datein = val
    },
    newEndDate (val) {
      this.dateout = val
    },
    SetAllTimesheet () {
      this.axios.get('/worktimes/date/' + this.datein + ',' + this.dateout).then((response) => {
        this.allTimesheet = response.data
        this.loading = false
      }).catch((err) => {
        console.log(err.response)
      })
    },
    RemoveTimesheet (val) {
      if (window.confirm('êtes vous certain de vouloir supprimer cette ligne ?')) {
        this.axios.delete('/worktimes/' + val).then((response) => {
          this.SetAllTimesheet()
        }).catch((err) => {
          console.log(err.response)
        })
      }
    },
    EditTimesheet (timeclock, id, direction) {
      this.modalDate = timeclock
      this.worktime.direction = direction
      this.modalId = id
      this.modalDisplay = true
    },
    ClosedModal () {
      this.modalDisplay = false
    },
    RecordNewdate (val) {
      this.modalDisplay = false
      this.loading = true
      this.worktime.timeclock = val.format('YYYY-MM-DD HH:mm')
      this.axios.put('/worktimes/' + this.modalId, this.worktime).then((response) => {
        this.SetAllTimesheet()
      }).catch((err) => {
        console.log(err.response)
      })
    }
  },
  mounted () {
    this.loading = true
    this.SetAllTimesheet()
  }
}
</script>
