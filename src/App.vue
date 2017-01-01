<style>
body {
  background-color: #e9e9e9;
}
.createch-container {
  margin: 40px;
}
.float-right {
  float: right;
}
.createch-margin {
  margin-bottom: 20px;
}
.createch-center {
  text-align: center;
}
.createch-vertical-center {
  display: flex; /* contexte sur le parent */
  flex-direction: column; /* direction d'affichage verticale */
  justify-content: center; /* alignement vertical */
}
</style>

<template>
  <div class="createch-container">
    <div class="ui grid">
      <h1 class="ui center aligned icon header">
        <div><i class="circular sitemap icon"></i>
          <span>Createch</span></div>
      </h1>
      <cardinfo></cardinfo>
    </div>
    <div class="createch-margin"></div>
    <div>
      <div class="ui olive tabular menu">
        <router-link class="item" :to="{ name: 'index' }" tag="a" active-class="active">Dashboard</router-link>
        <router-link class="item" :to="{ name: 'verification' }" tag="a" active-class="active">
          <i class="icon retweet"></i>Vérification</router-link>
        <router-link class="item" :to="{ name: 'maintenance' }" tag="a" active-class="active">
          <i class="icon configure"></i>Maintenance</router-link>
        <router-link class="item" :to="{ name: 'relamping' }" tag="a" active-class="active">Relamping</router-link>
        <router-link class="item" :to="{ name: 'budget' }" tag="a" active-class="active">
          <i class="icon bar chart"></i>Budget global</router-link>
        <router-link class="item" :to="{ name: 'BudgetSpectacle' }" tag="a" active-class="active">
          <i class="icon euro"></i>Budget par spectacle</router-link>
        <router-link class="item" :to="{ name: 'timesheet' }" tag="a" active-class="active">
          <i class="icon calendar outline"></i>Timesheet</router-link>
        <router-link class="item" :to="{ name: 'settings' }" tag="a" active-class="active">
          <i class="icon settings"></i>settings</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import cardinfo from 'src/components/Cardinfo.vue'
export default {
  components: {
    cardinfo: cardinfo
  },
  mounted () {
    this.$store.dispatch('getCouleurs')
    this.$store.dispatch('getFonctions')
    this.$store.dispatch('getGroupes')
    this.$store.dispatch('getConventions')
    this.$store.dispatch('getLieux')
    this.$store.dispatch('getPersonnels')
    this.$store.dispatch('getBudgets')
    this.$store.dispatch('getEvents')
    this.$store.dispatch('getVerifications')
    this.$store.dispatch('getMaintenances')
    window.onbeforeunload = function () {
      let msg = 'test'
      return msg
    }
  },
  methods: {
  }
}
</script>
