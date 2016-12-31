<style>

</style>
<template>
  <div class="ui olive card">
    <div class="content">
      <div class="header">Infos générale</div>
      <div class="meta">
        {{ pointeuse.datetime }}<br>
        Temps de travail : {{ pointeuse.worktime }}
      </div>
      <div class="description">
        Vérifications :
        <div class="ui circular red label" v-show="verifications.red">{{ verifications.red }}</div>
        <div class="ui circular orange label" v-show="verifications.orange">{{ verifications.orange }}</div>
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
        <div class="ui green button" v-if="startButton" @click="StartWorkTime">Start</div>
        <div class="ui basic red button" v-if="stopButton" @click="StopWorkTime('stop')">Stop</div>
        <div class="ui basic red button" v-if="stopButton" @click="StopWorkTime('stopday')">
          <i class="icon warning sign"></i>
          Stop day</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import moment from 'moment'

export default {
  data () {
    return {
      pointeuse: {
        difftime: 0,
        in: moment(),
        worktime: '',
        datetime: ''
      },
      timer: 0,
      startButton: false,
      stopButton: true,
      worktime: {
        timeclock: moment().format('YYYY-MM-DD HH:mm'),
        direction: 'startday'
      }
    }
  },
  computed: {
    verifications () {
      let array = this.$store.getters.verifications
      let alert = {
        red: 0,
        orange: 0
      }
      array.forEach((ligne) => {
        let datevisitewarning = moment(ligne.last_visite).add(ligne.periodicity, 'month')
        let datesub = datevisitewarning.clone()
        if (moment() < datevisitewarning && moment() > datesub.subtract(ligne.alert_delay, 'days')) {
          alert.orange += 1
        } else if (moment() > datevisitewarning) {
          alert.red += 1
        }
      })
      return alert
    }
  },
  methods: {
    RealTime () {
      this.timer = setInterval(() => {
        this.pointeuse.datetime = moment().format('LLLL')
        this.WorkTime()
      }, 10000)
    },
    WorkTime () {
      if (this.stopButton) {
        this.pointeuse.difftime += moment().diff(this.pointeuse.in)
      }
      this.pointeuse.in = moment()
      let duration = moment.duration(this.pointeuse.difftime)
      let min = duration.minutes()
      let hours = duration.hours()
      this.pointeuse.worktime = hours + ' hrs ' + min + ' min'
    },
    StopWorkTime (dir) {
      this.worktime.timeclock = moment().format('YYYY-MM-DD HH:mm')
      this.worktime.direction = dir
      this.$http.post('/worktimes', this.worktime)
      this.startButton = true
      this.stopButton = false
    },
    StartWorkTime () {
      this.worktime.timeclock = moment().format('YYYY-MM-DD HH:mm')
      this.worktime.direction = 'start'
      this.$http.post('/worktimes', this.worktime)
      this.startButton = false
      this.stopButton = true
    }
  },
  mounted () {
    this.RealTime()
    this.pointeuse.datetime = moment().format('LLLL')
    this.WorkTime()
    // this.$http.post('/worktimes', this.worktime)
  }
}
</script>
