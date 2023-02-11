<script setup>
import { RouterLink } from "vue-router";
import HouseDoorIcon from "./icons/IconHouseDoor.vue";
import BankIcon from "./icons/IconBank.vue";
import TableIcon from "./icons/IconTable.vue";
import BoxRightIcon from "./icons/IconBoxRight.vue";
import PeopleCircleIcon from "./icons/IconPeopleCircle.vue";
</script>

<template>
  <div class="container">
    <nav class="d-flex flex-wrap align-items-center justify-content-between">
      <div class="user d-flex flex-column align-items-center justify-content-center text-white">
        <img v-if="avatar" :src="avatar" class="rounded-circle" width="32" height="32" />
        <PeopleCircleIcon v-else class="bi d-block mx-auto mb-1" />
        <p class="m-0">Hallo {{ username }}</p>
      </div>
      <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
        <li>
          <RouterLink to="/" class="nav-link text-white">
            <HouseDoorIcon class="bi d-block mx-auto mb-1" />
            Übersicht
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/exchange" class="nav-link text-white">
            <BankIcon class="bi d-block mx-auto mb-1" />
            Börse
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/transactions" class="nav-link text-white">
            <TableIcon class="bi d-block mx-auto mb-1" />
            Transaktionen
          </RouterLink>
        </li>
        <li>
          <a :href="base_api + '/auth/logout'" class="nav-link text-white">
            <BoxRightIcon class="bi d-block mx-auto mb-1" />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
a.active {
  background-color: var(--ba-link-active);
}

a:hover {
  background-color: var(--ba-link-hover);
}
</style>

<script>
export default {
  name: "SiteHeader",
  data() {
    return {
      username: "{unknown}",
      avatar: null,
    };
  },
  computed: {
    base_api() {
      return import.meta.env.VITE_BASE_API;
    },
  },
  mounted() {
    this.$http
      .get("/user/info")
      .then((response) => {
        this.username = response.data.name;
        this.avatar = response.data.avatar;
      })
      .catch((error) => {
        console.log("Failed to get Username from API!");
      });
  },
};
</script>
