import { defineStore } from "pinia";
import {
	CITIES,
	PRODUCTS,
	ACCESSORIES,
	BUSINESSES,
	STREET_ADDRESS,
	SLUGS,
	DEFAULT_DOMAIN,
	DEFAULT_TITLE,
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
		domainName: DEFAULT_DOMAIN, // Default value
		currentPage: "",
		pageTitle: DEFAULT_TITLE, // Safe default
		metaDescription: "",
		errorMessage: "", // Track store-level errors
		isCity: false,
		isProd: false,
		isAcc: false,
		isBzn: false,
		isKw: false, // For popular keywords
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
		getErrorMessage: (state) => state.errorMessage,
	},

	actions: {
		setDomainName(domain) {
			try {
				// Check if domain is localhost and use default
				if (
					domain === "localhost" ||
					domain.includes("localhost:") ||
					domain === "127.0.0.1"
				) {
					this.domainName = DEFAULT_DOMAIN;
				} else {
					this.domainName = domain || DEFAULT_DOMAIN;
				}
				console.log("Domain set to:", this.domainName);
			} catch (error) {
				console.error("Error setting domain name:", error);
				this.errorMessage = "Failed to set domain name";
				this.domainName = DEFAULT_DOMAIN; // Set default value
			}
		},

		setPageTitleFromRoute(
			domain,
			page = "",
			isCity = false,
			isBzn = false,
			isAcc = false,
			isMod = false,
			isKw = false
		) {
			try {
				// Set flags in state
				this.isCity = isCity;
				this.isBzn = isBzn;
				this.isAcc = isAcc;
				this.isProd = isMod;
				this.isKw = isKw;

				console.log("Setting page title with parameters:", {
					domain,
					page,
					isCity,
					isBzn,
					isAcc,
					isMod,
					isKw,
				});

				// Format the title using our formatter - pass page as the appropriate parameter
				const formattedTitle = formatTitle(
					domain,
					"", // Don't pass page here to avoid duplicating it
					isCity ? page : "", // Only pass page as city if isCity flag is true
					isBzn ? page : "", // Only pass page as business if isBzn flag is true
					isAcc ? page : "", // Only pass page as accessory if isAcc flag is true
					isMod ? page : "", // Only pass page as module if isMod flag is true
					isKw ? page : "" // Only pass page as popular keyword if isKw flag is true
				);

				// Set the title in the store
				this.pageTitle = formattedTitle || DEFAULT_TITLE;
				console.log("Title set to:", this.pageTitle);
			} catch (error) {
				console.error("Error formatting title:", error);
				this.errorMessage = "Failed to format page title";
				this.pageTitle = DEFAULT_TITLE; // Default title as fallback
			}

			return this.pageTitle;
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
		},
	},
});
