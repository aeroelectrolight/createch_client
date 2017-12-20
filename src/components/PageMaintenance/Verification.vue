<style>
</style>

<template>
  <div>
    <h2 class="ui block header">
      <i class="icon retweet"></i>
      <div class="content">Vérification</div>
    </h2>
    <verification :verificationId="verificationId" ></verification>
    <table class="ui celled table">
      <thead>
        <tr class="center aligned">
          <th>Désignation</th>
          <th>Dernière visite</th>
          <th>Prochaine visite</th>
          <th>Date visite maxi</th>
          <th>Organisme vérificateur</th>
          <th>Périodicité en mois</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ligne in verifications">
          <td>
            <div :class="ligne.colorcss" class="ui ribbon label">Il reste {{ ligne.diff }} jours</div>
            {{ ligne.designation }}
          </td>
          <td>{{ ligne.lastVisite }}</td>
          <td><i v-if="ligne.nextVisite != ligne.datevisitewarning"class="orange large checked calendar icon"></i>{{ ligne.nextVisite }}</td>
          <td>{{ ligne.datevisitewarning }}</td>
          <td>{{ ligne.organism }}</td>
          <td>{{ ligne.periodicity }}</td>
          <td class="center aligned">
            <div>
              <a class="ui orange basic label" @click="EditVerification(ligne.id)">
                <i class="write icon"></i>
                edit
              </a>
              <a class="ui red basic label" @click="DeleteVerification(ligne.id)">
                <i class="remove circle icon"></i>
                supr
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import verificationFormComponent from './Forms/VerificationForm.vue'
import moment from 'moment'
// import MessageBox from 'vue-msgbox'
import { mapActions } from 'vuex'
// require('vue-msgbox/lib/vue-msgbox.css')

export default {
  data () {
    return {
      verificationId: 0
    }
  },
  computed: {
    verifications () {
      let array = this.$store.getters.verifications
      let newarray = []
      array.forEach((ligne) => {
        let colorcss = ''
        let datevisitewarning = moment(ligne.last_visite).add(ligne.periodicity, 'month')
        if (moment() < datevisitewarning.subtract(ligne.alert_delay, 'days')) {
          colorcss = 'green'
        } else if (moment() < moment(ligne.last_visite).add(ligne.periodicity, 'month')) {
          colorcss = 'orange'
        } else {
          colorcss = 'red'
        }
        let diff = moment(ligne.last_visite).add(ligne.periodicity, 'month').diff(moment(), 'days')
        ligne.lastVisite = moment(ligne.last_visite).format('L')
        ligne.datevisitewarning = moment(ligne.last_visite).add(ligne.periodicity, 'month').format('L')
        ligne.nextVisite = moment(ligne.next_visite).format('L')
        ligne.colorcss = colorcss
        ligne.diff = diff
        newarray.push(ligne)
      })
      return newarray
    }
  },
  components: {
    verification: verificationFormComponent
  },
  methods: {
    ...mapActions([
      'deleteVerification'
    ]),
    EditVerification (val) {
      this.verificationId = val
    },
    DeleteVerification (val) {
      // MessageBox.confirm('message').then(function (action) {
      // })
      if (window.confirm('êtes-vous certain de vouloir supprimer cette vérification ?')) {
        this.deleteVerification(val)
      }
    }
  }
}
</script>
