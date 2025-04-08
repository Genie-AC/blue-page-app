import { defineStore } from "pinia";
import {
  CITIES,
  PRODUCTS,
  ACCESSORIES,
  BUSINESSES,
  STREET_ADDRESS,
  SLUGS,
} from "~/utils/constants";
import formatTitle from "~/plugins/title-formatter";
import { ref, computed } from 'vue';

export const useStore = defineStore("main", {
  state: () => ({
    // Import constants into the state
    cities: CITIES,
    products: PRODUCTS,
    accessories: ACCESSORIES,
    businesses: BUSINESSES,
    slugs: SLUGS,
    streetAddress: STREET_ADDRESS,

    // Other state properties
    domainName: "hvac-company.com", // Default value
    currentPage: "",
    pageTitle: "HVAC Company", // Default title
    metaDescription: "",
    isCity: false,
    isProd: false,
    isAcc: false,
    isBzn: false,
  }),

  getters: {
    getCities: (state) => state.cities,
    getProducts: (state) => state.products,
    getAccessories: (state) => state.accessories,
    getBusinesses: (state) => state.businesses,
    getSlugs: (state) => state.slugs,
    getStreetAddress: (state) => state.streetAddress,
    getCurrentPage: (state) => state.currentPage,
    getDomainName: (state) => state.domainName,
    getPageTitle: (state) => state.pageTitle,
    getMetaDescription: (state) => state.metaDescription,
  },

  actions: {
    async fetchCities() {
      // Fetch categories from an API or other source
      const cities = await $fetch("/api/cities");
      this.cities = cities ?? this.cities;
    },

    async fetchProducts() {
      // Fetch products from an API or other source
      const products = await $fetch("/api/products");
      this.products = products ?? this.products;
    },

    updatePageInfo({ page, title, description }) {
      this.currentPage = page;
      this.pageTitle = title;
      this.metaDescription = description;
    },
    setDomainName(domain) {
      this.domainName = domain ?? "hvac-company.com";
      console.log("Domain set to:", this.domainName);
    },
    setPageTitleFromRoute(domain, page = '', city = '', bzn = '', acc = '', mod = '') {
      // Format the title using our formatter
      console.log("Formatting title with:", { domain, page, city, bzn, acc, mod });
      
      try {
        const formattedTitle = formatTitle(domain, page, city, bzn, acc, mod);
        // Set the title in the store
        this.pageTitle = formattedTitle;
        console.log("Title set to:", this.pageTitle);
      } catch (error) {
        console.error("Error formatting title:", error);
        this.pageTitle = "HVAC Company"; // Fallback
      }
      
      return this.pageTitle;
    }
  },
});
