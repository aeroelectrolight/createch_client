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
    <div class="ui celled list">
      <div class="item" v-for="ligne in allTimesheetFormated">
        <i class="large middle aligned icon green checked calendar" v-if="ligne.direction === 'startday'"></i>
        <i class="large middle aligned icon red delete calendar" v-if="ligne.direction === 'stopday'"></i>
        <div class="content">
          <div class="header">{{ ligne.direction }}</div>
          {{ ligne.timeclock }}
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
      this.allTimesheet.forEach((e) => {
        let date = moment(e.timeclock).format('LLLL')
        e.timeclock = date
        array.push(e)
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
      this.$http.get('/worktimes/date/' + this.datein + ',' + this.dateout).then((response) => {
        this.allTimesheet = response.data
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.SetAllTimesheet()
  }
}
</script>
