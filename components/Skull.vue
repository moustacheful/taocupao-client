<script>
export default {
  data() {
    return {
      left: 0,
      offset: 0,
      duration: 0,
      animate: false
    }
  },

  mounted() {
    this.$refs.el.addEventListener('animationend', this.reposition)
    this.reposition()
  },

  beforeDestroy() {
    this.$refs.el.removeEventListener('animationend', this.reposition)
  },

  methods: {
    reposition(evt) {
      if (evt && evt.target !== this.$refs.el) return

      this.animate = false

      setTimeout(() => {
        this.left = Math.round(Math.random() * 10) * 10
        this.duration = Math.random() * 1000 + 1500
        this.offset = Math.random() * 3000 + 2000
        this.animate = true
      }, 50)
    }
  }
}
</script>

<template>
  <fa
    class="skull"
    :class="{animate}"
    :style="{
      'animation-duration': `${duration}ms`, 
      'animation-delay': `${offset}ms`, 
      left: `${left}%`
    }"
    ref="el"
    icon="skull"
  />
</template>

<style>
.skull {
  display: none;
  position: absolute;
}

.skull.animate {
  display: block;
  animation: toxic 2s ease both;
}

@keyframes toxic {
  0% {
    transform: translateY(400%) scale(0);
  }

  95% {
    opacity: 1;
    transform: translateY(0%) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY(0%) scale(1.5);
  }
}
</style>
