<style lang="scss">

  $header-height: 100%;
  $day-size: 41px;
  $datepicker-color: rgb(212, 28, 182);

  //rgb(25, 177, 226);rgb(2, 52, 119)

  .datepicker{
    position: absolute;
    top: 100%;
    width: 315px;
    z-index: 5;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22);
    margin-top: 10px;
  }

  .datepicker__header{
    background-color: $datepicker-color;
    color: rgb(255, 255, 255);

    padding: 20px;
    height: $header-height;
  }

  .datepicker__year{
    position: relative;
    overflow: hidden;
    opacity: 0.7;
    height: 16px;
    margin-bottom: 10px;
    line-height: 16px;
  }

  .datepicker__date{
    position: relative;
    overflow: hidden;
    height: 32px;
    font-size: 32px;
    line-height: 32px;
  }
  .datepicker__week{
    font-size: 12px;
    line-height: 12px;
    color: rgba(0,0,0,0.8);
    padding: 0 14px;
  }
  .datepicker__weekday{
    float: left;
    width: $day-size;
    text-align: center;
  }
  .datepicker__days{
    position: relative;
    overflow: hidden;
    margin: 14px 14px 0;
    height: $day-size * 5;
    transition: height 0.3s;
    &.has-6-weeks{
      height: $day-size * 6;
    }
  }
  .datepicker__day{
    position: relative;
    width: $day-size;
    height: $day-size;
    float: left;
    text-align: center;
    line-height: $day-size;
    cursor: pointer;
  }
  .datepicker__day__effect{
    position: absolute;
    top: 2px;
    left: 2px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: $datepicker-color;
    transition: all 450ms cubic-bezier(0.23,1,0.24,1.02);
    transform: scale(0);
    opacity: 0;
  }
  .datepicker__day__text{
    position: relative;
  }
  .datepicker__day:hover{
    color: #ffffff;
    .datepicker__day__effect{
      transform: scale(1);
      opacity: 0.6;
    }
  }
  .datepicker__day.selected{
    color: #ffffff;
    .datepicker__day__effect{
      transform: scale(1);
      opacity: 1;
    }
  }
  .datepicker__controls{
    position: relative;
    height: 56px;
    line-height: 56px;
    text-align: center;
    button{
      position: relative;
      border: none;
      background-color: transparent;
      user-select: none;
      outline: none;
      cursor: pointer;
      width: 56px;
      height: 56px;
    }

    svg{
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.87);
      vertical-align: middle;
    }
  }
  .datepicker__month{
    position: absolute;
    height: 16px;
    line-height: 16px;
    overflow: hidden;
    right: 0;
    left: 0;
    bottom: 0;
    top: 20px;
  }
  .datepicker__next{
    float: right;
  }
  .datepicker__prev{
    float: left;
  }
  .datepicker__actions{
    text-align: right;
    padding: 8px;
  }
  .datepicker__actions button{
    border: none;
    background-color: transparent;
    display: inline-block;
    cursor: pointer;
    outline: none;
    color: $datepicker-color;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    min-width: 88px;
    text-align: center;
    line-height: 36px;
    transition: all 0.3s;
    &:hover{
      background-color: rgba(129, 142, 74, 0.30);
    }
  }
  .datepicker-slide-leave-active, .datepicker-slide-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translateY(0);
  }
  .datepicker-slide-leave, .datepicker-slide-enter{
    opacity: 0;
    transform: translateY(-15px);
  }
  @import "animation.scss";
  .time_container {
    margin-left: 45px;
    width: 60%;
  }
  .time_select {
    width: 100%;
  }

</style>

<template >
  <div class="datepicker" v-if="visible" @click.stop >
    <div class="datepicker__header">
      <div class="datepicker__year">
        {{year}}
      </div>
      <div class="datepicker__date">
        {{ date_formatted}}
      </div>
    </div>
    <div class="datepicker__controls">
      <div class="datepicker__month" >
        {{ month.getFormatted() }}
      </div>
      <button class="datepicker__next" @click.prevent="nextYear()"><i class="circular grey inverted angle double right icon"></i></button>
      <button class="datepicker__next" @click.prevent="nextMonth()"><i class="circular grey inverted angle right icon"></i></button>
      <button class="datepicker__prev" @click.prevent="prevYear()"><i class="circular grey inverted angle double left icon"></i></button>
      <button class="datepicker__prev" @click.prevent="prevMonth()"><i class="circular grey inverted angle left icon"></i></button>
    </div>
    <div class="datepicker__week">
      <div v-for="day in days" class="datepicker__weekday">
        {{ day }}
      </div>
    </div>
    <div class="datepicker__days">
      <transition-group :name="slideMonth" tag="div">
        <div v-for="month in [month]" :key="month" :class="slideMonth">
          <div class="datepicker__day" :style="{width: (month.getWeekStart() * 41) + 'px'}" >
          </div>
          <div class="datepicker__day" @click="selectDate(day)" v-for="day in month.getDays()" :class="{selected: isSelected(day)}">
            <span class="datepicker__day__effect"></span>
            <span class="datepicker__day__text">{{day.format('D')}}</span>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-if="timevisible" class="time_container">
      <label>Heure :
        <select v-model="hour" class="time_select" @click.stop >
          <option v-for="n in 24" :value="n">{{ n }}</option>
        </select>
      </label>
      <label>Minutes :
        <select v-model="minute" class="time_select">
          <option v-for="n in 60" :value="n">{{ n }}</option>
        </select>
      </label>
    </div>
    <div class="datepicker__actions">
      <button @click.prevent="cancel">Annuler</button>
      <button @click.prevent="submit">Ok</button>
    </div>
  </div>
</template>

<script>
import Month from '../../modules/month.js'
// import moment from 'moment'
export default {

  props: {
    date: {},
    visible: {type: Boolean, default: true},
    timevisible: {type: Boolean, default: true}
  },
  data () {
    return {
      days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      month: new Month(this.date.month(), this.date.year()),
      slideMonth: 'off',
      slideDate: 'off',
      hour: '',
      minute: '',
      date_local: this.date.clone()
    }
  },
  computed: {
    /*
    date_local () {
      return this.date
    },
    */
    year () {
      return this.date_local.format('YYYY')
    },
    date_formatted () {
      return this.date_local.format('dddd DD MMM')
    }
  },
  watch: {
    visible: function (val, oldVal) {
      if (val === false) {
        this.slideMonth = 'off'
        this.slideDate = 'off'
      }
    },
    hour: function (val, oldVal) {
      if (val !== oldVal) {
        this.date_local.hours(this.hour)
      }
    },
    minute: function (val, oldVal) {
      if (val !== oldVal) {
        this.date_local.minutes(this.minute)
      }
    }
  },
  methods: {
    isSelected: function (day) {
      return this.date_local.unix() === day.unix()
    },
    selectDate: function (day) {
      /*
      this.slideDate = 'slideh-next'
      if (day.isBefore(this.date)) {
        this.slideDate = 'slideh-prev'
      }
      */
      this.date_local = day.clone()
    },
    nextYear () {
      this.slideMonth = 'slidev-next'
      this.slideDate = 'slideh-next'
      let month = this.month.month
      let year = this.month.year + 1
      this.month = new Month(month, year)
    },
    prevYear () {
      this.slideMonth = 'slidev-prev'
      this.slideDate = 'slideh-prev'
      let month = this.month.month
      let year = this.month.year - 1
      this.month = new Month(month, year)
    },
    nextMonth () {
      this.slideMonth = 'slidev-next'
      this.slideDate = 'slideh-next'
      let month = this.month.month + 1
      let year = this.month.year
      if (month > 11) {
        year += 1
        month = 0
      }
      this.month = new Month(month, year)
    },
    prevMonth () {
      this.slideMonth = 'slidev-prev'
      this.slideDate = 'slideh-prev'
      let month = this.month.month - 1
      let year = this.month.year
      if (month < 0) {
        year -= 1
        month = 11
      }
      this.month = new Month(month, year)
    },
    submit: function () {
      this.$emit('change', this.date_local)
    },
    cancel: function () {
      this.$emit('cancel')
    }
  } // end of methods
}
</script>
