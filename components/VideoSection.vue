<template>
  <div class="video-section">
    <div class="video-container">
      <p class="video-title">Check out a small portion of our place!</p>
      <iframe
        width="280"
        height="157"
        src="https://www.youtube.com/embed/q-XH4GcoMI4?si=AMYEibW3XQtf4j0T"
        title="Genie AC - We Don't Run out of Units!"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-container">
      <p class="video-title">We can heat you up or cool you down!</p>
      <iframe
        width="280"
        height="157"
        src="https://www.youtube.com/embed/JHBzZK7p4gk?si=AMYEibW3XQtf4j0T"
        title="GenieAC.com sells only the best"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
// Component name is automatically derived from filename in Nuxt 3
// No additional logic needed
</script>

<style scoped>
.video-section {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  width: 100%;
}

.video-container {
  text-align: center;
}

.video-title {
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-bottom: 0.1rem;
  font-style: italic;
}

iframe {
  max-width: 100%;
  border: none;
}

@media (min-width: 930px) {
  .video-section {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  
  .video-title {
    margin-bottom: 0.25rem;
  }
  
  iframe {
    width: 320px;
    height: 180px;
  }
}

@media (min-width: 1200px) {
  iframe {
    width: 400px;
    height: 225px;
  }
}
</style>
