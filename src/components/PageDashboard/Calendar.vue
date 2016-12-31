<style>
</style>

<template>
  <div class="">
    <h1 class="ui header">Calendar</h1>
    <full-calendar :events="fcEvents" ></full-calendar>
  </div>
</template>

<script type="text/javascript">
// problème avec la version de vue js et utilisation de _h en lieu et place de _c
// https://forum.vuejs.org/t/typeerror--vm--h-is-not-a-function-after-updating-vuejs-2-1-5-from-2-1/4032
export default {
  components: {
    fullCalendar: require('vue-fullcalendar')
  },
  data () {
    return {
      fcEvents: demoEvents
    }
  }
}

var demoEvents = [
  {
    title: 'Sunny Out of Office',
    start: '2016-08-25',
    end: '2017-07-27'
  }
]
</script>
