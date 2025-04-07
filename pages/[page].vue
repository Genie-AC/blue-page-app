<template>
  <div>
    <section class="white text-xl">
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
        <span class="inline text-center">
          <em class="fa-solid fa-location-dot"></em>&thinsp;15041 Calvert Street&ensp;&bull; Van Nuys, CA 91411
        </span>
        <a href="tel:8187854151" class="inline">
          <i class="fa-solid fa-phone"></i>&thinsp;(818) 785-4151
        </a>
      </address>
      <span class="b text-2xl text-center">We Cover Thousands of Cities Throughout The United States!</span>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from '~/stores'; // Import the Pinia store
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import VideoSection from '~/components/VideoSection.vue';
import EnterButton from '~/components/EnterButton.vue';
import CategoryList from '~/components/CategoryList.vue';

// Access the route and store
const route = useRoute();
const store = useStore();

// Reactive state for the page
const pageTitle = ref('');
const pageDescription = ref('');
const videoLinks = ref([]);

// Fetch page data based on the route parameter
const fetchPageData = (page) => {
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
    pageTitle.value = 'Page Not Found';
    pageDescription.value = 'The page you are looking for does not exist.';
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  const page = route.params.page;
  fetchPageData(page);
});

// Access categories and products from the Pinia store
const categories = computed(() => store.categories);
const products = computed(() => store.products);
</script>

<style scoped>
/* Add any specific styles for this page here */
</style>