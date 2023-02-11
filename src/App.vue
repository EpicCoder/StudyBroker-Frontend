<script setup>
import { RouterView } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
</script>

<template>
  <header v-if="!$route.meta.noHeader">
    <SiteHeader />
  </header>
  <RouterView />
</template>

<style>
header {
  width: 100%;
  background-color: var(--bs-purple);
  color: black;
}
</style>
