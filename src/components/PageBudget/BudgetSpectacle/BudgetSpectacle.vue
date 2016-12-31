<style lang="scss">
@import 'src/settings';
@import '~foundation-sites/scss/foundation';

.budgetspectacle {
  @include table(none);
  @include table-hover;
  font-size: 0.8em;
  table{
    width: 100%;
    box-shadow: 5px;
  }
  table, th, td {
    border: 1px solid #9c9090;
    border-collapse: collapse;
  }
}
.th-compte{
  width: 8%;
}
.th-montant, .th-total{
  width: 10%;
}
.th-nom, .th-nature{
  width: 20%;
}

</style>
<template>

  <div class="budgetspectacle">
    <table>
      <thead>
        <tr>
          <th class="th-compte">Compte</th>
          <th class="th-nature">Nature</th>
          <th class="th-nom">Nom</th>
          <th class="th-details">Details</th>
          <th class="th-montant">Montant</th>
          <th class="th-total">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in lines">
          <td>{{line.compte}}</td>
          <td>{{line.nature}}</td>
          <td>{{line.nom}}</td>
          <td>{{line.details}}</td>
          <td>{{line.montant}}</td>
          <td>{{line.total}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type='text/javascript'>
import {lines} from 'src/store/getters/settings'
import {getLines} from 'src/store/actions/settings'

export default {
  props: {
    name: String
  },
  vuex: {
    getters: { lines },
    actions: { getLines }
  },
  ready: function () {
    this.getLines()
  }
  // data () {
  //   return {
  //     lines: [
  //       {compte: 'n1', nature: 'essai', nom: 'Ludovic Mercet', details: 'un super essai', montant: '220', total: '450'}
  //     ]
  //   }
  // }
}
</script>
