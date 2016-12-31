<style>
.createch-decal {
  margin-top: 10px;
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
    </div>
    <div class="sixteen wide column createch-decal">
      <maintenance-form></maintenance-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import maintenanceComponent from 'src/components/PageMaintenance/Forms/MaintenanceForm.vue'

export default {
  components: {
    maintenanceForm: maintenanceComponent
  }
}
</script>
