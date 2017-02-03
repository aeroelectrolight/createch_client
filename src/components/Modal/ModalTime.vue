<!-- template for the modal component -->
<style media="screen">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

<template>
  <div>
    <transition name="modal">
      <div class="modal-mask" v-show="display">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <h3>Modification de l'heure</h3>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="ui input">
                  <input type="text" name="hour" v-model="hours">
                </div>
                <div class="ui input">
                  <input type="text" name="second" v-model="minutes">
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="ui green inverted button" @click="$emit('recordNewdate', returnDate)">
                  <i class="check icon"></i>
                  Ok
                </button>
                <button class="ui orange inverted button" @click="$emit('close')">
                  <i class="remove circle icon"></i>
                  Undo
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'

export default {
  props: {
    display: {type: Boolean, default: false},
    modalDate: {}
  },
  data () {
    return {
      hours: moment().format('H'),
      minutes: moment().format('m')
    }
  },
  watch: {
    modalDate () {
      this.hours = this.modalDate.format('H')
      this.minutes = this.modalDate.format('m')
    }
  },
  computed: {
    returnDate () {
      let date = moment(this.modalDate)
      date.minutes(this.minutes)
      date.hours(this.hours)
      return date
    }
  }
}
</script>
