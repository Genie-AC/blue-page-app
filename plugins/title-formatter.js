export default function formatTitle(domain = "hvac-company.com", page = "", city = "", bzn = "", acc = "", mod = "") {
    // Capitalize the first letter of the domain name
    const root = domain.charAt(0).toUpperCase() + domain.slice(1);
    console.log("Root domain:", root);
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

    // Append city if provided
    if (city) {
        formattedTitle += ` in ${city}`;
    }

    // Append business context if provided
    if (bzn) {
        formattedTitle += ` for ${bzn}`;
    }

    // Append accessory context if provided
    if (acc) {
        formattedTitle += ` for ${acc}`;
    }

    // Append module context if provided
    if (mod) {
        formattedTitle += ` ${mod}`;
    }

    // Trim any extra spaces and return the formatted title
    return formattedTitle.trim();
}