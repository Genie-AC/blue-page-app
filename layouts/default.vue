<template>
  <div>
    <main class="show">
      <AppHeader />
      <!-- This is where page content will be injected -->
      <slot />
      <span class="mainFooter show"></span>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

<style scoped>
main {
  background: #005efe;
  margin: 1rem;
  padding: 2em 1em;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.267);
  min-height: 20vh;
  color: #fff;
}

.mainFooter {
  display: none;
}

@media (min-width: 930px) {
  main {
    width: 68.7vw;
    min-width: 640px;
    margin: 0 auto;
    padding: 2rem 0 0;
    border: 0;
    border-radius: 0;
  }

  .mainFooter {
    display: flex;
    width: 68.7vw;
    margin: 0 auto;
    background: linear-gradient(0deg, #005efe00 0%, #005efe 90%);
    height: 4rem;
  }
}
</style>
