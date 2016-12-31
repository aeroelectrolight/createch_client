<style lang="scss">
</style>

<template>
  <div class="ui red segment" v-if="visible">
    <h2>Formulaire Spectacle</h2>
    <form class="ui form">
      <div class="field">
        <label for="title">Nom du spectacle :</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="two fields">
        <div class="field">
          <label>Selection de la couleur associée :</label>
          <select v-model="bgColor">
            <option v-for="couleur in couleurs" :value="couleur.id">{{ couleur.title }}</option>
          </select>
        </div>
        <div class="field">
          <color-picker  name="Couleur de ligne: " :colors="fgColor" @change-color="ChangeFg"></color-picker>
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <datepicker :value="startDatetime" name="La date de début : " :timevisible="true" @onchange="NewStartDate"></datepicker>
        </div>
        <div class="field">
          <datepicker :value="endDatetime" name="La date de fin :" :timevisible="true" @onchange="NewEndDate"></datepicker>
        </div>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" v-model="allDay">
          <label>Jour entier : </label>
        </div>
      </div>
      <div class="field">
        <label>Selection du lieu de l'évènement :</label>
        <select v-model="lieu">
          <option v-for="place in lieux" :value="place.id">{{ place.title }}</option>
        </select>
      </div>
      <div class="sixteen wide column">
        <button type="button" name="ajout" class="ui blue button" @click="EventSubmit">Ajout</button>
        <button type="button" name="annuler" class="ui orange button" @click="Escape" >Annuler</button>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import DatepickerComponent from 'src/components/datepicker/Datepicker.vue'
import ColorPickerComponent from 'src/components/colorpicker/Colorpicker.vue'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  components: {
    datepicker: DatepickerComponent,
    colorPicker: ColorPickerComponent
  },
  props: {
    visible: { type: Boolean, default: true },
    eventId: { type: Number, default: 0 }
  },
  data () {
    return {
      title: '',
      bgColor: '',
      fgColor: defaultProps,
      startDatetime: moment().format('YYYY-MM-DD HH:mm'),
      endDatetime: moment().format('YYYY-MM-DD HH:mm'),
      allDay: true,
      lieu: '',
      errors: {
        fields: {
          title: '',
          bgcolor: '',
          fgcolor: '',
          startDatetime: '',
          endDatetime: '',
          allDay: '',
          lieu: ''
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getCouleurs')
    this.$store.dispatch('getLieux')
  },
  computed: {
    couleurs () {
      return this.$store.getters.couleurs
    },
    lieux () {
      return this.$store.getters.lieux
    },
    events () {
      let index = this.$store.getters.events.findIndex((c) => c.id === this.eventId)
      return this.$store.getters.events[index]
    }
  },
  watch: {
    eventId (val) {
      if (val !== 0) {
        this.title = this.events.title
        this.bgColor = this.events.bg_color.id
        this.startDatetime = moment(this.events.start_datetime).format('YYYY-MM-DD HH:mm')
        this.endDatetime = moment(this.events.end_datetime).format('YYYY-MM-DD HH:mm')
        this.allDay = this.events.all_day
        this.lieu = this.events.lieu.id
      }
    }
  },
  methods: {
    ...mapActions([
      'addEvent',
      'modifyEvent'
    ]),
    ChangeFg (val) {
      this.fgColor = val
    },
    NewStartDate (val) {
      this.startDatetime = val
    },
    NewEndDate (val) {
      this.endDatetime = val
    },
    EventSubmit () {
      if (this.eventId !== 0) {
        this.modifyEvent({
          id: this.eventId,
          event: {
            title: this.title,
            bgColor: this.bgColor,
            // fgColor: this.fgColor.hex,
            startDatetime: this.startDatetime,
            endDatetime: this.endDatetime,
            allDay: this.allDay,
            lieu: this.lieu
          }
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.Escape()
          }
        })
      } else {
        this.addEvent({
          title: this.title,
          bgColor: this.bgColor,
          // fgColor: this.fgColor.hex,
          startDatetime: this.startDatetime,
          endDatetime: this.endDatetime,
          allDay: this.allDay,
          lieu: this.lieu
        }).catch((err) => {
          console.log(err)
          this.errors = err.data
        }).then((response) => {
          if (response) {
            this.Escape()
          }
        })
      }
    },
    Escape () {
      this.$emit('cancel')
      this.Clean()
    },
    Clean () {
      this.title = ''
      this.bgColor = ''
      this.fgColor = defaultProps
      this.startDatetime = moment().format('YYYY-MM-DD HH:mm')
      this.endDatetime = moment().format('YYYY-MM-DD HH:mm')
      this.allDay = true
      this.lieu = ''
      this.errors.fields = {
        title: '',
        bgcolor: '',
        fgcolor: '',
        startDatetime: '',
        endDatetime: '',
        allDay: '',
        lieu: ''
      }
    }
  }
}

var defaultProps = {
  hex: '#FF0000',
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
