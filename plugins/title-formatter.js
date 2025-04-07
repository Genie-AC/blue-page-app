export default function formatTitle(title, page, city, bzn, acc, mod) {
    const root = title.charAt(0).toUpperCase() + title.slice(1);
    let formattedTitle = root.replace(/([A-Z])/g, ' $1')
                             .replace(/\..*$/, '')
                             .replace(/Ptac/g, 'PTAC')
                             .replace(/Hvac/g, 'HVAC')
                             .replace(/Minisplit/g, 'Mini Split')
                             .replace(/Ac /g, 'AC ')
                             .replace(/Ac$/g, 'AC')
                             .replace(/Rv /g, 'RV ')
                             .replace(/-/g, ' ')
                             .replace(/hvac/g, 'HVAC');

    if (city) {
        formattedTitle += ` in ${city}`;
    }

    if (bzn) {
        formattedTitle += ` for ${bzn}`;
    }

    if (acc) {
        formattedTitle += ` for ${acc}`;
    }

    if (mod) {
        formattedTitle += ` ${mod}`;
    }

    return formattedTitle.trim();
}