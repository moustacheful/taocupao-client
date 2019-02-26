<script>
import { mapState, mapActions } from 'vuex'
import Indicator from '~/components/Indicator'

export default {
  components: { Indicator },
  computed: {
    ...mapState(['statuses', 'health', 'time']),
    isServiceAlive() {
      if (!this.health) return false

      return this.time - this.health.heartbeat < 20000
    }
  },
  mounted() {
    this.startListening()
  },
  methods: {
    ...mapActions(['startListening'])
  }
}
</script>

<template>
  <section class="container">
    <div v-if="!isServiceAlive" class="service-status">
      <i class="fa fa-unlink"/> Out of sync!
    </div>
    <indicator v-for="(status, key) in statuses" :key="key" :status="status" :current-time="time"/>
  </section>
</template>

<style scoped>
.container {
  text-align: center;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
}
</style>
