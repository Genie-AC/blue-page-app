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
            
        // Append city if provided (this should only happen once now)
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
        
        // Return the formatted title
        return formattedTitle.trim();
    } catch (error) {
        console.error("Error formatting title:", error);
        return "Air Conditioner"; // Default title as fallback
    }
}

export function formatMetaDescription(title, address) {
    return `${title} ${address}. Genie Air Conditioning and Heating, Inc. is one of the largest wholesale distributors of AC mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is accomplished by our great buying power!`;
}