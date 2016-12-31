import moment from 'moment'
import 'moment-range'

export default class Month {
  constructor (month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
    this.month = month
    this.year = year
  }

  getWeeks () {
    if (this.end.week() < this.start.week()) {
      return this.end.week() - this.start.week() + 53
    } else {
      return this.end.week() - this.start.week() + 1
    }
  }

  getWeekStart () {
    return this.start.weekday()
  }
  getDays () {
    return moment.range(this.start, this.end).toArray('day')
  }
  getFormatted () {
    return this.start.format('MMMM YYYY')
  }
}
