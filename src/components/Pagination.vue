<template>
  <nav v-if="totalPages > 1">
    <ul>
      <li v-for="page in totalPages" :key="page">
        <router-link :to="{ name: 'Home', query: { page: page }}" class="page-link">Page {{ page }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: "Pagination",
  components: {
    RouterLink
  },
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
nav {
  position: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 5px;
  justify-content: center;
}

nav li {
  margin-right: 10px;
  display: inline-block;
}

nav a {
  font-family: "OCR A Extended", fantasy;
  font-size: 20px;
  text-decoration: none;
  color: mediumpurple;
  border: 1px solid transparent;
  position: center;
}

nav a:hover {
  border: 1px solid mediumpurple;
}

nav a:active {
  border: none;
  text-decoration: underline;
}
</style>