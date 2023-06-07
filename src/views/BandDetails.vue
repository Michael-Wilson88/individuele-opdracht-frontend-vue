<template>
  <div class="BandDetails" v-if="band">
    <h1>{{ band.bandName }}</h1>
    <h2>City: {{ band.city }}</h2>
    <h3>Albums:</h3>
    <ul>
      <li v-for="album in band.albums" :key="album.name">{{ album.name }}</li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "BandDetails",
  setup() {
    const band = ref(null);
    const route = useRoute();

    onMounted(async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/v1/bands/${route.params.code}`);
        console.log("API Route param:", route.params.code);
        const data = await response.json();
        console.log("API Response:", data);
        band.value = data;
      } catch (error) {
        console.log(error);
      }
    });

    return { band };
  },
};
</script>

<style scoped>
.BandDetails {
  padding-top: 40px;
  padding-left: 5px;
}

</style>
