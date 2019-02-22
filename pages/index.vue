<script>
import { mapState, mapActions } from 'vuex'
import Indicator from '~/components/Indicator'

export default {
  methods: {
    ...mapActions(['startListening'])
  },
  computed: {
    ...mapState(['statuses', 'health', 'time']),
    isServiceAlive() {
      return this.time - this.health.heartbeat < 10000
    }
  },
  components: { Indicator },
  mounted() {
    this.startListening()
  }
}
</script>

<template>
  <section class="container">
    <div class="service-status" v-if="!isServiceAlive">
      <i class="fa fa-unlink"></i> Offline
    </div>
    <indicator v-for="(status, key) in statuses" :key="key" :status="status" :currentTime="time"/>
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
