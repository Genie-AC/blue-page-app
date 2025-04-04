<?
include 'tag.php';
// [PREPARE-TITLES]
$root = ucfirst($root);
$title = preg_replace('/([A-Z])/', ' $1', $root);
$title = preg_replace('/\..*$/', '', $title);
$title = str_replace('Ptac', 'PTAC', $title);
$title = str_replace('Hvac', 'HVAC', $title);
$title = str_replace('Minisplit', 'Mini Split', $title);
$title = str_replace('Ac ', 'AC ', $title);
$title = preg_replace('/Ac$/', 'AC', $title);
$title = str_replace('Rv ', 'RV ', $title);
$title = str_replace('-', ' ', $title);
$title = str_replace('hvac', 'HVAC', $title);
if (isset($_GET["page"])) $page = htmlspecialchars($_GET["page"]);
if (isset($_GET["city"])) $pgCity = htmlspecialchars($_GET["city"]);
if (isset($_GET["bzn"])) $pgBzn = htmlspecialchars($_GET["bzn"]);
if (isset($_GET["acc"])) $pgAcc = htmlspecialchars($_GET["acc"]);
if (isset($_GET["mod"])) $pgMod = htmlspecialchars($_GET["mod"]);

$streetNumber = "15041 Calvert St.";
$city = "Van Nuys";
$state = "CA";
$zip = "91411";
$streetAddress = "$streetNumber, $city, $state $zip";
$adjacentLocationWords = array("near", "in", "around", "close to", "nearby", "within", "surrounding", "adjacent to", "next to", "by", "at", "in the vicinity of");
$cities = [
    "Anaheim",
    "Antioch",
    "Bakersfield",
    "Berkeley",
    "Burbank",
    "Carlsbad",
    "Chico",
    "Chula Vista",
    "Clovis",
    "Compton",
    "Concord",
    "Corona",
    "Costa Mesa",
    "Daly City",
    "Downey",
    "El Cajon",
    "El Monte",
    "Elk Grove",
    "Escondido",
    "Fairfield",
    "Fontana",
    "Folsom",
    "Fremont",
    "Fresno",
    "Fullerton",
    "Garden Grove",
    "Glendale",
    "Hayward",
    "Hemet",
    "Hesperia",
    "Huntington Beach",
    "Indio",
    "Inglewood",
    "Irvine",
    "Jurupa Valley",
    "Lake Forest",
    "Lancaster",
    "Livermore",
    "Long Beach",
    "Los Angeles",
    "Menifee",
    "Merced",
    "Milpitas",
    "Mission Viejo",
    "Modesto",
    "Moreno Valley",
    "Murrieta",
    "Napa",
    "Norwalk",
    "Oakland",
    "Oceanside",
    "Ontario",
    "Orange",
    "Oxnard",
    "Palmdale",
    "Pasadena",
    "Pomona",
    "Rancho Cucamonga",
    "Redding",
    "Redwood City",
    "Richmond",
    "Riverside",
    "Roseville",
    "Sacramento",
    "Salinas",
    "San Bernardino",
    "San Diego",
    "San Francisco",
    "San Jose",
    "San Leandro",
    "San Marcos",
    "San Mateo",
    "San Ramon",
    "Santa Ana",
    "Santa Barbara",
    "Santa Clara",
    "Santa Clarita",
    "Santa Maria",
    "Santa Monica",
    "Santa Rosa",
    "Simi Valley",
    "South Gate",
    "Stockton",
    "Sunnyvale",
    "Temecula",
    "Thousand Oaks",
    "Torrance",
    "Tracy",
    "Tustin",
    "Vacaville",
    "Vallejo",
    "Ventura",
    "Victorville",
    "Visalia",
    "Vista",
    "Walnut Creek",
    "West Covina",
    "Westminster",
    "Whittier"
];
$randomLocale = $cities[array_rand($cities)];
$titleAddon = "";
$nearInTitle = false;
foreach ($adjacentLocationWords as $word) {
    if (strtolower(substr($title, -strlen($word))) === strtolower($word)) {
        $titleAddon = "$word $randomLocale";
        $nearInTitle = true;
        break;
    }
}

if ($pgCity) {
    if (!$nearInTitle) {
        if ($page <> 'Near-Me') {
            if (mt_rand(0, 1)) {
                $page = "in $page";
            } else {
                $page = "Near $page";
            }
        }
    } else {
        if (isset($_GET["page"]) && (!$isCity && !$isAcc)) $title = preg_replace('/(?<!s)s$/', '', $title);
    }
}
if (!$isProd) {
    $slug = array("AC", "AC Unit", "Air Conditioner", "Mini Split", "Heat Pump");
    shuffle($slug);
    if ($isAcc) {
        $title .= " for ";
        if (!$page || $pgCity) $title .= array_pop($slug) . "s";
    }
    if ($pgMod) $page .= " " . array_pop($slug) . "s";
    if ($pgAcc || $pgBzn) $page = array_pop($slug) . " $page";
}
if (isset($page)) $title = "$title $page";
$title = str_replace('-', ' ', $title);

if ($titleAddon && !$pgCity) {
    $title = "$title You";
}
$current_url = $page ? $_SERVER['HTTP_HOST'] . ("/" . $page) : $_SERVER["HTTP_HOST"];
$meta_description = "$title $streetAddress. Genie Air Conditioning and Heating, Inc. is one of the largest wholesale distributors of AC mini split units in the United States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat pump, mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is accomplished by our great buying power!";
$meta_description = str_replace('  ', ' ', $meta_description);

$meta_content = "$root parent company Genie Air Conditioning &amp; Heating Inc. is one of the largest wholesale-Distributors of Mini Splits, wall &amp; window AC's, portable air conditioners, single and dual zone mini splits and so much more.  We stock over 300,000 units. Complete mini splits starting at only $438.00"
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="icon" type="image/png" href="https://<? echo $root ?>/favicon.png" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <? echo $title ?>
    </title>
    <meta name="description" content='<? echo "$root $meta_description" ?>' />
    <meta name="description" content="<? echo $meta_content ?>" />
    <link rel="canonical" href="https://<? echo " $_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>" />
    <meta property="og:title"
        content="<? echo $root ?> | Mini Split Heat Pumps starting at $438.00 <? echo $streetAddress ?>" />
    <meta property=" og:description" content="<? echo $meta_content ?>" />
    <meta property="og:url" content="https://www.<? echo $root ?>" />
    <meta property="og:site_name" content="<? echo $root ?>" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<? echo $root ?> | Mini Split Heat Pumps starting at $438.00" .
        $streetAddress />
    <meta name="twitter:description" content="<? echo $meta_content ?>" />
    <style>
    body {
        margin: 0;
        font: 1rem/1.5rem sans-serif;
        background: linear-gradient(90deg, #005efe 0%, #c2d9ff 50%, #005efe 100%)
    }

    main {
        background: #005efe;
        margin: 1rem;
        padding: 2em 1em;
        border-radius: 8px;
        border: 1px solid #ffffff44
    }

    img {
        max-width: 100%
    }

    a {
        text-decoration: none;
        color: lightgray
    }

    a:hover {
        color: #0ff;
        transition: all .3s ease
    }

    .flex,
    div,
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5em
    }

    .column,
    div {
        flex-direction: column;
    }

    .inline {
        display: inline
    }

    .text-center {
        text-align: center
    }

    .gap-0 {
        gap: 0 !important
    }

    .gap-4 {
        gap: 4px !important
    }

    .white {
        color: #fff;
    }

    .b {
        font-weight: bold
    }

    .text-upper {
        text-transform: uppercase;
    }

    .text-xs {
        font-size: .75rem;
        line-height: 1rem
    }

    .text-xl {
        font-size: 1.25rem;
        line-height: 1.75rem
    }

    .text-2xl {
        font-size: 1.5rem;
        line-height: 2rem
    }

    .text-5xl {
        font-size: 3rem;
        line-height: 1
    }

    .text-7xl {
        font-size: 3rem;
        line-height: 1
    }

    .mobile-column-reverse {
        display: flex;
        flex-direction: column-reverse;
        gap: 1.5em;
    }

    .video-row {
        display: block;
    }

    .video-title {
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin-bottom: .1rem;
        font-style: italic;
    }

    .main__enter {
        padding: .5rem;
        background: linear-gradient(0deg, rgba(156, 0, 14, 1) 0%, rgba(154, 14, 23, 1) 36%, rgba(216, 89, 93, 1) 54%, rgba(233, 16, 37, 1) 76%)
    }

    .main__enter:hover {
        box-shadow: 0 0 1rem blue;
        transition: all .3s ease;
        color: #0ff
    }

    .pointer {
        cursor: pointer
    }

    address {
        gap: 0 !important;
        padding: 2rem 1rem
    }

    .banner {
        z-index: 1
    }

    .cities {
        flex-wrap: wrap
    }

    .places {
        display: block;
        width: 68.7vw;
        overflow: hidden;
        background: #005efe;
    }

    .products_title {
        margin: 3em auto;
        max-width: 68.7vw;
    }

    .margin {
        margin: auto;
    }

    i,
    em {
        font-style: normal
    }

    footer {
        display: flex;
        flex-direction: column;
        gap: 3em;
        color: #fff;
        background: #000;
        padding: 3em 1.5em 8em;
    }

    .word__bkt {
        align-items: stretch
    }

    .word__bkt>section {
        display: flex;
        flex-direction: column;
        gap: 8px
    }

    .word__bkt label {
        font: 700 15px sans-serif;
        text-transform: uppercase;
    }

    .word__bkt>section>div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(15px, auto);
        row-gap: 6px;
        column-gap: 1.5em;
        margin: 8px 0;
        align-items: center;
    }

    .word__bkt>section>div>a {
        text-wrap: pretty;
        font: 12px/16px sans-serif
    }

    .footer__copy {
        max-width: 300px;
        justify-content: flex-start;
        text-align: center;
        margin: auto
    }

    .footer__copy b {
        font: 700 32px sans-serif;
        text-wrap: pretty
    }

    #cities {
        gap: 8px 1.5em
    }

    @keyframes marquee {
        from {
            translate: 100%
        }

        to {
            translate: -100%
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        .show {
            animation: show ease .35s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            opacity: 0
        }

        @keyframes show {
            0% {
                opacity: 0;
                transform: translateY(-20em)
            }

            50% {
                transform: translateY(.3em)
            }

            100% {
                transform: translateY(0);
                opacity: 1
            }
        }

        .show * {
            animation: show__inside ease .7s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-delay: .35s;
            opacity: 0
        }

        @keyframes show__inside {
            0% {
                opacity: 0
            }

            50% {
                opacity: 0
            }

            100% {
                opacity: 1
            }
        }

        .place__bkt {
            animation: marquee 66s linear infinite
        }
    }

    @media (min-width: 930px) {
        main {
            width: 68.7vw;
            min-width: 640px;
            margin: 0 auto;
            padding: 2rem 0 0;
            border: 0;
            border-radius: 0
        }

        section {
            padding: 0 6rem 4rem
        }

        .word__bkt>section>div {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(15px, auto);
            row-gap: 6px;
        }

        .video-row {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }

        .video-title {
            margin-bottom: .25rem;
        }

        .mobile-column-reverse {
            flex-direction: column;
        }

        .mainFooter {
            display: flex;
            width: 68.7vw;
            margin: 0 auto;
            background: linear-gradient(0deg, #005efe00 0%, #005efe 90%);
            height: 4rem;
        }

        .text-7xl {
            font-size: 4.5rem;
            line-height: 1
        }

        .word__bkt>i>div {
            grid-template-columns: repeat(6, 1fr)
        }

        footer {
            flex-direction: row
        }

        .footer__copy {
            border-right: 1px solid;
            padding-right: 3em;
            margin: 0;
        }

        .word__bkt {
            width: 68.7vw
        }
    }

    @media (min-width: 1200px) {
        .word__bkt>section>div {
            grid-template-columns: repeat(5, 1fr);
            grid-auto-rows: minmax(15px, auto);
            row-gap: 6px;
        }
    }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <main class="flex column show">
        <h1 class="white b text-5xl text-center">
            <? echo $title ?>
        </h1>
        <a href="https://<? echo $root ?>"><img class="" src="https://<? echo $root ?>/banner.png" alt="<? echo "
                $title" ?>"></a>
        <div class="mobile-column-reverse">
            <div class="video-row">
                <div>

                    <p class="video-title">Check out a small portion of our place!</p>
                    <iframe src="https://www.youtube.com/embed/q-XH4GcoMI4?si=AMYEibW3XQtf4j0T"
                        title="Genie AC - We Don't Run out of Units!" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div>
                    <p class="video-title">We can heat you up or cool you down!</p>
                    <iframe src="https://www.youtube.com/embed/JHBzZK7p4gk?si=AMYEibW3XQtf4j0T"
                        title="GenieAC.com sells only the best" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                </div>
            </div>
            <div class="gap-4"><a href="https://airconditioner.com/"
                    class="main__enter b text-5xl white text-upper">Enter</a><span
                    class="main__enter--bottom white text-xs">(Our Main Website)</span>
            </div>
        </div>
        <section class="white text-xl">
            <p>
                <? echo $current_url; ?> (<a href="https://airconditioner.com" class="link">Genie Air Conditioning
                    and
                    Heating, Inc.</a>) is one of the Largest Wholesale Distributors of AC mini split units in the
                United
                States. Looking for quality Air Conditioner units nearby? Contact us for a wide variety of heat
                pump,
                mini splits, room air conditioners, window air conditioners, PTAC, wall air conditioners, indoor and
                outdoor a/c units, and heating and cooling accessories for your AC needs. Wholesale Distributors is
                accomplished by our great buying power!
            <p>We are one of the largest wholesale distributors of air conditioner and heat pump ac mini split
                systems
                in the United States. Contact us for a wide variety of climate control systems. We carry top brands
                such
                as: Genie Aire, LG, Midea, Cooper and Hunter, Alice, Sophia, OLMO, Victoria, Frigidaire, Samsung,
                Soleus, Amana, Arctic King, General Electric, and so many more.
                <? echo $title ?>.
            <address class="flex column gap-4"><span class="inline text-center"><em
                        class="fa-solid fa-location-dot"></em>&thinsp;15041 Calvert Street&ensp;&bull; Van Nuys, CA
                    91411</span><a href="tel:8187854151" class="inline"><i class="fa-solid fa-phone"></i>&thinsp;(818)
                    785-4151</a></address><span class=" b text-2xl text-center">We Cover Thousands of Cities
                Throughout
                </br>The United States!</span>
        </section>
    </main>
    <span class='mainFooter show'></span>
    <footer class="show">
        <div class='footer__copy'><a href="https://airconditioner.com/"><img
                    src="https://<? echo $root ?>/genie-logo-ribbon-2.svg" alt="Genie Air"></a><strong>
                <? echo "$title" ?>
            </strong><em>"One of the largest Wholesale Distributor's in the United States!"</em></div>
        <div class='word__bkt'>
            <? if (!$isCity) { ?>
            <section><label>Cities We Service</label>
                <div id='cities'>
                    <?php
                        foreach ($cities as $city) {
                            echo "<a href='index.php?page=" . str_replace(' ', '-', $city) . "&city=1'>" . $city . "</a>";
                        }
                        ?>
                </div>
            </section>
            <? } ?>
            <? if (!$isProd) { ?>
            <section><label>Products We Carry</label>
                <div>
                    <?php
                        $products = array(
                            "Motel PTACs",
                            "Hotel PTACs",
                            "Packaged Terminal Air Conditioners",
                            "Packaged Air Conditioners",
                            "Packaged Heat Pump",
                            "Packaged Air Conditioning",
                            "Packaged Gas Electric Air Conditioning",
                            "Heaters",
                            "Furnaces",
                            "Air Conditioners",
                            "Air Conditioning",
                            "AC Units",
                            "Air Conditioner Units",
                            "HVAC Mini Splits",
                            "Mini Splits",
                            "Heat Pump Mini Splits",
                            "Mini Split Heat Pumps",
                            "Heat Pumps",
                            "Swamp Coolers",
                            "Dehumidifiers",
                            "Systems",
                            "High Efficiency",
                            "Reconditioned",
                            "Energy Saving",
                            "Through Wall",
                            "Through the Wall",
                            "Wall Mounted",
                            "Low Profile",
                            "Commercial",
                            "Residential",
                            "Wall Mount",
                            "Wall",
                            "Apartment",
                            "Efficient",
                            "Multizone",
                            "Multiroom",
                            "Room",
                            "Dual Zone",
                            "Multi Zone",
                            "Single Zone",
                            "Ductless",
                            "Electric",
                            "Builders",
                            "Infrared",
                            "Ventless",
                            "Window",
                            "Slide Out",
                            "Slimline",
                            "Thruwall",
                            "Vertical",
                            "Portable",
                            "Outdoor",
                            "Indoor",
                            "Bedroom",
                            "Central",
                            "Radiant",
                            "Rooftop",
                            "Vented",
                            "Ducted",
                            "Ductless",
                            "Remanufactured",
                            "Comfort Star",
                            "Genie Aire",
                            "Cooper and Hunter",
                            "CH",
                            "Genie",
                        );

                        foreach ($products as $product) {
                            if (strpos($product, ' ') !== false) {
                                echo "<a href='index.php?page=" . str_replace(' ', '-', $product) . "&mod=1'>" . $product . "</a>";
                            } else {
                                echo "<a href='index.php?page=" . $product . "'>" . $product . "</a>";
                            }
                        }
                        ?>

                </div>
            </section>
            <? }
            if (!$isAcc && !$isBzn) { ?>
            <section><label>Accessories We Carry</label>
                <div>
                    <?php
                        $accessories = array(
                            "Remote Controls",
                            "Transformers",
                            "Refrigerants",
                            "Thermostats",
                            "Compressors",
                            "Accessories",
                            "Condensers",
                            "Capacitors",
                            "Appliances",
                            "Inverters",
                            "Supplies",
                            "Brackets",
                            "Switches",
                            "Cassettes",
                            "Filters",
                            "Sleeves",
                            "Linesets",
                            "Remotes",
                            "Tools",
                            "Coils",
                            "Freon",
                            "Knobs",
                            "Heat Strips"
                        );

                        foreach ($accessories as $accessory) {
                            echo "<a href='index.php?page=" . str_replace(' ', '-', $accessory) . "&acc=1'>" . $accessory . "</a>";
                        }
                        ?>
                </div>
            </section>
            <? }
            if (!$isBzn && !$isAcc) { ?>
            <section><label>Our Services</label>
                <div>
                    <?php
                        $businesses = array(
                            "Manufacturers",
                            "Distributors",
                            "Wholesalers",
                            "Liquidators",
                            "Warranties",
                            "Equipment",
                            "Closeouts",
                            "Discounts",
                            "Financing",
                            "Suppliers",
                            "Warehouse",
                            "Specials",
                            "Products",
                            "Supplies",
                            "Dealers",
                            "Ratings",
                            "Rebates",
                            "Surplus",
                            "Parts",
                            "Sales",
                            "Repair",
                            "Service",
                            "Installation",
                            "For Homes",
                            "For Hotels",
                            "For Apartments"
                        );

                        foreach ($businesses as $business) {
                            echo "<a href='index.php?page=" . str_replace(' ', '-', $business) . "&bzn=1'>" . $business . "</a>";
                        }
                        ?>
                </div>
            </section>
            <? } ?>
        </div>
    </footer>
</body>

</html>