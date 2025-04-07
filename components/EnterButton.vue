<template>
  <div class="gap-4">
    <a
      href="https://airconditioner.com/"
      class="main__enter b text-5xl white text-upper"
    >
      Enter
    </a>
    <span class="main__enter--bottom white text-xs">(Our Main Website)</span>
  </div>
</template>

<script setup>
// No props or additional logic needed
// Component name is automatically derived from filename in Nuxt 3
</script>

<style scoped>
.gap-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px !important;
}

.main__enter {
  padding: 0.5rem;
  background: linear-gradient(
    0deg,
    rgba(156, 0, 14, 1) 0%,
    rgba(154, 14, 23, 1) 36%,
    rgba(216, 89, 93, 1) 54%,
    rgba(233, 16, 37, 1) 76%
  );
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
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

/* Helper classes */
.white {
  color: #fff;
}

.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-upper {
  text-transform: uppercase;
}

.b {
  font-weight: bold;
}
</style>
