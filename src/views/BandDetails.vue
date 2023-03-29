<template>
  <div class="BandDetails">
    <h1>{{ band.bandName }}</h1>
    <h2>City : {{ band.city }}</h2>
    <h3>Albums : </h3>
    <ul>
      <li v-for="album in band.albums" :key="album.name">{{ album.name }}</li>
    </ul>
  </div>
</template>

<script>
import bandData from "@/data/bandData";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
const bands = [];
export default {
  name: "BandDetails",
  setup() {
    const band = ref(null);
    const route = useRoute();

    fetch(`http://localhost:3003/api/v1/bands/${route.params.id}`)
        .then((response) => response.json())
        .then((data) => {
          band.value = data;
        })
        .catch((error) => {
          console.log(error);
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
