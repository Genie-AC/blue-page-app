import { defineStore } from "pinia";
import {
  CITIES,
  PRODUCTS,
  ACCESSORIES,
  BUSINESSES,
  STREET_ADDRESS,
  SLUGS,
} from "@/utils/constants";
import formatTitle from "@/plugins/title-formatter";

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
	domainName: "",
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
      this.domainName = domain;
    },
	setPageTitleFromRoute(domain) {
	console.log("setPageTitleFromRoute", domain);
	  const title = formatTitle(domain);
	  this.pageTitle = title;
	}
  },
});
