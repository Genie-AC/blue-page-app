export function formatTitle(root, page, city, acc, mod) {
    let title = root.charAt(0).toUpperCase() + root.slice(1);
    title = title.replace(/([A-Z])/g, ' $1').trim();
    title = title.replace(/\. .*/, '');
    title = title.replace(/Ptac/g, 'PTAC');
    title = title.replace(/Hvac/g, 'HVAC');
    title = title.replace(/Minisplit/g, 'Mini Split');
    title = title.replace(/Ac /g, 'AC ');
    title = title.replace(/Ac$/g, 'AC');
    title = title.replace(/Rv /g, 'RV ');
    title = title.replace(/-/g, ' ');
    title = title.replace(/hvac/g, 'HVAC');

    if (city) {
        title += ` in ${city}`;
    }

    if (page) {
        title += ` ${page}`;
    }

    return title.trim();
}

export function formatMetaDescription(title, address) {
    return `${title} ${address}. Genie Air Conditioning and Heating, Inc. is one of the largest wholesale distributors of AC mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is accomplished by our great buying power!`;
}