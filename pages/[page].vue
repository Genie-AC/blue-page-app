<template>
  <div>
    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading-spinner">
      <span>Loading...</span>
    </div>

    <!-- Error message -->
    <div v-else-if="pageError" class="error-message">
      <p>{{ pageError }}</p>
      <button @click="window.location.reload()">Try Again</button>
    </div>

    <!-- Page content when loaded successfully -->
    <section v-else class="white text-xl">
      <p>
        {{ currentUrl }} (Genie Air Conditioning and Heating, Inc.) is one of the Largest Wholesale Distributors of AC
        mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide
        variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air
        conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale
        Distributors is accomplished by our great buying power!
      </p>
      <p>
        We are one of the largest wholesale distributors of air conditioner and heat pump ac mini split systems in the
        United States. Contact us for a wide variety of climate control systems. We carry top brands such as: Genie
        Aire, LG, Midea, Cooper and Hunter, Alice, Sophia, OLMO, Victoria, Frigidaire, Samsung, Soleus, Amana, Arctic
        King, General Electric, and so many more.
      </p>
      <address class="flex column gap-4">
        <p class="inline text-center">
          <em class="fa-solid fa-location-dot" />&thinsp;15041 Calvert Street&ensp;&bull; Van Nuys, CA 91411
        </p>
        <p>
          <a href="tel:8187854151" class="inline">
            <i class="fa-solid fa-phone" />&thinsp;(818) 785-4151
          </a>
        </p>
      </address>
      <p class="b text-2xl text-center">We Cover Thousands of Cities Throughout The United States!</p>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from '~/stores';
import { onMounted, ref, computed } from 'vue';
import { DEFAULT_DOMAIN } from '~/utils/constants';
// Error state
const pageError = ref(null);
const isLoading = ref(true);

// Access the route and store
const route = useRoute();
const store = useStore();

// Reactive state for the page
const pageTitle = ref('');
const pageDescription = ref('');
const videoLinks = ref([]);
const currentUrl = ref('');

// Fetch page data based on the route parameter
const fetchPageData = (page) => {
  try {
    const pageData = {
      about: {
        title: 'About Us',
        description: 'Learn more about our company and services.',
        videos: ['https://www.youtube.com/embed/example1'],
      },
      services: {
        title: 'Our Services',
        description: 'Explore the services we offer.',
        videos: ['https://www.youtube.com/embed/example2'],
      },
      // Add more pages as needed
    };

    if (pageData[page]) {
      pageTitle.value = pageData[page].title;
      pageDescription.value = pageData[page].description;
      videoLinks.value = pageData[page].videos;
    } else {
      pageTitle.value = page ? page.replace(/-/g, ' ') : 'Page Not Found';
      pageDescription.value = 'Information about ' + pageTitle.value;
    }

    // Set currentUrl
    currentUrl.value = import.meta.client
      ? window.location.hostname
      : store.domainName || DEFAULT_DOMAIN;

  } catch (error) {
    console.error('Error fetching page data:', error);
    pageError.value = 'Failed to load page data';
    // Set defaults
    pageTitle.value = 'Air Conditioner';
    pageDescription.value = 'Information about our air conditioning products and services';
  } finally {
    isLoading.value = false;
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  try {
    const page = route.params.page;

    // Get query parameters to determine page type
    const isCity = !!route.query.city;
    const isProduct = !!route.query.mod;
    const isAccessory = !!route.query.acc;
    const isBusiness = !!route.query.bzn;
    const isKeyword = !!route.query.kw;

    // Set page title based on route parameters
    const domain = import.meta.client
      ? window.location.hostname
      : store.domainName || DEFAULT_DOMAIN;

    // Call store method to set page title with proper flags
    store.setPageTitleFromRoute(domain, page, isCity, isBusiness, isAccessory, isProduct, isKeyword);

    // Continue with regular page data fetching
    fetchPageData(page);
  } catch (error) {
    console.error('Error during page initialization:', error);
    pageError.value = 'Failed to initialize page';
    isLoading.value = false;
  }
});

// Access categories and products from the Pinia store
const cities = computed(() => store.cities);
const products = computed(() => store.products);
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.25rem;
  text-align: center;
}

.error-message button {
  background-color: #721c24;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

address,
p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
}

address {
  padding: 2rem 1rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.b {
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>