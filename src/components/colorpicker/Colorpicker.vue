<style>
</style>

<template>
  <div>
    <div class="field">
      <label for="colorpicker">{{ name }}</label>
      <input type="text" readonly name="colorpicker" :value="colors.hex" @click="showColorpicker" :style="{ backgroundColor: colors.hex }">
    </div>
    <chromepicker v-model="colors" :visible="isVisible" @change-color="onChange"></chromepicker>
  </div>
</template>

<script type="text/javascript">
import Chrome from 'src/components/colorpicker/Chrome.vue'

export default {
  props: {
    name: {type: String, default: 'colorpicker'},
    colors: {type: Object}
  },
  components: {
    chromepicker: Chrome
  },
  data: function () {
    return {
      isVisible: false,
      modifiedColors: this.colors
    }
  },
  methods: {
    showColorpicker: function () {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideColorpicker))
    },
    hideColorpicker: function () {
      this.isVisible = false
      document.removeEventListener('click', this.hideColorpicker)
    },
    onChange (val) {
      this.modifiedColors = val
      this.$emit('change-color', val)
    }
  }
}
</script>
