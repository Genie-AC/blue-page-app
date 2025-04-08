<template>
  <div>
    <section class="white text-xl">
      <p>
        {{ domainName }} (Genie Air Conditioning and Heating, Inc.) is one of the Largest Wholesale Distributors of AC
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
          <em class="fa-solid fa-location-dot"></em>&thinsp;15041 Calvert Street&ensp;&bull; Van Nuys, CA 91411
        </p>
        <p>
          <a href="tel:8187854151" class="inline">
            <i class="fa-solid fa-phone"></i>&thinsp;(818) 785-4151
          </a>
        </p>
      </address>
      <p class="b text-2xl text-center">We Cover Thousands of Cities Throughout The United States!</p>
    </section>
  </div>
</template>

<script setup>
import { useStore } from '~/stores';
import { computed } from 'vue';

// Access store inside component setup function where Pinia is available
const store = useStore();

// Reactive data
const domainName = computed(() => store.domainName);
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