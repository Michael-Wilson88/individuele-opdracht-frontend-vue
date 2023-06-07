<template>
  <div class="BandDetails">
    <h1>{{ band.bandName }}</h1>
    <h2>City: {{ band.city }}</h2>
    <h3>Albums:</h3>
    <ul>
      <li v-for="album in band.albums" :key="album.name">{{ album.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "BandDetails",
  setup() {
    const band = ref({});
    const route = useRoute();

    onMounted(() => {
      fetch(`http://localhost:3003/api/v1/bands/${route.params.id}`)
          .then((response) => response.json())
          .then((data) => {
            band.value = data;
          })
          .catch((error) => {
            console.log(error);
          });
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
