import VueRouter from 'vue-router'

export const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/index',
    component: require('./components/PageDashboard/Dashboard.vue'),
    name: 'index'
  }, {
    path: '/settings',
    component: require('./components/PageSettings/PageSettings.vue'),
    name: 'settings'
  }, {
    path: '/timesheet',
    component: require('./components/PageSettings/Timesheet.vue'),
    name: 'timesheet'
  }, {
    path: '/budget',
    component: require('./components/PageBudget/BudgetGlobal.vue'),
    name: 'budget'
  }, {
    path: '/Budgetspectacle',
    component: require('./components/PageBudget/BudgetSpectacle.vue'),
    name: 'BudgetSpectacle'
  }, {
    path: '/verification',
    component: require('./components/PageMaintenance/Verification.vue'),
    name: 'verification'
  }, {
    path: '/maintenance',
    component: require('./components/PageMaintenance/Maintenance.vue'),
    name: 'maintenance'
  }, {
    path: '/relamping',
    component: require('./components/PageMaintenance/Relamping.vue'),
    name: 'relamping'
  }, {
    path: '*',
    redirect: '/index'
  }]
})
