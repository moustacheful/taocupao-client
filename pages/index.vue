<script>
import { mapState, mapActions } from 'vuex'
import Indicator from '~/components/Indicator'

export default {
  components: { Indicator },

  data() {
    return {
      displayMode: 'light'
    }
  },

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
    ...mapActions(['startListening']),
    toggleDisplayMode() {
      const newDisplayMode = this.displayMode === 'light' ? 'dark' : 'light'

      document.body.classList.remove(this.displayMode)
      document.body.classList.add(newDisplayMode)

      this.displayMode = newDisplayMode
    }
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
      <fa class="icon-health" icon="satellite-dish"/>Out of sync!
    </div>

    <button
      :title="displayMode + ' mode'"
      class="toggle-display-mode"
      v-on:click="toggleDisplayMode()"
    >
      <fa class="icon" icon="lightbulb"/>
    </button>

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
.toggle-display-mode {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  appearance: none;
  border: 0;
  padding: 10px;
  color: #888;
}

.dark .toggle-display-mode {
  color: #888;
}

.icon-health {
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

.container .indicators {
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
