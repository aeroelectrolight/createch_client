<style>
.createch-cursor {
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="ui grid">
      <div class="eight wide column">
        <h2 class="ui block header">
          <i class="icon industry"></i>
          <div class="content">
            Batîment
          </div>
        </h2>
      </div>
      <div class="eight wide column">
        <h2 class="ui block header">
          <i class="icon configure"></i>
          <div class="content">
            Matériel
          </div>
        </h2>
      </div>
      <div class="sixteen wide column">
        <maintenance-form :maintenanceId="maintenanceId" @clearId="clearId"></maintenance-form>
      </div>
      <div class="eight wide column">
        <table class="ui small celled table">
          <thead>
            <tr>
              <th colspan="6" class="center"><i class="icon industry"></i>Batîment</th>
            </tr>
            <tr>
              <th>Titre</th>
              <th>D/Origine</th>
              <th>D/visite</th>
              <th>D/maintenance</th>
              <th>D/résolu</th>
              <th>Descrition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in maintenances" v-if="ligne.category === 'batiment'" :class="ligne.class_positive">
              <td v-html="ligne.title_html" @click="UdpdateId(ligne.id)" class="createch-cursor"></td>
              <td>{{ ligne.date_origin }}</td>
              <td :class="ligne.class_date_visit">{{ ligne.date_visit }}</td>
              <td :class="ligne.class_date_work">{{ ligne.date_work }}</td>
              <td :class="ligne.class_date_resolved">{{ ligne.date_resolved}}</td>
              <td>{{ ligne.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="eight wide column">
        <table class="ui small celled table">
          <thead>
            <tr>
              <th colspan="6" class="center"><i class="icon configure"></i>Matériel</th>
            </tr>
            <tr>
              <th>Titre</th>
              <th>D/problème</th>
              <th>D/visite</th>
              <th>D/maintenance</th>
              <th>D/résolu</th>
              <th>Descrition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in maintenances" v-if="ligne.category === 'materiel'" :class="ligne.class_positive">
              <td v-html="ligne.title_html" @click="UdpdateId(ligne.id)" class="createch-cursor"></td>
              <td>{{ ligne.date_origin }}</td>
              <td :class="ligne.class_date_visit">{{ ligne.date_visit }}</td>
              <td :class="ligne.class_date_work">{{ ligne.date_work }}</td>
              <td :class="ligne.class_date_resolved">{{ ligne.date_resolved}}</td>
              <td>{{ ligne.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import maintenanceComponent from 'src/components/PageMaintenance/Forms/MaintenanceForm.vue'
import moment from 'moment'

export default {
  components: {
    maintenanceForm: maintenanceComponent
  },
  data () {
    return {
      maintenanceId: 0
    }
  },
  computed: {
    maintenances () {
      let all = this.$store.getters.maintenances
      all.forEach((e) => {
        if (moment(e.date_resolved) <= moment(e.date_origin)) {
          let dateOrigin = moment(e.date_origin)
          e.title_html = '<a href="#form_maintenance">' + e.title + '</a>'
          moment(e.date_visit) <= dateOrigin ? e.class_date_visit = 'warning' : ''
          moment(e.date_work) <= dateOrigin ? e.class_date_work = 'warning' : ''
          e.class_date_resolved = 'error'
        } else {
          e.title_html = '<i class="large green checkmark icon"></i>'
          e.class_positive = 'positive'
        }
        e.date_origin = moment(e.date_origin).format('DD/MM/YYYY')
        e.date_visit = moment(e.date_visit).format('DD/MM/YYYY')
        e.date_work = moment(e.date_work).format('DD/MM/YYYY')
        e.date_resolved = moment(e.date_resolved).format('DD/MM/YYYY')
      })
      return all
    }
  },
  methods: {
    UdpdateId (val) {
      this.maintenanceId = val
    },
    clearId () {
      this.maintenanceId = 0
    }
  }
}
</script>
