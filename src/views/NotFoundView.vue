<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="content">
      <slot>
        <h1>Seite nicht gefunden</h1>
        <h2>Die gewünschte Seite wurde leider nicht gefunden!</h2>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
}

.content {
  text-align: center;
  background-color: var(--bs-purple);
  color: #fff;
  border-radius: 2rem;
  padding: 2rem;
}
</style>
