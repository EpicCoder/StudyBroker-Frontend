<script setup>
import GithubIcon from "../components/icons/IconGithub.vue";
import GoogleIcon from "../components/icons/IconGoogle.vue";
import MicrosoftIcon from "../components/icons/IconMicrosoft.vue";
</script>

<template>
  <div class="container m-auto">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card border-0 shadow-lg">
          <div class="row g-0">
            <div class="col-7">
              <img src="/background.jpg" class="img-fluid rounded-start" alt="..." />
            </div>

            <div class="col-5">
              <div class="card-body p-3">
                <h1 class="fs-4 card-title fw-bold mb-4 text-center">
                  Study Broker
                </h1>
                <div>
                  <a class="btn btn-outline-secondary w-100 mb-3 d-flex p-0 align-items-center"
                    :href="'https://github.com/login/oauth/authorize?client_id=' + clientID + '&scope=user%3Aemail'">
                    <span class="p-3">
                      <GithubIcon />
                    </span>
                    <span class="pe-4 w-100">Login mit Github</span>
                  </a>
                  <a class="btn btn-outline-secondary w-100 mb-3 d-flex p-0 align-items-center disabled" href="#">
                    <span class="p-3">
                      <GoogleIcon />
                    </span>
                    <span class="pe-4 w-100">Login mit Google</span>
                  </a>
                  <a class="btn btn-outline-secondary w-100 d-flex p-0 align-items-center disabled" href="#">
                    <span class="p-3">
                      <MicrosoftIcon />
                    </span>
                    <span class="pe-4 w-100">Login mit Microsoft</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: var(--bs-purple);
}

.btn-outline-secondary {
  --bs-btn-color: #000;
  --bs-btn-hover-bg: var(--bs-purple);
}
</style>

<script>
export default {
  computed: {
    clientID() {
      return import.meta.env.VITE_GITHUB_ID;
    },
  },
};
</script>
