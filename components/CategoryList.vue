<template>
  <section v-if="categories && categories.length > 0">
    <label>{{ title }}</label>
    <div class="category-grid">
      <NuxtLink v-for="category in safeCategories" :key="typeof category === 'object' ? category.id || index : category"
        :to="generateLinkSafely(category)">
        {{ typeof category === 'object' ? category.name || 'Category' : category }}
      </NuxtLink>
    </div>
  </section>
  <section v-else-if="error" class="error-section">
    <p>{{ error }}</p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Categories"
  },
  categories: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: "",
    validator: (value) => ["city", "product", "accessory", "service", ""].includes(value)
  }
});

const error = ref('');
const safeCategories = computed(() => {
  try {
    // Make sure categories exists and is an array
    if (!props.categories || !Array.isArray(props.categories)) {
      error.value = "No categories available";
      return [];
    }
    return props.categories;
  } catch (e) {
    console.error("Error processing categories:", e);
    error.value = "Error loading categories";
    return [];
  }
});

// Generate the appropriate link based on category type - with error handling
const generateLinkSafely = (category) => {
  try {
    const slug = typeof category === 'string'
      ? category.replace(/ /g, '-')
      : (category?.slug || 'category');

    const queryParams = {
      city: '?city=1',
      product: '?mod=1',
      accessory: '?acc=1',
      service: '?bzn=1'
    };

    return `/${slug}${props.type ? queryParams[props.type] || '' : ''}`;
  } catch (e) {
    console.error("Error generating link:", e);
    return '/';
  }
};
</script>

<style scoped>
.error-section {
  color: #f8d7da;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  text-align: center;
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font: 700 15px sans-serif;
  text-transform: uppercase;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(15px, auto);
  row-gap: 6px;
  column-gap: 1.5em;
  margin: 8px 0;
  align-items: center;
}

.category-grid>a {
  text-wrap: pretty;
  font: 12px/16px sans-serif;
  text-decoration: none;
  color: lightgray;
}

.category-grid>a:hover {
  color: #0ff;
  transition: all 0.3s ease;
}

@media (min-width: 930px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) {
  .category-grid {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(15px, auto);
    row-gap: 6px;
  }
}
</style>
