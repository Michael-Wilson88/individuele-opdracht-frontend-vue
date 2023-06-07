<template>
  <div class="pagination-wrapper">
    <pagination :total-pages="totalPages" page-number=""/>
  </div>
  <div class="sort-button">
    <button @click="toggleSortOrder">
      {{ sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}
    </button>
    <button @click="addNewData">Add New Data</button>
  </div>
  <div class="wrapper">
    </div>
    <div v-for="band in bandsPerPage" :key="band.bandName" class="image-container">
      <router-link :to="{ name: 'BandDetails', params: { code: band.bandName }}" class="image-link">
        <img :src="band.image" :alt="band.bandName + '-logo'" class="image">
      </router-link>
    </div>
</template>

<script>
import {computed, reactive, ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import axios from 'axios';
import Pagination from "@/components/Pagination.vue";

const newData= {
      bandName: "Primus",
      city: "San Francisco",
      genre: "Funk Metal",
      image: "../img/logo-primus.png",
      albums: [
        { name: "Pork Soda" },
        { name: "Frizzle Fry" }
      ]
    }

export default {
  name: "Home",
  components: {
    RouterLink,
    Pagination
  },
  setup() {
    const route = useRoute();
    const page = Number(route.query.page) || 1;
    const imagesPerPage = 5;
    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const bands = ref([]);
    const sortOrder = ref('asc');
    const totalPages = ref(0);
    const bandsPerPage = computed(() => {
      let sortedBands = [...bands.value];
      if (sortOrder.value === 'asc') {
        sortedBands.sort((a, b) => a.bandName.localeCompare(b.bandName));
      } else {
        sortedBands.sort((a, b) => b.bandName.localeCompare(a.bandName));
      }
      return sortedBands.slice(start, end);
    });

    const toggleSortOrder = () => {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    };

    const fetchBands = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/v1/bands'); // Replace with your backend endpoint
        bands.value = response.data;
        totalPages.value = Math.ceil(bands.value.length / imagesPerPage);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchBands);

    return { bandsPerPage, totalPages, toggleSortOrder, sortOrder };
  },
};
</script>

<style scoped>
.pagination-wrapper {
  padding-top: 30px;
}

.sort-button {
  border: 10px;
  padding: 10px;
  color: mediumpurple;
}

button {
  cursor: pointer ;
}

.wrapper {
  padding-top: 50px;
  display: inline-block;
  position: center;
}

.image-container {
  float: contour;
  padding: 3px;
  display:inline-block;
}

.image-container img {
  display: inline-block;
  height: auto;
}

.image-container a {
  padding: 10px;
  display: inline-block;
  border: 3px solid transparent;
  transition: border 0.2s ease-in-out;
  position: relative;
  height: auto;
  overflow: hidden;
}

.image-container a:hover {
  border: 3px solid mediumpurple;
}

</style>