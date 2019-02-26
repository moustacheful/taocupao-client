<script>
export default {
  props: {
    currentTime: { default: () => Date.now(), type: Number },
    status: { default: () => {}, type: Object }
  },
  computed: {
    time() {
      return Math.round((this.currentTime - this.status.since) / 1000)
    },
    isToxic() {
      if (this.status.active) {
        return this.time > 5
      }

      return this.time < 5 && this.status.lastDuration > 5
    }
  }
}
</script>

<template>
  <div :class="{'status': true, 'is-busy': status.active}">
    {{ status.label }}
    <div v-if="isToxic" class="toxic">
      <small>
        <i class="fa fa-ban"/>
      </small>
    </div>
  </div>
</template>

<style scoped>
.status {
  margin-top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;
  display: inline-block;
  width: 25%;
  height: 0px;
  padding-bottom: 25%;
  text-align: center;
  background: #eaeaea;
  color: #666;
  transition: background 0.5s ease;
}

.status:first-child {
  border-radius: 10px 0px 0px 10px;
}

.status:last-child {
  border-radius: 0px 10px 10px 0px;
}

.status:after {
  display: inline-block;
}

.status.is-busy {
  background: #ff3333;
  color: #aa1111;
}
</style>
