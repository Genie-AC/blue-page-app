<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useRequestHeaders } from 'nuxt/app';
import { useRoute } from 'vue-router';
import { useStore } from '~/stores';
import { onMounted } from 'vue';

// Get headers on server side with explicit header list
const headers = useRequestHeaders(['host']);
const route = useRoute();
const store = useStore();

// Get domain name with fallback
let domainName = headers.host || 'hvac-company.com';
store.setDomainName(domainName);

// Extract route parameters
const page = route.params.page || '';
const hasCity = !!route.query.city;
const hasBzn = !!route.query.bzn;
const hasAcc = !!route.query.acc;
const hasMod = !!route.query.mod;

// Set appropriate title
store.setPageTitleFromRoute(
  domainName,
  page,
  hasCity ? page : '',
  hasBzn ? page : '',
  hasAcc ? page : '',
  hasMod ? page : ''
);

// In client-side, re-evaluate using window.location if needed
onMounted(() => {
  if (process.client && !headers.host) {
    const clientDomain = window.location.hostname;
    console.log('Client Domain:', clientDomain);
    store.setDomainName(clientDomain);
    store.setPageTitleFromRoute(
      clientDomain,
      page,
      hasCity ? page : '',
      hasBzn ? page : '',
      hasAcc ? page : '',
      hasMod ? page : ''
    );
  }

  console.log('Domain Name:', store.domainName);
  console.log('Title Name:', store.pageTitle);
});
</script>

<style>
/* Global styles migrated from the PHP template */
body {
  margin: 0;
  font: 1rem/1.5rem sans-serif;
  background: linear-gradient(90deg, #005efe 0%, #c2d9ff 50%, #005efe 100%);
}

section {
  padding: 0 6rem 4rem;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: lightgray;
}

a:hover {
  color: #0ff;
  transition: all 0.3s ease;
}

.inline {
  display: inline;
}

.text-center {
  text-align: center;
}

.white {
  color: #fff;
}

.b {
  font-weight: bold;
}

.text-upper {
  text-transform: uppercase;
}

img {
  max-width: 100%;
  height: auto;
}

/* Animation classes used throughout the app */
@keyframes show {
  0% {
    opacity: 0;
    transform: translateY(-20em);
  }

  50% {
    transform: translateY(0.3em);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes show__inside {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.show {
  animation: show ease 0.35s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  opacity: 0;
}

.show * {
  animation: show__inside ease 0.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.35s;
  opacity: 0;
}

@media (min-width: 930px) {
  main {
    width: 68.7vw;
    min-width: 640px;
    margin: 0 auto;
    padding: 2rem 0 0;
    border: 0;
    border-radius: 0
  }

  section {
    padding: 0 6rem 4rem
  }
}
</style>
