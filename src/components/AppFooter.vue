<template>
  <footer>
    <p>Copyright Michael &copy; {{ year }} </p>
  </footer>
</template>
<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>

<style scoped>
footer {
  position: absolute;
  display: flex;
  align-items: center;
  height: 4rem;
  right: 0;
  bottom: 0;
  left: 20px;
}
</style>