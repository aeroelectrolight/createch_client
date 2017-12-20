<style>
.ui.label {
  margin-bottom: 5px;
}
.uper {

}
</style>

<template>
  <div class="">
    <table class="ui orange table">
      <thead>
        <tr>
          <th>
            Verifications
          </th>
          <th>
            Maintenances
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="ui list">
              <div class="item" v-for="ligne in verifications">
                <div class="content">
                  <div :class="ligne.colorcss" class="ui pointing below label">Il reste {{ ligne.diff }} jours</div>
                  <div class="header">{{ ligne.designation }}</div>
                  {{ ligne.organism }}
                  {{ ligne.datevisitewarning }}
                </div>
                <div class="floating ui red label">22</div>
              </div>
            </div>
          </td>
          <td>
            test
          </td>
        </tr>
      </tbody>
    </table>
    <h1 class="ui header">Dashboard</h1>
    <svg></svg>
  </div>
</template>

<script type="text/javascript">
import * as d3 from 'd3'

import moment from 'moment'

var donnees = [8, 9, 15, 30, 10, 3]
var largeur = 960
var hauteur = 500

export default {
  computed: {
    couleurs () {
      return this.$store.getters.couleurs
    },
    verifications () {
      let array = this.$store.getters.verifications
      let newarray = []
      array.forEach((ligne) => {
        let colorcss = ''
        let datevisitewarning = moment(ligne.last_visite).add(ligne.periodicity, 'month')
        if (moment() > datevisitewarning.subtract(ligne.alert_delay, 'days')) {
          if (moment() < moment(ligne.last_visite).add(ligne.periodicity, 'month')) {
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
        }
      })
      return newarray
    }
  },
  mounted () {
    let scaleWidth = d3.scaleLinear().domain([0, 30]).range([0, largeur])
    // let scaleColor = d3.scaleLinear().domain([0, 30]).range(['white', this.couleurs[1].couleur])
    let axis = d3.axisBottom().ticks(5).scale(scaleWidth)
    let svg = d3.select('svg').attr('width', largeur).attr('height', hauteur)
    .append('g').attr('transform', 'translate(20, 0)')
    svg.selectAll('rect')
    .data(donnees)
    .enter()
    .append('rect')
    .attr('width', (i) => scaleWidth(i))
    .attr('height', 15)
    .attr('y', (i, j) => j * 20)
    .attr('fill', this.couleurs[1].couleur)
    svg.append('g').attr('transform', 'translate(0, 120)').call(axis)
  }
}
</script>
