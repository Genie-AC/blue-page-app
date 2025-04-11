import {
	DEFAULT_DOMAIN,
	LOCALHOST_PATTERNS,
	SPECIAL_TERMS,
	SMALL_WORDS,
	ALWAYS_UPPERCASE,
	ADJACENT_LOCATION_WORDS,
	CITIES,
	DOMAIN_TITLE_MAPPINGS,
	createDomainTitleMap,
	VIDEO_DOMAIN_WHITELIST,
} from "~/utils/constants";

// Create the domain title map once
const domainTitleRegexMap = createDomainTitleMap();

/**
 * Checks if the current domain is in the video whitelist
 *
 * @param {string} domain - The current domain name
 * @returns {boolean} - True if the domain is in the whitelist
 */
export function isVideoAllowedForDomain(domain = "") {
	// Handle empty domain case
	if (!domain || typeof domain !== "string") {
		return false;
	}

	// Remove protocol and www if present
	const cleanDomain = domain
		.replace(/^(https?:\/\/)?(www\.)?/, "")
		.split("/")[0]
		.split(":")[0];

	// Check against whitelist
	return VIDEO_DOMAIN_WHITELIST.some(
		(allowedDomain) =>
			cleanDomain === allowedDomain || cleanDomain.endsWith(`.${allowedDomain}`)
	);
}

/**
 * Formats a domain name into a readable page title with proper capitalization
 * and contextual information
 *
 * @param {string} domain - The domain name to format
 * @param {string} page - The current page name
 * @param {string} city - The city name, if any
 * @param {string} bzn - The business name, if any
 * @param {string} acc - The accessory name, if any
 * @param {string} mod - The module name, if any
 * @returns {string} - The formatted page title
 */
export default function formatTitle(
	domain = DEFAULT_DOMAIN,
	page = "",
	city = "",
	bzn = "",
	acc = "",
	mod = ""
) {
	try {
		// Get sanitized domain with fallbacks
		const sanitizedDomain = getSanitizedDomain(domain);

		// Process the domain into a readable base title
		const baseTitle = formatDomainToBaseTitle(sanitizedDomain);

		// Check for location words at the end of the title
		const locationInfo = checkAdjacentLocationWords(baseTitle);

		// Build complete title with context
		const fullTitle = buildFullTitle(
			baseTitle,
			page,
			city,
			bzn,
			acc,
			mod,
			locationInfo
		);

		// Apply title case formatting and return
		return toTitleCase(fullTitle.trim());
	} catch (error) {
		console.error("Error formatting title:", error);
		return "Air Conditioner"; // Safe fallback
	}
}

/**
 * Sanitizes the domain name and provides fallbacks for localhost or invalid domains
 *
 * @param {string} domain - The domain name to sanitize
 * @returns {string} - The sanitized domain name
 */
function getSanitizedDomain(domain) {
	// Check for invalid domain
	if (!domain || typeof domain !== "string") {
		console.warn("formatTitle received invalid domain:", domain);
		return DEFAULT_DOMAIN;
	}

	// Check for localhost patterns
	const isLocalhost = LOCALHOST_PATTERNS.some(
		(pattern) => domain === pattern || domain.includes(`${pattern}:`)
	);

	return isLocalhost ? DEFAULT_DOMAIN : domain;
}

/**
 * Gets a title from the domain mappings, handling variations with regex
 *
 * @param {string} domain - The domain to look up
 * @returns {string|null} - The mapped title or null if not found
 */
function getDomainTitleMapping(domain) {
	// Check for exact match first
	if (DOMAIN_TITLE_MAPPINGS[domain]) {
		return DOMAIN_TITLE_MAPPINGS[domain];
	}

	// Try regex patterns
	for (const [pattern, title] of domainTitleRegexMap.entries()) {
		if (pattern.test(domain)) {
			// Check if we need to pluralize based on domain pattern
			if (domain.includes("systems") && !title.includes("Systems")) {
				return title.replace("System", "Systems");
			}
			if (domain.includes("pumps") && !title.includes("Pumps")) {
				return title.replace("Pump", "Pumps");
			}
			if (domain.includes("splits") && !title.includes("Splits")) {
				return title.replace("Split", "Splits");
			}
			if (
				domain.includes("installations") &&
				!title.includes("Installations")
			) {
				return title.replace("Installation", "Installations");
			}
			if (domain.includes("services") && !title.includes("Services")) {
				return title.replace("Service", "Services");
			}

			return title;
		}
	}

	return null;
}

/**
 * Formats a domain name into a readable base title
 *
 * @param {string} domain - The sanitized domain name
 * @returns {string} - The formatted base title
 */
function formatDomainToBaseTitle(domain) {
	// Try to get the title from our mappings first (as a fallback override)
	const mappedTitle = getDomainTitleMapping(domain);
	if (mappedTitle) {
		return mappedTitle;
	}

	// Remove TLD and convert to lowercase for processing
	const domainBase = domain
		.replace(/\.(com|org|net|io|app)$/, "")
		.toLowerCase();

	// Step 1: Dictionary-based word recognition
	// Define common industry terms to look for
	const industryTerms = [
		"ac",
		"hvac",
		"split",
		"splits",
		"system",
		"systems",
		"mini",
		"heat",
		"pump",
		"pumps",
		"installation",
		"service",
		"services",
		"repair",
		"repairs",
		"air",
		"distributor",
		"distributors",
		"wholesaler",
		"wholesalers",
		"wholesale",
		"conditioning",
		"conditioner",
		"conditioners",
		"furnace",
		"furnaces",
		"unit",
		"units",
	];

	// Sort terms by length (descending) to match longest terms first
	industryTerms.sort((a, b) => b.length - a.length);

	// Step 2: Break the domain into recognized words
	let remainingText = domainBase;
	let recognizedWords = [];

	// Match known terms in the domain
	while (remainingText.length > 0) {
		let matched = false;

		// Try to match industry terms
		for (const term of industryTerms) {
			if (remainingText.startsWith(term)) {
				recognizedWords.push(term);
				remainingText = remainingText.substring(term.length);
				matched = true;
				break;
			}
		}

		// Try to match location words
		if (!matched) {
			for (const locWord of ADJACENT_LOCATION_WORDS) {
				if (remainingText.startsWith(locWord.toLowerCase())) {
					recognizedWords.push(locWord.toLowerCase());
					remainingText = remainingText.substring(locWord.length);
					matched = true;
					break;
				}
			}
		}

		// If no match, take the next character and continue
		if (!matched) {
			if (remainingText.length > 4) {
				// Try to find the next potential word boundary
				const nextIndex = Math.min(
					...industryTerms
						.map((term) => remainingText.indexOf(term))
						.filter((idx) => idx > 0)
				);

				if (nextIndex < remainingText.length && nextIndex > 0) {
					recognizedWords.push(remainingText.substring(0, nextIndex));
					remainingText = remainingText.substring(nextIndex);
				} else {
					recognizedWords.push(remainingText);
					remainingText = "";
				}
			} else {
				recognizedWords.push(remainingText);
				remainingText = "";
			}
		}
	}

	// Step 3: Apply specific formatting rules
	let formattedWords = recognizedWords.map((word) => {
		// Handle abbreviations
		if (word.toLowerCase() === "ac") return "AC";
		if (word.toLowerCase() === "hvac") return "HVAC";

		// Capitalize first letter of other words
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	// Step 4: Handle special word combinations
	let baseTitle = formattedWords.join(" ");

	// Ensure "Heat Pump" is together
	baseTitle = baseTitle.replace(/Heat\s+Pump/gi, "Heat Pump");

	// Ensure "Mini Split" is together
	baseTitle = baseTitle.replace(/Mini\s+Split/gi, "Mini Split");

	// Ensure location words have proper spacing
	ADJACENT_LOCATION_WORDS.forEach((locWord) => {
		const lcLocWord = locWord.toLowerCase();
		const pattern = new RegExp(`(\\w)${lcLocWord}`, "gi");
		baseTitle = baseTitle.replace(pattern, `$1 ${locWord}`);
	});

	// Step 5: Apply special term replacements
	Object.entries(SPECIAL_TERMS).forEach(([term, replacement]) => {
		const regex = new RegExp(term, "gi");
		baseTitle = baseTitle.replace(regex, replacement);
	});

	return baseTitle;
}

/**
 * Checks if a title ends with any of the adjacent location words
 *
 * @param {string} title - The title to check
 * @returns {Object} - Object containing information about any location matches
 */
function checkAdjacentLocationWords(title) {
	// Initialize variables
	let locationWord = "";
	let nearInTitle = false;

	// Get a random city for use if needed
	const randomLocale = CITIES[Math.floor(Math.random() * CITIES.length)];

	// Check if the title ends with any of the adjacent location words
	for (const word of ADJACENT_LOCATION_WORDS) {
		// Create a pattern that matches a location word at the end of the title
		const pattern = new RegExp(`\\b${word}\\s*$`, "i");

		// Check if the title ends with the current location word
		if (pattern.test(title)) {
			locationWord = word;
			nearInTitle = true;
			break;
		}
	}

	return {
		locationWord,
		nearInTitle,
		randomLocale,
	};
}

/**
 * Builds a complete title with contextual information
 *
 * @param {string} baseTitle - The formatted base title
 * @param {string} page - The page name
 * @param {string} city - The city name
 * @param {string} bzn - The business name
 * @param {string} acc - The accessory name
 * @param {string} mod - The module name
 * @param {Object} locationInfo - Information about location words in the title
 * @returns {string} - The complete title
 */
function buildFullTitle(
	baseTitle,
	page,
	city,
	bzn,
	acc,
	mod,
	locationInfo = {}
) {
	let fullTitle = baseTitle;
	const formatParam = (param) => (param ? param.replace(/-/g, " ") : "");

	// Special handling for content pages with location words
	// Content pages are any pages with page name, business, accessory, or module parameters
	if (locationInfo.nearInTitle && (page || bzn || acc || mod)) {
		// Extract the base part of the title (without the location word)
		const basePart = baseTitle.replace(
			new RegExp(`\\s${locationInfo.locationWord}\\s*$`, "i"),
			""
		);

		// Determine which content to integrate (priority: acc > mod > page > bzn)
		let contentParam = "";
		if (acc) contentParam = formatParam(acc);
		else if (mod) contentParam = formatParam(mod);
		else if (page) contentParam = formatParam(page);
		else if (bzn) contentParam = formatParam(bzn);

		// Reconstruct the title with content integrated before location word
		fullTitle = `${basePart} ${contentParam} ${locationInfo.locationWord}`;

		// Handle city if present
		if (city) {
			fullTitle += ` ${formatParam(city)}`;
		} else {
			// Add "You" if no city
			fullTitle += " You";
		}

		// Add remaining parameters if any (only those not already used as the primary content)
		if (bzn && contentParam !== formatParam(bzn))
			fullTitle += ` for ${formatParam(bzn)}`;
		if (acc && contentParam !== formatParam(acc))
			fullTitle += ` for ${formatParam(acc)}`;
		if (mod && contentParam !== formatParam(mod))
			fullTitle += ` ${formatParam(mod)}`;

		return fullTitle;
	}

	// Default behavior for city-only pages or home page

	// Handle city with special cases
	if (city) {
		if (locationInfo.nearInTitle) {
			fullTitle += ` ${formatParam(city)}`;
		} else {
			fullTitle += ` in ${formatParam(city)}`;
		}
	}

	// Add contextual information if provided
	if (bzn) fullTitle += ` for ${formatParam(bzn)}`;
	if (acc) fullTitle += ` for ${formatParam(acc)}`;
	if (mod) fullTitle += ` ${formatParam(mod)}`;

	// Add "You" if title ends with a location word and no parameters are specified
	if (locationInfo.nearInTitle && !city && !bzn && !acc && !mod && !page) {
		fullTitle += " You";
	}

	return fullTitle;
}

/**
 * Converts text to title case with proper capitalization rules
 *
 * @param {string} str - The string to convert to title case
 * @returns {string} - The title-cased string
 */
function toTitleCase(str) {
	// Build regex for small words
	const smallWordsRegex = new RegExp(`^(${SMALL_WORDS.join("|")})$`, "i");

	// Words that should always be uppercase
	const alwaysUppercase = new RegExp(`(${ALWAYS_UPPERCASE.join("|")})`, "g");

	return str.replace(/\w\S*/g, function (word, index, fullStr) {
		// Check if the word should remain uppercase
		if (alwaysUppercase.test(word)) {
			return word;
		}

		// Handle small words (lowercase unless first or last word)
		if (
			index > 0 &&
			index + word.length < fullStr.length &&
			smallWordsRegex.test(word) &&
			fullStr.charAt(index - 1) !== ":" &&
			fullStr.charAt(index - 1) !== "." &&
			!word.charAt(0).match(/[A-Z]/)
		) {
			return word.toLowerCase();
		}

		// Capitalize first letter, lowercase the rest
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
}

/**
 * Formats a meta description using the title and address
 *
 * @param {string} title - The page title
 * @param {string} address - The business address
 * @returns {string} - The formatted meta description
 */
export function formatMetaDescription(title, address) {
	return `${title} ${address}. Genie Air Conditioning and Heating, Inc. is one of the largest wholesale distributors of AC mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is accomplished by our great buying power!`;
}
