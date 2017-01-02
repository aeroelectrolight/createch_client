<style>
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
    <div class="ui three column centered grid">
      <div class="column">
        <div class="ui middle aligned celled list">
          <div class="item" v-for="ligne in allTimesheetFormated">
            <div class="right floated content" v-if="ligne.direction !== 'startday' && ligne.direction !== 'stopday'">
              <a class="ui red basic circular label" @click="RemoveTimesheet(ligne.id)">
                <i class="icon large remove circle"></i>
                remove : {{ ligne.direction }}
              </a>
            </div>
            <i class="large icon middle aligned green checked calendar" v-if="ligne.direction === 'startday'"></i>
            <i class="large middle aligned icon red delete calendar" v-if="ligne.direction === 'stopday'"></i>
            <div class="content">
              <div class="header">{{ ligne.direction }}</div>
              {{ ligne.timeclock }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Datepicker from 'src/components/datepicker/Datepicker.vue'
import moment from 'moment'

export default {
  components: {
    datepicker: Datepicker
  },
  data () {
    return {
      allTimesheet: [],
      datein: moment().subtract(10, 'days').format('YYYY-MM-DD'),
      dateout: moment().add(1, 'days').format('YYYY-MM-DD')
    }
  },
  computed: {
    allTimesheetFormated () {
      let array = []
      array.push(...this.allTimesheet)
      array.forEach((e) => {
        let date = moment(e.timeclock)
        e.timeclock = date.format('LLLL')
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
      }).catch((err) => {
        console.log(err.response)
      })
    },
    RemoveTimesheet (val) {
      this.axios.delete('/worktimes/' + val).then((response) => {
        this.SetAllTimesheet()
      }).catch((err) => {
        console.log(err.response)
      })
    }
  },
  mounted () {
    this.SetAllTimesheet()
  }
}
</script>
