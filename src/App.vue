
<template>
  <app-header/>
  <router-view :key="$route.fullPath"></router-view>
  <app-footer/>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppFooter,
    AppHeader,
  }
};

</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

</style>
