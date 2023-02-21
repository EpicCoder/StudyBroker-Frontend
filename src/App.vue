<script setup>
import { RouterView } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import ErrorPage from "./views/NotFoundView.vue";
</script>

<template>
  <ErrorPage v-if="loading || errored">
    <h2 v-if="errored">Fehler beim laden der Website, bitte erneut versuchen!</h2>
    <h2 v-else>Bitte warten, Inhalt wird geladen...</h2>
  </ErrorPage>

  <template v-else>
    <header v-if="!$route.meta.noHeader">
      <SiteHeader />
    </header>
    <RouterView />
  </template>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      errored: false
    }
  },
  created() {
    this.$http
      .get('/')
      .then(response => {
        console.log("[API] Connection success!");
      })
      .catch(error => {
        this.loading = false
        this.errored = true
        console.log("[API] Connection failed!");
      })
      .finally(() => this.loading = false)
  }
}
</script>

<style>
header {
  width: 100%;
  background-color: var(--bs-purple);
  color: black;
}
</style>
