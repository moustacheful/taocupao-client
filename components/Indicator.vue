<script>
export default {
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
        return this.time > 60
      }

      return this.time < 30 && this.status.lastDuration > 60
    }
  }
}
</script>

<template>
  <div :class="{'status': true, 'is-busy': status.active, 'is-toxic': isToxic}">{{ status.label }}</div>
</template>

<style scoped>
.status {
  vertical-align: middle;
  width: 150px;
  height: 150px;
  text-align: center;
  background: #eaeaea;
  color: rgba(0, 0, 0, 0.3);
  transition: background 0.5s ease;
  margin-right: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: #ff3333;
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
