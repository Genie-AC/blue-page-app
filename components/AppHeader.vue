<template>
  <header class="show">
    <h1 class="white b text-5xl text-center">{{ titleDisplay }}</h1>
    <NuxtLink to="/">
      <img v-if="!imageError" class="banner" src="~/assets/images/banner.png" :alt="titleDisplay"
        @error="handleImageError">
      <div v-else class="image-placeholder">
        <span>Genie Air Conditioning and Heating</span>
      </div>
    </NuxtLink>
    <div class="mobile-column-reverse">
      <div v-if="showVideos" class="video-row">
        <VideoSection />
      </div>
      <EnterButton />
    </div>
  </header>
</template>

<script setup>
import { useStore } from "~/stores";
import { computed, ref, onMounted } from "vue";
import VideoSection from '~/components/VideoSection.vue';
import EnterButton from '~/components/EnterButton.vue';
import { isVideoAllowedForDomain } from '~/utils/formatters';

// Track image loading errors
const imageError = ref(false);

// State for video visibility
const showVideos = ref(false);

// Get state from store
const store = useStore();

// Safely handle title with error fallback
const titleDisplay = computed(() => {
  try {
    return store.pageTitle || 'Air Conditioner';
  } catch (error) {
    console.error("Error getting page title:", error);
    return 'Air Conditioner';
  }
});

// Check if videos should be displayed based on domain
onMounted(() => {
  try {
    const currentDomain = window.location.hostname;
    showVideos.value = isVideoAllowedForDomain(currentDomain);
    console.log(`Video display for domain ${currentDomain}: ${showVideos.value ? 'Enabled' : 'Disabled'}`);
  } catch (error) {
    console.error("Error checking domain for video display:", error);
    showVideos.value = false;
  }
});

// Handle image loading errors
const handleImageError = (e) => {
  console.error("Failed to load banner image");
  imageError.value = true;
};
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

/* Add styles for the image placeholder */
.image-placeholder {
  width: 100%;
  height: 100px;
  background-color: #005efe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  margin: 1rem 0;
}
</style>
