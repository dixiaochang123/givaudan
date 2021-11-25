<template>
  <div>
      <!-- <Tabs :active="3" /> -->
      <Nodata/>
  </div>
  
</template>

<script>
import Nodata from './modules/Nodata'
export default {
  name: 'Other',
  components: {
    Nodata
  },
  data() {
    return {
      active:3
    }
  },
  mounted() {
    this.$emit('activeChange',3)
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.match {
  background: #f5f5f5;
  min-height: 100vh;
  
}
</style>
