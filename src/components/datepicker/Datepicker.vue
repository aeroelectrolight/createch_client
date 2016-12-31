<style lang="scss">
  .datepicker__container{
    position: relative;
  }
</style>

<template >
  <div class="datepicker__container">
    <div class="field">
      <label>{{name}}</label>
      <input type="text" readonly="true" :value="date_formatted" @click="showDatepicker">
    </div>
    <datepicker-agenda :date="date" :visible="isVisible" :timevisible="timevisible" @change="selectDate" @cancel="hideDatepicker"></datepicker-agenda>
  </div>
</template>

<script>
import moment from 'moment'
import DatepickerAgendaComponent from './DatepickerAgenda'

moment.locale('fr')

export default {
  components: {
    'datepicker-agenda': DatepickerAgendaComponent
  },
  props: {
    value: {type: String, required: true},
    format: {type: String, default: 'YYYY-MM-DD HH:mm'},
    name: {type: String},
    timevisible: {type: Boolean, default: true}
  },
  watch: {
    value: function (val, oldval) {
      if (val !== oldval) {
        this.date = moment(this.value, this.format)
      }
    }
  },
  data: function () {
    return {
      date: moment(this.value, this.format),
      isVisible: false
    }
  },
  methods: {
    selectDate: function (date) {
      this.date = date
      this.$emit('onchange', this.date_raw)
      this.hideDatepicker()
    },
    showDatepicker () {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideDatepicker))
    },
    hideDatepicker () {
      this.isVisible = false
      document.removeEventListener('click', this.hideDatepicker)
    }
  },
  computed: {
    date_formatted: function () {
      if (this.timevisible) {
        return this.date.format('DD/MM/YYYY HH:mm')
      } else {
        return this.date.format('DD/MM/YYYY')
      }
    },
    date_raw: function () {
      if (this.timevisible) {
        return this.date.format('YYYY-MM-DD HH:mm')
      } else {
        return this.date.format('YYYY-MM-DD')
      }
    }
  }
}
</script>
