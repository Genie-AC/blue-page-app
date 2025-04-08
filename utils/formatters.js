export default function formatTitle(domain = "hvac-company.com", page = "", city = "", bzn = "", acc = "", mod = "") {
    try {
        // Check if domain is localhost and use a default instead
        if (domain === 'localhost' || domain.includes('localhost:') || domain === '127.0.0.1') {
            domain = "hvac-company.com";
        }
        
        // Check if domain is undefined or not a string
        if (!domain || typeof domain !== 'string') {
            console.warn('formatTitle received invalid domain:', domain);
            domain = "hvac-company.com";
        }
        
        // Capitalize the first letter of the domain name
        const root = domain.charAt(0).toUpperCase() + domain.slice(1);
        
        // Format the root domain into a readable title
        let formattedTitle = root
            .replace(/([A-Z])/g, ' $1') // Add spaces before uppercase letters
            .replace(/\..*$/, '') // Remove everything after the first dot
            .replace(/Ptac/g, 'PTAC') // Replace specific substrings
            .replace(/Hvac/g, 'HVAC')
            .replace(/Minisplit/g, 'Mini Split')
            .replace(/Ac /g, 'AC ')
            .replace(/Ac$/g, 'AC')
            .replace(/Rv /g, 'RV ')
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/hvac/g, 'HVAC');
            
        // Format page (remove hyphens)
        if (page) {
            page = page.replace(/-/g, ' ');
        }
            
        // Append city if provided
        if (city) {
            formattedTitle += ` in ${city.replace(/-/g, ' ')}`;
        }
        
        // Append business context if provided
        if (bzn) {
            formattedTitle += ` for ${bzn.replace(/-/g, ' ')}`;
        }
        
        // Append accessory context if provided
        if (acc) {
            formattedTitle += ` for ${acc.replace(/-/g, ' ')}`;
        }
        
        // Append module context if provided
        if (mod) {
            formattedTitle += ` ${mod.replace(/-/g, ' ')}`;
        }
        
        // Apply title case to make sure each word is capitalized
        formattedTitle = toTitleCase(formattedTitle);
        
        // Return the formatted title
        return formattedTitle.trim();
    } catch (error) {
        console.error("Error formatting title:", error);
        return "Air Conditioner"; // Default title as fallback
    }
}

// Helper function to convert text to title case
function toTitleCase(str) {
    // List of small words that shouldn't be capitalized unless they're the first or last word
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    
    // Words we want to keep in uppercase
    const keepUppercase = /(HVAC|AC|PTAC|RV)/g;
    
    return str.replace(/\w\S*/g, function(txt, index, fullStr) {
        // Check if the word should remain in uppercase (like HVAC, AC, etc.)
        if (keepUppercase.test(txt)) {
            return txt;
        }
        
        // Skip small words that aren't the first or last unless they're capitalized in the input
        if (
            index > 0 && 
            index + txt.length < fullStr.length &&
            smallWords.test(txt) && 
            fullStr.charAt(index - 1) !== ":" &&
            fullStr.charAt(index - 1) !== "." && 
            !txt.charAt(0).match(/[A-Z]/)
        ) {
            return txt.toLowerCase();
        }
        
        // Capitalize the first character and append the rest
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function formatMetaDescription(title, address) {
    return `${title} ${address}. Genie Air Conditioning and Heating, Inc. is one of the largest wholesale distributors of AC mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is accomplished by our great buying power!`;
}