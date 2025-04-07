import { defineStore } from "pinia";
import {
  CITIES,
  PRODUCTS,
  ACCESSORIES,
  BUSINESSES,
  STREET_ADDRESS,
  SLUGS,
} from "~/utils/constants";

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
    currentPage: "",
    pageTitle: "",
    metaDescription: "",
  }),

  getters: {
    getCities: (state) => state.cities,
    getProducts: (state) => state.products,
    getAccessories: (state) => state.accessories,
    getBusinesses: (state) => state.businesses,
    getSlugs: (state) => state.slugs,
    getStreetAddress: (state) => state.streetAddress,
    getCurrentPage: (state) => state.currentPage,
    getPageTitle: (state) => state.pageTitle,
    getMetaDescription: (state) => state.metaDescription,
  },

  actions: {
    async fetchCities() {
      // Fetch categories from an API or other source
      const cities = await $fetch("/api/cities");
      this.cities = cities;
    },

    async fetchProducts() {
      // Fetch products from an API or other source
      const products = await $fetch("/api/products");
      this.products = products;
    },

    updatePageInfo({ page, title, description }) {
      this.currentPage = page;
      this.pageTitle = title;
      this.metaDescription = description;
    },
  },
});
