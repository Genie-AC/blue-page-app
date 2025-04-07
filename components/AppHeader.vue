<template>
  <header class="show">
    <h1 class="white b text-5xl text-center">{{ title }}</h1>
    <NuxtLink to="/">
      <img class="banner" src="@/assets/images/banner.png" :alt="title || 'Genie Air Conditioning and Heating'" />
    </NuxtLink>
    <div class="mobile-column-reverse">
      <div class="video-row">
        <VideoSection />
      </div>
      <div class="gap-4">
        <a href="https://airconditioner.com/" class="main__enter b text-5xl white text-upper">
          Enter
        </a>
        <span class="main__enter--bottom white text-xs">(Our Main Website)</span>
      </div>
    </div>
  </header>
</template>

<script setup>
// Import composable instead of direct store import
import { useStore } from "@/stores";
// No need to import computed in Vue 3 with <script setup>
import VideoSection from '@/components/VideoSection.vue';

// Get state from store (could be replaced with useState or usePinia if using those)
const store = useStore();

// Use reactive computed properties in Vue 3 style
const title = computed(() => store.title);

// Alternative approach using Nuxt 3's useState if store is simple:
// const title = useState('title')

// If using Pinia instead of Vuex:
// import { useMainStore } from '@/store/main'
// const store = useMainStore()
// const title = computed(() => store.title)
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  gap: 3em;
  color: #fff;
  padding: 2em 1em;
}

h1 {
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  text-align: center;
  color: white;
}

.banner {
  z-index: 1;
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.mobile-column-reverse {
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5em;
}

.video-row {
  display: block;
}

.main__enter {
  padding: 0.5rem;
  background: linear-gradient(0deg,
      rgba(156, 0, 14, 1) 0%,
      rgba(154, 14, 23, 1) 36%,
      rgba(216, 89, 93, 1) 54%,
      rgba(233, 16, 37, 1) 76%);
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  display: block;
}

.main__enter:hover {
  box-shadow: 0 0 1rem blue;
  transition: all 0.3s ease;
  color: #0ff;
}

.main__enter--bottom {
  color: #fff;
  font-size: 0.75rem;
  line-height: 1rem;
}

.gap-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.white {
  color: #fff;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

.text-center {
  text-align: center;
}

.b {
  font-weight: bold;
}

.text-upper {
  text-transform: uppercase;
}

/* Animation classes */
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
  .video-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .mobile-column-reverse {
    flex-direction: column;
  }

  h1 {
    font-size: 4.5rem;
  }
}
</style>
