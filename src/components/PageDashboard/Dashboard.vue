<style>
</style>

<template>
  <div class="">
    <h1 class="ui header">Dashboard</h1>
    <svg></svg>
  </div>
</template>

<script type="text/javascript">
import * as d3 from 'd3'

var donnees = [8, 9, 15, 30, 10, 3]
var largeur = 960
var hauteur = 500

export default {
  computed: {
    couleurs () {
      return this.$store.getters.couleurs
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
