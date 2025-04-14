<template>
  <footer class="show">
    <div class="footer__copy">
      <a href="https://airconditioner.com/">
        <img src="~/assets/images/genie-logo-ribbon-2.svg" alt="Genie Air">
      </a>
      <strong>{{ title }}</strong>
      <em>"One of the largest Wholesale Distributor's in the United States!"</em>
    </div>
    <div class="word__bkt">
      <section v-if="showCities">
        <label>Cities We Service</label>
        <div id="cities">
          <NuxtLink v-for="city in cities" :key="city" :to="`/${city.replace(/ /g, '-')}?city=1`">{{ city }}</NuxtLink>
        </div>
      </section>
      <section v-if="showProducts">
        <label>Products We Carry</label>
        <div>
          <NuxtLink v-for="product in products" :key="product" :to="`/${product.replace(/ /g, '-')}?mod=1`">{{ product
          }}</NuxtLink>
        </div>
      </section>
      <section v-if="showAccessories">
        <label>Accessories We Carry</label>
        <div>
          <NuxtLink v-for="accessory in accessories" :key="accessory" :to="`/${accessory.replace(/ /g, '-')}?acc=1`">{{
            accessory }}</NuxtLink>
        </div>
      </section>
      <section v-if="showBusinesses">
        <label>Our Business Services</label>
        <div>
          <NuxtLink v-for="business in businesses" :key="business" :to="`/${business.replace(/ /g, '-')}?bzn=1`">{{
            business }}</NuxtLink>
        </div>
      </section>

      <!-- Ducted Keywords Section -->
      <section v-if="showDuctedKeywords">
        <label>Ducted Systems</label>
        <div id="ducted-keywords">
          <NuxtLink v-for="keyword in keywordSets.ducted" :key="keyword" :to="`/${keyword.replace(/ /g, '-')}?kw=1`"
            :title="`Ducted ${keyword}`">
            {{ keyword }}
          </NuxtLink>
        </div>
      </section>

      <!-- Split Keywords Section -->
      <section v-if="showSplitKeywords">
        <label>Split System Solutions</label>
        <div id="split-keywords">
          <NuxtLink v-for="keyword in keywordSets.split" :key="keyword" :to="`/${keyword.replace(/ /g, '-')}?kw=1`"
            :title="`Split ${keyword}`">
            {{ keyword }}
          </NuxtLink>
        </div>
      </section>

      <!-- HVAC Keywords Section -->
      <section v-if="showHvacKeywords">
        <label>HVAC Professional Resources</label>
        <div id="hvac-keywords">
          <NuxtLink v-for="keyword in keywordSets.hvac" :key="keyword" :to="`/${keyword.replace(/ /g, '-')}?kw=1`"
            :title="`HVAC ${keyword}`">
            {{ keyword }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </footer>
</template>

<script setup>
import { useStore } from "~/stores";
import { computed, onMounted, ref } from "vue";
import { DUCTED_KEYWORDS, SPLIT_KEYWORDS, HVAC_KEYWORDS } from "~/utils/constants";

// Get state from store
const store = useStore();

// Create computed properties from store state
const title = computed(() => store.pageTitle);
const cities = computed(() => store.cities);
const products = computed(() => store.products);
const accessories = computed(() => store.accessories);
const businesses = computed(() => store.businesses);

// Organize keywords by category
const keywordSets = ref({
  ducted: DUCTED_KEYWORDS || [],
  split: SPLIT_KEYWORDS || [],
  hvac: HVAC_KEYWORDS || []
});

// Category visibility flags
const showCities = ref(true);
const showProducts = ref(true);
const showAccessories = ref(true);
const showBusinesses = ref(true);
const showDuctedKeywords = ref(false);
const showSplitKeywords = ref(false);
const showHvacKeywords = ref(false);

// Function to check if domain matches any category items
const checkDomainForCategoryMatches = () => {
  const domain = window.location.hostname.toLowerCase();

  // Extract keywords from domain (remove common TLDs and split by non-alphanumeric characters)
  const domainBase = domain.replace(/\.(com|org|net|co|io|app|ai)$/, '');
  const keywords = domainBase.split(/[^a-z0-9]/).filter(k => k.length > 3);

  // Check which keyword section to show based on domain
  showDuctedKeywords.value = domain.includes('duct');
  showSplitKeywords.value = domain.includes('split');
  showHvacKeywords.value = domain.includes('hvac');

  // Fallback: If this is an AC domain but doesn't match any specific category,
  // show the HVAC keywords as a default
  if (domain.includes('ac') && !showDuctedKeywords.value && !showSplitKeywords.value && !showHvacKeywords.value) {
    showHvacKeywords.value = true;
  }

  // Check if any keywords match with products
  const productMatches = products.value.some(product => {
    return keywords.some(keyword =>
      product.toLowerCase().includes(keyword) ||
      keyword.includes(product.toLowerCase().replace(/\s+/g, ''))
    );
  });

  // Check if any keywords match with accessories
  const accessoryMatches = accessories.value.some(accessory => {
    return keywords.some(keyword =>
      accessory.toLowerCase().includes(keyword) ||
      keyword.includes(accessory.toLowerCase().replace(/\s+/g, ''))
    );
  });

  // Check if any keywords match with businesses
  const businessMatches = businesses.value.some(business => {
    return keywords.some(keyword =>
      business.toLowerCase().includes(keyword) ||
      keyword.includes(business.toLowerCase().replace(/\s+/g, ''))
    );
  });

  // Hide categories that match with domain keywords
  showProducts.value = !productMatches;
  showAccessories.value = !accessoryMatches;
  showBusinesses.value = !businessMatches;
};

// Run the check on mount
onMounted(() => {
  checkDomainForCategoryMatches();
});
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  gap: 3em;
  color: #fff;
  background: #000;
  padding: 3em 1.5em 8em;
}

footer img {
  max-width: 100%;
  height: auto;
}

.footer__copy {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: auto;
}

.footer__copy strong {
  font: 700 32px sans-serif;
  text-wrap: pretty;
}

.word__bkt {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.word__bkt>section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.word__bkt label {
  font: 700 15px sans-serif;
  text-transform: uppercase;
}

.word__bkt>section>div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(15px, auto);
  row-gap: 6px;
  column-gap: 1.5em;
  margin: 8px 0;
  align-items: center;
}

.word__bkt>section>div>a {
  text-wrap: pretty;
  font: 12px/16px sans-serif;
  text-decoration: none;
  color: lightgray;
}

.word__bkt>section>div>a:hover {
  color: #0ff;
  transition: all 0.3s ease;
}

#cities {
  gap: 8px 1.5em;
}

#ducted-keywords,
#split-keywords,
#hvac-keywords {
  gap: 8px 1.5em;
}

@media (min-width: 930px) {
  footer {
    flex-direction: row;
  }

  .footer__copy {
    border-right: 1px solid;
    padding-right: 3em;
    margin: 0;
  }

  .word__bkt {
    width: 68.7vw;
  }

  .word__bkt>section>div {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) {
  .word__bkt>section>div {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(15px, auto);
    row-gap: 6px;
  }
}
</style>
