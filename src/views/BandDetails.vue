<template>
  <div class="BandDetails">
    <h1>{{ bandDetail.bandName }}</h1>
    <h2>City : {{ bandDetail.city }}</h2>
    <h3>Albums : </h3>
    <ul>
      <li v-for="album in bandDetail.albums" :key="album.name">{{ album.name }}</li>
    </ul>
  </div>
</template>

<script>
import bandData from "@/data/bandData";
import {computed} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "BandDetails",
  setup() {
    const route = useRoute();
    const bandDetail = computed(() => {
      return bandData.filter(b => b.bandName === route.params.code)[0]
    });
    return {bandDetail};
  },
};
</script>

<style scoped>
.BandDetails {
  padding-top: 40px;
  padding-left: 5px;
}

</style>
