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
  },

  head() {
    return {
      title: 'Ta ocupao?'
    }
  }
}
</script>

<template>
  <section class="container">
    <div v-if="!isServiceAlive" class="service-status">
      <fa class="icon" icon="satellite-dish"/>Out of sync!
    </div>
    <div class="indicators">
      <indicator
        v-for="(status, key) in statuses"
        :key="key"
        :status="status"
        :current-time="time"
      />
    </div>
  </section>
</template>

<style scoped>
.icon {
  margin-right: 5px;
}
.service-status {
  color: #888;
  position: fixed;
  top: 10px;
  right: 10px;
}

.container {
  text-align: center;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

@media only screen and (max-width: 720px) {
  .container {
    max-width: 480px;
  }
}
</style>
