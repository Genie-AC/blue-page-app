import { defineStore } from "pinia";
import {
  CITIES,
  PRODUCTS,
  ACCESSORIES,
  BUSINESSES,
  STREET_ADDRESS,
  SLUGS,
} from "~/utils/constants";
import formatTitle from "~/utils/formatters";

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
    pageTitle: "Air Conditioner", // Safe default
    metaDescription: "",
    errorMessage: "", // Track store-level errors
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
    getErrorMessage: (state) => state.errorMessage
  },

  actions: {
    setDomainName(domain) {
      try {
        // Check if domain is localhost and use default
        if (domain === 'localhost' || domain.includes('localhost:') || domain === '127.0.0.1') {
          this.domainName = "hvac-company.com";
        } else {
          this.domainName = domain || "hvac-company.com";
        }
        console.log("Domain set to:", this.domainName);
      } catch (error) {
        console.error("Error setting domain name:", error);
        this.errorMessage = "Failed to set domain name";
        this.domainName = "hvac-company.com"; // Set default value
      }
    },
    
    setPageTitleFromRoute(domain, page = '', city = '', bzn = '', acc = '', mod = '') {
      try {
        console.log("Formatting title with:", { domain, page, city, bzn, acc, mod });
        
        // Format the title using formatter
        const formattedTitle = formatTitle(domain, page, city, bzn, acc, mod);
        
        // Set the title in the store
        this.pageTitle = formattedTitle || "Air Conditioner"; // Fallback if formatter returns undefined
        
        console.log("Title set to:", this.pageTitle);
        return this.pageTitle;
      } catch (error) {
        console.error("Error formatting title:", error);
        this.errorMessage = "Failed to format page title";
        this.pageTitle = "Air Conditioner"; // Default title as fallback
        return this.pageTitle;
      }
    },
    
    async fetchCities() {
      try {
        // Fetch categories from an API or other source
        const cities = await $fetch("/api/cities");
        this.cities = cities || this.cities;
      } catch (error) {
        console.error("Error fetching cities:", error);
        this.errorMessage = "Failed to load cities";
        // Keep using the default CITIES from constants
      }
    },

    async fetchProducts() {
      try {
        // Fetch products from an API or other source
        const products = await $fetch("/api/products");
        this.products = products || this.products;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.errorMessage = "Failed to load products";
        // Keep using the default PRODUCTS from constants
      }
    },

    updatePageInfo({ page, title, description }) {
      this.currentPage = page;
      this.pageTitle = title;
      this.metaDescription = description;
    },
    clearError() {
      this.errorMessage = "";
    }
  },
});
