<template>
  <div class="app-container">
    <!-- Show error message if there was an error -->
    <div v-if="appError" class="error-container">
      <p>{{ appError }}</p>
      <button @click="window.location.reload()">Reload Page</button>
    </div>

    <!-- Regular app content if no errors -->
    <template v-else>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
  </div>
</template>

<script setup>
import { useRequestHeaders } from 'nuxt/app';
import { useRoute } from 'vue-router';
import { useStore } from '~/stores';
import { onMounted, ref, watch } from 'vue';

// Error state to track application-level errors
const appError = ref(null);

// Get headers on server side with explicit header list
try {
  const headers = useRequestHeaders(['host']);
  const route = useRoute();
  const store = useStore();

  // Function to update title based on route
  const updateTitleFromRoute = () => {
    try {
      const page = route.params.page || '';
      const hasCity = !!route.query.city;
      const hasBzn = !!route.query.bzn;
      const hasAcc = !!route.query.acc;
      const hasMod = !!route.query.mod;

      store.setPageTitleFromRoute(
        store.domainName,  // Use stored domain name
        page,
        hasCity,  // Pass boolean flags instead
        hasBzn,
        hasAcc,
        hasMod
      );
    } catch (error) {
      console.error('Failed to update page title:', error);
      appError.value = 'Failed to update page information';
    }
  };

  // Get domain name with fallback
  let domainName = headers.host || 'splitsystemnear.com';

  // Set domain name in store
  try {
    store.setDomainName(domainName);
  } catch (error) {
    console.error('Failed to set domain name:', error);
    appError.value = 'Failed to set website information';
  }

  // Set initial title
  updateTitleFromRoute();

  // Watch for route changes and update title accordingly
  watch(
    () => route.fullPath,
    () => {
      console.log("Route changed:", route.fullPath);
      updateTitleFromRoute();
    }
  );

  // In client-side, re-evaluate using window.location if needed
  onMounted(() => {
    try {
      if (process.client && !headers.host) {
        const clientDomain = window.location.hostname;
        store.setDomainName(clientDomain);
        updateTitleFromRoute();
      }
    } catch (error) {
      console.error('Error during client-side initialization:', error);
      appError.value = 'Error initializing application';
    }
  });
} catch (error) {
  console.error('Critical application initialization error:', error);
  appError.value = 'Failed to initialize application';
}
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

/* Add this for error display */
.error-container {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.25rem;
  text-align: center;
}

.error-container button {
  background-color: #721c24;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
