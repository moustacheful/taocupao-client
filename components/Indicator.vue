<script>
import Skull from './Skull'

const MIN_TOXIC_THRESHOLD = 360

export default {
  components: { Skull },
  props: {
    currentTime: { default: () => Date.now(), type: Number },
    status: { default: () => {}, type: Object }
  },
  computed: {
    // Time elapsed since active, in seconds
    time() {
      return Math.round((this.currentTime - this.status.since) / 1000)
    },
    // Whether this indicator has passed a certain threshold
    isToxic() {
      if (this.status.active) {
        return this.time > MIN_TOXIC_THRESHOLD
      }

      return this.time < 30 && this.status.lastDuration > MIN_TOXIC_THRESHOLD
    }
  }
}
</script>

<template>
  <div :class="{'status': true, 'is-busy': status.active, 'is-toxic': isToxic}">
    <fa class="icon fa-4x" icon="toilet"/>
    <label>{{status.label}}</label>

    <div v-if="isToxic" class="skull-container">
      <skull v-for="i in 2" :key="i"/>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-top: 10px;
  bottom: 10px;
  font-size: 11px;
  text-transform: uppercase;
}

.skull-container {
  position: absolute;
  top: 10px;
  left: 57px;
  width: 35px;
  height: 60px;
}

.status {
  position: relative;
  vertical-align: middle;
  width: 150px;
  height: 150px;
  text-align: center;
  background: #4effc6;
  color: rgba(0, 0, 0, 0.5);
  transition: background 0.5s ease;
  margin-right: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.status:nth-child(2) {
  margin-right: 80px;
}

.status:last-child {
  margin-right: 0;
}

.status:after {
  display: inline-block;
}

.status.is-busy {
  background: #ff5e5e;
}

@media only screen and (max-width: 720px) {
  .status {
    margin-bottom: 20px;
  }

  .status:nth-child(2),
  .status:nth-child(4) {
    margin-right: 0 !important;
  }
}

@media only screen and (max-width: 330px) {
  .status {
    width: 100px;
    height: 100px;
  }
}
</style>
