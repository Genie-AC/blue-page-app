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

<script>
import * as Banner from '~/assets/images/banner.png';
export default {
  data () {
    return {
      title: this.$route.params.page ? this.$route.params.page.replace(/-/g, ' ') : 'Air Conditioner',
      bannerImage: Banner,
      mainWebsiteUrl: 'https://airconditioner.com',
      currentUrl: this.$route.fullPath,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles for the index page here */
</style>