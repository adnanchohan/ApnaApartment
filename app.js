/**
 * ApnaApartments.com - Main Application Logic
 * Powered by pure Javascript (ES6)
 * Inspired by Zameen.com UI/UX
 */

// --- 1. Mock Apartment Dataset (10 Premium Properties in Pakistan) ---
const APARTMENTS_DATA = [
  {
    id: 1,
    title: "Luxury 3-Bed Penthouse with Arabian Sea View",
    price: 65000000, // PKR 6.5 Crore
    priceDisplay: "PKR 6.5 Crore",
    purpose: "sale", // "sale" or "rent"
    bedrooms: 3,
    bathrooms: 4,
    area: 2800, // Sq Ft
    location: "Clifton, Karachi",
    city: "Karachi",
    description: "Experience ultra-luxurious living in this stunning 3-bedroom penthouse located in the heart of Clifton. Features floor-to-ceiling windows with panoramic Arabian Sea views, a state-of-the-art kitchen, designer bathrooms, and premium Italian marble flooring. Ideal for corporate executives and elite families.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // Exterior/living
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", // Interior living
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"  // Bedroom
    ],
    amenities: ["Sea View", "Swimming Pool", "24/7 Security", "Power Backup", "Gym", "High-Speed Elevators", "2 Covered Parking slots"],
    floor: "Penthouse (18th Floor)",
    furnished: "furnished", // "furnished", "unfurnished", "semi-furnished"
    isSuperHot: true,
    coordinates: [24.8162, 67.0315], // Clifton, Karachi
    contact: {
      phone: "+923001234567",
      whatsapp: "923001234567"
    }
  },
  {
    id: 2,
    title: "Modern 2-Bedroom Apartment in DHA Phase 6",
    price: 32000000, // PKR 3.2 Crore
    priceDisplay: "PKR 3.2 Crore",
    purpose: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    location: "DHA Phase 6, Lahore",
    city: "Lahore",
    description: "A newly constructed, modern 2-bedroom apartment offering luxury and convenience. Located in the highly sought-after DHA Phase 6, Lahore. Boasts premium finishes, solid woodwork, imported sanitary fittings, and secure gated community living with high-speed internet and backup generators.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Gated Community", "Dedicated Parking", "Gas Connection", "Kids Play Area", "24/7 Security", "Gym"],
    floor: "3rd Floor",
    furnished: "unfurnished",
    isSuperHot: false,
    coordinates: [31.4697, 74.4069], // DHA Phase 6, Lahore
    contact: {
      phone: "+923219876543",
      whatsapp: "923219876543"
    }
  },
  {
    id: 3,
    title: "Elegant 1-Bed Bachelor Pad in F-11 Heights",
    price: 135000, // PKR 1.35 Lakh/Month
    priceDisplay: "PKR 1.35 Lakh / Month",
    purpose: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    location: "F-11, Islamabad",
    city: "Islamabad",
    description: "Perfect for single professionals or young couples, this fully furnished 1-bedroom flat in F-11 Heights offers luxury at an affordable price. Features elegant lighting, a cozy open-plan kitchen, central air conditioning, and quick walking distance to F-11 Markaz shops and restaurants.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Fully Furnished", "Central AC", "Elevator", "High-speed Wi-Fi", "Walk-in Closet", "CCTV Surveillance"],
    floor: "5th Floor",
    furnished: "furnished",
    isSuperHot: true,
    coordinates: [33.6844, 72.9886], // F-11, Islamabad
    contact: {
      phone: "+923334567890",
      whatsapp: "923334567890"
    }
  },
  {
    id: 4,
    title: "Spacious 3-Bed Family Apartment in Gulshan-e-Iqbal",
    price: 21000000, // PKR 2.1 Crore
    priceDisplay: "PKR 2.1 Crore",
    purpose: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    location: "Gulshan-e-Iqbal Block 13-D, Karachi",
    city: "Karachi",
    description: "An excellent residential choice for medium-sized families. This well-maintained apartment in Gulshan-e-Iqbal offers 3 spacious bedrooms with attached baths, a massive TV lounge, a separate drawing room, and a double-view balcony. Features continuous water supply and gas connections.",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Balcony", "Gas Connection", "Water Boring", "Power Backup", "Nearby Park", "Security Guard"],
    floor: "1st Floor",
    furnished: "semi-furnished",
    isSuperHot: false,
    coordinates: [24.9180, 67.0970], // Gulshan-e-Iqbal, Karachi
    contact: {
      phone: "+923007654321",
      whatsapp: "923007654321"
    }
  },
  {
    id: 5,
    title: "Premium 3-Bedroom Flat in DHA Phase 5 (Emaar)",
    price: 350000, // PKR 3.5 Lakh/Month
    priceDisplay: "PKR 3.5 Lakh / Month",
    purpose: "rent",
    bedrooms: 3,
    bathrooms: 4,
    area: 2600,
    location: "Emaar Crescent Bay, DHA Phase 8, Karachi",
    city: "Karachi",
    description: "Live on the ocean edge in Karachi's premium Emaar development. This 3-bedroom luxury apartment features top-tier finishes, sea view balconies, infinity pool access, professional gym membership, underground card-secured parking, and round-the-clock five-star security.",
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Infinity Pool", "Ocean View", "Private Beach Access", "Centrally Air Conditioned", "24/7 Concierge", "Fitness Club", "Elevator Control Card"],
    floor: "12th Floor",
    furnished: "furnished",
    isSuperHot: true,
    coordinates: [24.7820, 67.0700], // Emaar Crescent Bay
    contact: {
      phone: "+923121112233",
      whatsapp: "923121112233"
    }
  },
  {
    id: 6,
    title: "Cozy 2-Bed Flat in Askari 11, Lahore",
    price: 85000, // PKR 85,000/Month
    priceDisplay: "PKR 85,000 / Month",
    purpose: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: "Askari 11, Bedian Road, Lahore",
    city: "Lahore",
    description: "Highly secure and peaceful 2-bedroom rental apartment in Askari 11, Lahore. Excellent layout with wide windows offering green views of Askari gardens. Includes backup electricity, waste management, dedicated parking space, and gated military-grade security systems.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Military Gated Security", "Power Backup", "Dedicated Parking", "Jogging Track", "Lush Green Views", "Waste Disposal"],
    floor: "4th Floor",
    furnished: "semi-furnished",
    isSuperHot: false,
    coordinates: [31.4420, 74.4500], // Askari 11, Lahore
    contact: {
      phone: "+923455554321",
      whatsapp: "923455554321"
    }
  },
  {
    id: 7,
    title: "Luxury 4-Bed Duplex in E-11, Islamabad",
    price: 85000000, // PKR 8.5 Crore
    priceDisplay: "PKR 8.5 Crore",
    purpose: "sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
    location: "E-11/2, Margalla Hills View, Islamabad",
    city: "Islamabad",
    description: "This majestic 4-bedroom duplex apartment showcases Margalla Hills views from its private terrace. Spanning over two stories, it features double-height ceilings, a wood-burning fireplace lounge, premium open kitchen, custom built-in closets, and smart home automation system.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Private Terrace", "Margalla View", "Smart Home Tech", "Fireplace", "Duplex Layout", "Jacuzzi", "4 Dedicated Parking spaces"],
    floor: "Top Duplex (9th & 10th Floor)",
    furnished: "furnished",
    isSuperHot: true,
    coordinates: [33.7020, 72.9720], // E-11, Islamabad
    contact: {
      phone: "+923211234567",
      whatsapp: "923211234567"
    }
  },
  {
    id: 8,
    title: "Brand New 2-Bed Luxury Suite in Bahria Town Townships",
    price: 17500000, // PKR 1.75 Crore
    priceDisplay: "PKR 1.75 Crore",
    purpose: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    location: "Bahria Heights, Bahria Town Phase 8, Rawalpindi",
    city: "Rawalpindi",
    description: "An elegant, ready-to-move-in apartment in the secure Bahria Town Phase 8. High build quality with Spanish bathroom tiling, modern kitchen amenities, large balcony with sunrise view, and 24/7 maintenance support. Excellent investment option yielding high rental ROI.",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Balcony View", "24/7 Maintenance Support", "Cinema Nearby", "Gated Access Control", "Commercial Hub Walkway", "Gas Grid"],
    floor: "2nd Floor",
    furnished: "unfurnished",
    isSuperHot: false,
    coordinates: [33.5180, 73.0850], // Bahria Phase 8
    contact: {
      phone: "+923366669999",
      whatsapp: "923366669999"
    }
  },
  {
    id: 9,
    title: "Fully Furnished Studio Apartment in Giga Mall Heights",
    price: 75000, // PKR 75,000/Month
    priceDisplay: "PKR 75,000 / Month",
    purpose: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    location: "DHA Phase 2, Islamabad",
    city: "Islamabad",
    description: "Premium studio apartment located directly above Giga Mall, Islamabad. Steps away from elite dining, shopping, and entertainment. Perfect for business travelers or individuals looking for top comfort with full service amenities, central heating, cooling, and absolute security.",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Connected to Shopping Mall", "Central HVAC", "Concierge Desk", "Valet Parking", "Dry Cleaning Service", "24/7 Security Patrols"],
    floor: "8th Floor",
    furnished: "furnished",
    isSuperHot: true,
    coordinates: [33.5250, 73.1610], // Giga Mall, DHA 2
    contact: {
      phone: "+923000000000",
      whatsapp: "923000000000"
    }
  },
  {
    id: 10,
    title: "Affordable 2-Bed Family Apartment in Gulberg Greens",
    price: 12000000, // PKR 1.2 Crore
    priceDisplay: "PKR 1.2 Crore",
    purpose: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    location: "Gulberg Greens Block D, Islamabad",
    city: "Islamabad",
    description: "An incredibly priced 2-bedroom apartment in Islamabad's greenest community - Gulberg Greens. This unit features beautiful garden view windows, high ceilings, custom wooden kitchen cabinets, secure layout, and immediate access to community mosques, parks, and schools.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Park View", "24/7 Gated Security", "Lush Green Parks", "Water Filter Plant Access", "Dedicated Ground Parking"],
    floor: "Ground Floor",
    furnished: "unfurnished",
    isSuperHot: false,
    coordinates: [33.6190, 73.1250], // Gulberg Greens
    contact: {
      phone: "+923215556666",
      whatsapp: "923215556666"
    }
  }
];

// --- 2. Global Variables ---
let map;
let markersGroup;
let activeFilters = {
  purpose: "all", // "all", "sale", "rent"
  city: "all",
  priceMin: 0,
  priceMax: 150000000, // Default 15 Crore max
  bedrooms: "all",
  furnished: "all" // "all", "furnished", "unfurnished", "semi-furnished"
};
let favorites = JSON.parse(localStorage.getItem("apna_apartments_favs")) || [];

// --- 3. Initializations ---
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initSliders();
  renderApartments(APARTMENTS_DATA);
  updateFavoritesUI();
  setupEventListeners();
});

// --- 4. Map Functions ---
function initMap() {
  const mapContainer = document.getElementById("map-view");
  if (!mapContainer || window.getComputedStyle(mapContainer).display === "none") {
    return; // Skip initialization if map is hidden in CSS
  }

  // Center map on Pakistan center (e.g. Islamabad coordinates area or average of data)
  map = L.map("map-view").setView([31.5, 71.5], 6); // Global view of Pakistan

  // Use elegant tile layer
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);
  updateMapMarkers(APARTMENTS_DATA);
}

function updateMapMarkers(apartments) {
  if (!map || !markersGroup) return; // Skip if map is not initialized
  markersGroup.clearLayers();
  
  if (apartments.length === 0) return;

  const latLngs = [];
  
  apartments.forEach(apt => {
    if (apt.coordinates && apt.coordinates.length === 2) {
      // Premium dark-green/emerald pin styling
      const pinHtml = `
        <div class="custom-map-pin ${apt.isSuperHot ? 'super-hot-pin' : ''}">
          <span class="pin-price">${formatPriceShort(apt.price, apt.purpose)}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: "custom-div-icon",
        iconSize: [80, 30],
        iconAnchor: [40, 15]
      });

      const marker = L.marker(apt.coordinates, { icon: customIcon })
        .bindPopup(`
          <div class="map-popup-card">
            <img src="${apt.images[0]}" alt="${apt.title}" class="popup-img">
            <div class="popup-info">
              <span class="popup-purpose ${apt.purpose}">${apt.purpose.toUpperCase()}</span>
              <h4 class="popup-title">${apt.title}</h4>
              <p class="popup-price">${apt.priceDisplay}</p>
              <button class="popup-view-btn" onclick="openDetailsModal(${apt.id})">Quick View</button>
            </div>
          </div>
        `, { maxWidth: 220 });

      markersGroup.addLayer(marker);
      latLngs.push(apt.coordinates);
    }
  });

  // Fit boundaries nicely
  if (latLngs.length > 0) {
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  }
}

// --- 5. Short Price Formatter (e.g. 6.5 Crore -> 6.5C, 85 Lakh -> 85L) ---
function formatPriceShort(price, purpose) {
  let formatted = "";
  if (price >= 10000000) {
    formatted = (price / 10000000).toFixed(1) + " Cr";
  } else if (price >= 100000) {
    formatted = (price / 100000).toFixed(0) + " L";
  } else {
    formatted = price.toLocaleString();
  }
  return purpose === "rent" ? `${formatted}/m` : formatted;
}

// --- 6. Range Sliders & Tabs ---
function initSliders() {
  const priceSlider = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");

  // Dynamic label updating
  priceSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    activeFilters.priceMax = val;
    priceValue.innerText = `Up to: ${formatPriceLabel(val)}`;
    filterApartments();
  });
}

function formatPriceLabel(val) {
  if (val >= 10000000) {
    return `PKR ${(val / 10000000).toFixed(2)} Crore`;
  } else if (val >= 100000) {
    return `PKR ${(val / 100000).toFixed(2)} Lakh`;
  } else {
    return `PKR ${val.toLocaleString()}`;
  }
}

// --- 7. Core Filtering Logic ---
function filterApartments() {
  const filtered = APARTMENTS_DATA.filter(apt => {
    // 1. Purpose (Buy vs Rent)
    if (activeFilters.purpose !== "all" && apt.purpose !== activeFilters.purpose) {
      return false;
    }
    // 2. City
    if (activeFilters.city !== "all" && apt.city !== activeFilters.city) {
      return false;
    }
    // 3. Price Range
    if (apt.price > activeFilters.priceMax) {
      return false;
    }
    // 4. Bedrooms
    if (activeFilters.bedrooms !== "all") {
      const bedsFilter = parseInt(activeFilters.bedrooms);
      if (bedsFilter === 4) {
        if (apt.bedrooms < 4) return false; // "4+" beds option
      } else if (apt.bedrooms !== bedsFilter) {
        return false;
      }
    }
    // 5. Furnished Status
    if (activeFilters.furnished !== "all" && apt.furnished !== activeFilters.furnished) {
      return false;
    }
    return true;
  });

  renderApartments(filtered);
  updateMapMarkers(filtered);
}

// --- 8. Render Grid Cards (Zameen Style) ---
function renderApartments(apartments) {
  const grid = document.getElementById("listings-grid");
  const countSpan = document.getElementById("results-count");
  
  grid.innerHTML = "";
  countSpan.innerText = `${apartments.length} Properties Found`;

  if (apartments.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h3>No Listings Match Your Filters</h3>
        <p>Try expanding your search criteria or resetting the filters.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  apartments.forEach(apt => {
    const isFav = favorites.includes(apt.id);
    const card = document.createElement("div");
    card.className = `property-card ${apt.isSuperHot ? 'super-hot' : ''}`;
    
    card.innerHTML = `
      <div class="card-img-container">
        <img src="${apt.images[0]}" alt="${apt.title}" class="property-img">
        <div class="card-badges">
          <span class="badge badge-purpose ${apt.purpose}">${apt.purpose === 'sale' ? 'FOR SALE' : 'FOR RENT'}</span>
          ${apt.isSuperHot ? '<span class="badge badge-featured"><i class="fas fa-fire"></i> SUPER HOT</span>' : ''}
          <span class="badge badge-furnished">${apt.furnished.toUpperCase()}</span>
        </div>
        <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${apt.id})" title="Add to Shortlist">
          <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="card-content">
        <div class="card-price-row">
          <h3 class="property-price">${apt.priceDisplay}</h3>
          <span class="property-location-tag"><i class="fas fa-map-marker-alt"></i> ${apt.city}</span>
        </div>
        <h4 class="property-title" onclick="openDetailsModal(${apt.id})">${apt.title}</h4>
        <p class="property-address">${apt.location}</p>
        
        <div class="property-specs">
          <span><i class="fas fa-bed"></i> ${apt.bedrooms} Bed</span>
          <span><i class="fas fa-bath"></i> ${apt.bathrooms} Bath</span>
          <span><i class="fas fa-ruler-combined"></i> ${apt.area.toLocaleString()} Sq Ft</span>
          <span><i class="fas fa-building"></i> Floor: ${apt.floor.split(' ')[0]}</span>
        </div>

        <p class="property-excerpt">${apt.description.substring(0, 100)}...</p>

        <div class="card-footer">
          <button class="btn btn-outline" onclick="openDetailsModal(${apt.id})">Details</button>
          <div class="card-contact-actions">
            <a href="tel:${apt.contact.phone}" class="contact-action call-action" title="Call Now">
              <i class="fas fa-phone-alt"></i>
            </a>
            <a href="https://wa.me/${apt.contact.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20your%20property%20%22${encodeURIComponent(apt.title)}%22%20listed%20on%20ApnaApartments.com.%20Please%20share%20details." target="_blank" class="contact-action wa-action" title="WhatsApp Inquiry">
              <i class="fab fa-whatsapp"></i>
            </a>
            <button class="contact-action mail-action" onclick="openContactModal(event, ${apt.id})" title="Send Message">
              <i class="far fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --- 9. Event Listeners Setup ---
function setupEventListeners() {
  // Purpose tabs (Rent / Buy / All)
  const tabBuy = document.getElementById("tab-buy");
  const tabRent = document.getElementById("tab-rent");
  const tabAll = document.getElementById("tab-all");

  const updatePurposeActiveTab = (activeTab, purposeValue) => {
    [tabBuy, tabRent, tabAll].forEach(t => t.classList.remove("active"));
    activeTab.classList.add("active");
    activeFilters.purpose = purposeValue;
    
    // Adjust default prices sliders range automatically based on rent vs sale
    const priceSlider = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    if (purposeValue === "rent") {
      priceSlider.max = 1000000; // max rent 10 Lakh
      priceSlider.min = 20000;
      priceSlider.value = 500000;
      activeFilters.priceMax = 500000;
    } else {
      priceSlider.max = 150000000; // max buy 15 Crore
      priceSlider.min = 5000000;
      priceSlider.value = 100000000;
      activeFilters.priceMax = 100000000;
    }
    priceValue.innerText = `Up to: ${formatPriceLabel(activeFilters.priceMax)}`;
    filterApartments();
  };

  tabBuy.addEventListener("click", () => updatePurposeActiveTab(tabBuy, "sale"));
  tabRent.addEventListener("click", () => updatePurposeActiveTab(tabRent, "rent"));
  tabAll.addEventListener("click", () => updatePurposeActiveTab(tabAll, "all"));

  // City dropdown change
  document.getElementById("filter-city").addEventListener("change", (e) => {
    activeFilters.city = e.target.value;
    filterApartments();
  });

  // Bedrooms buttons
  const bedBtns = document.querySelectorAll(".bed-btn");
  bedBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      bedBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilters.bedrooms = btn.dataset.beds;
      filterApartments();
    });
  });

  // Furnished dropdown change
  document.getElementById("filter-furnished").addEventListener("change", (e) => {
    activeFilters.furnished = e.target.value;
    filterApartments();
  });

  // Search Input box (filters title/description)
  document.getElementById("search-input").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = APARTMENTS_DATA.filter(apt => {
      const matchQuery = apt.title.toLowerCase().includes(query) || 
                         apt.location.toLowerCase().includes(query) ||
                         apt.description.toLowerCase().includes(query);
      
      // Match other active filters
      const matchPurpose = activeFilters.purpose === "all" || apt.purpose === activeFilters.purpose;
      const matchCity = activeFilters.city === "all" || apt.city === activeFilters.city;
      const matchPrice = apt.price <= activeFilters.priceMax;
      const matchFurnished = activeFilters.furnished === "all" || apt.furnished === activeFilters.furnished;
      
      let matchBed = true;
      if (activeFilters.bedrooms !== "all") {
        const bedsVal = parseInt(activeFilters.bedrooms);
        matchBed = (bedsVal === 4) ? (apt.bedrooms >= 4) : (apt.bedrooms === bedsVal);
      }

      return matchQuery && matchPurpose && matchCity && matchPrice && matchFurnished && matchBed;
    });
    renderApartments(filtered);
    updateMapMarkers(filtered);
  });

  // Modal Closures
  document.querySelectorAll(".close-modal").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      document.getElementById("details-modal").classList.remove("active");
      document.getElementById("contact-modal").classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close modals clicking backdrop
  window.addEventListener("click", (e) => {
    const detailsM = document.getElementById("details-modal");
    const contactM = document.getElementById("contact-modal");
    if (e.target === detailsM) {
      detailsM.classList.remove("active");
      document.body.style.overflow = "auto";
    }
    if (e.target === contactM) {
      contactM.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Form submission handling (simulated)
  document.getElementById("contact-form-submit").addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector("button[type='submit']");
    const initialText = submitBtn.innerHTML;
    
    // Animate state change
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Sending message...`;

    setTimeout(() => {
      submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Message Sent Successfully!`;
      submitBtn.style.backgroundColor = "var(--accent-green)";
      
      // Reset after a delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = initialText;
        submitBtn.style.backgroundColor = "";
        e.target.reset();
        document.getElementById("contact-modal").classList.remove("active");
        document.body.style.overflow = "auto";
        showToast("Your inquiry has been sent to the agent. They will contact you shortly.");
      }, 2000);
    }, 1500);
  });

  // Mobile navigation hamburger toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.className = "fas fa-times";
    } else {
      icon.className = "fas fa-bars";
    }
  });

  // Close nav menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      mobileMenuBtn.querySelector("i").className = "fas fa-bars";
    }
  });
}

function resetAllFilters() {
  activeFilters = {
    purpose: "all",
    city: "all",
    priceMin: 0,
    priceMax: 150000000,
    bedrooms: "all",
    furnished: "all"
  };

  // Reset UI components
  document.getElementById("search-input").value = "";
  document.getElementById("filter-city").value = "all";
  document.getElementById("filter-furnished").value = "all";
  
  const bedBtns = document.querySelectorAll(".bed-btn");
  bedBtns.forEach(b => b.classList.remove("active"));
  bedBtns[0].classList.add("active"); // "All" button

  const priceSlider = document.getElementById("price-range");
  priceSlider.max = 150000000;
  priceSlider.value = 100000000;
  document.getElementById("price-value").innerText = `Up to: PKR 10 Crore`;

  const tabs = document.querySelectorAll(".purpose-tab");
  tabs.forEach(t => t.classList.remove("active"));
  document.getElementById("tab-all").classList.add("active");

  filterApartments();
}

// --- 10. Details Modal Logic ---
let activeSlideIndex = 0;
let currentAptImages = [];

function openDetailsModal(id) {
  const apt = APARTMENTS_DATA.find(a => a.id === id);
  if (!apt) return;

  activeSlideIndex = 0;
  currentAptImages = apt.images;

  // Set titles & pricing
  document.getElementById("modal-apt-title").innerText = apt.title;
  document.getElementById("modal-apt-price").innerText = apt.priceDisplay;
  document.getElementById("modal-apt-location").innerText = apt.location;
  document.getElementById("modal-apt-description").innerText = apt.description;
  document.getElementById("modal-apt-floor").innerText = apt.floor;
  document.getElementById("modal-apt-furnished").innerText = apt.furnished.toUpperCase();
  document.getElementById("modal-apt-purpose").innerText = apt.purpose === 'sale' ? 'For Sale' : 'For Rent';

  // Details specifications list
  document.getElementById("modal-spec-beds").innerText = `${apt.bedrooms} Bedrooms`;
  document.getElementById("modal-spec-baths").innerText = `${apt.bathrooms} Bathrooms`;
  document.getElementById("modal-spec-area").innerText = `${apt.area.toLocaleString()} Sq Ft`;

  // Render Image Slideshow
  renderModalSlides();

  // Render Amenities
  const amenitiesList = document.getElementById("modal-amenities-list");
  amenitiesList.innerHTML = "";
  apt.amenities.forEach(amenity => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${amenity}`;
    amenitiesList.appendChild(li);
  });

  // Configure Contact Buttons
  document.getElementById("modal-call-btn").href = `tel:${apt.contact.phone}`;
  document.getElementById("modal-wa-btn").href = `https://wa.me/${apt.contact.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20your%20property%20%22${encodeURIComponent(apt.title)}%22%20listed%20on%20ApnaApartments.com.`;
  document.getElementById("modal-form-btn").onclick = (e) => {
    document.getElementById("details-modal").classList.remove("active");
    openContactModal(e, apt.id);
  };

  // Launch modal
  document.getElementById("details-modal").classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scroll background
}

function renderModalSlides() {
  const container = document.getElementById("modal-slides-container");
  container.innerHTML = "";
  
  currentAptImages.forEach((imgUrl, index) => {
    const slide = document.createElement("div");
    slide.className = `modal-slide ${index === 0 ? 'active' : ''}`;
    slide.innerHTML = `<img src="${imgUrl}" alt="Apartment View ${index + 1}">`;
    container.appendChild(slide);
  });

  updateSlideDots();
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".modal-slide");
  slides[activeSlideIndex].classList.remove("active");

  activeSlideIndex += direction;
  if (activeSlideIndex >= slides.length) activeSlideIndex = 0;
  if (activeSlideIndex < 0) activeSlideIndex = slides.length - 1;

  slides[activeSlideIndex].classList.add("active");
  updateSlideDots();
}

function updateSlideDots() {
  const dotsContainer = document.getElementById("modal-slides-dots");
  dotsContainer.innerHTML = "";
  
  currentAptImages.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `slide-dot ${index === activeSlideIndex ? 'active' : ''}`;
    dot.onclick = () => {
      const slides = document.querySelectorAll(".modal-slide");
      slides[activeSlideIndex].classList.remove("active");
      activeSlideIndex = index;
      slides[activeSlideIndex].classList.add("active");
      updateSlideDots();
    };
    dotsContainer.appendChild(dot);
  });
}

// --- 11. Contact Form Modal Logic ---
function openContactModal(event, id) {
  if (event) event.stopPropagation();
  
  const apt = APARTMENTS_DATA.find(a => a.id === id);
  if (!apt) return;

  document.getElementById("contact-modal-title").innerText = `Inquire about: ${apt.title}`;
  document.getElementById("contact-property-details").innerText = `${apt.location} | ${apt.priceDisplay}`;
  document.getElementById("contact-modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

// --- 12. Shortlist / Favorites Drawer System ---
function toggleFavorite(event, id) {
  event.stopPropagation();
  
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    showToast("Added to shortlist!");
  } else {
    favorites.splice(index, 1);
    showToast("Removed from shortlist.");
  }

  localStorage.setItem("apna_apartments_favs", JSON.stringify(favorites));
  
  // Re-render current listings & favorites drawer
  filterApartments();
  updateFavoritesUI();
}

function updateFavoritesUI() {
  const listContainer = document.getElementById("favorites-list");
  const countBadge = document.getElementById("fav-badge-count");
  const triggerCount = document.getElementById("fav-trigger-count");

  listContainer.innerHTML = "";
  countBadge.innerText = favorites.length;
  triggerCount.innerText = favorites.length;

  if (favorites.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-fav-message">
        <i class="far fa-heart" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 0.8rem;"></i>
        <p>Your shortlist is empty.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted)">Click the heart icon on properties to shortlist them.</p>
      </div>
    `;
    return;
  }

  favorites.forEach(favId => {
    const apt = APARTMENTS_DATA.find(a => a.id === favId);
    if (!apt) return;

    const div = document.createElement("div");
    div.className = "favorite-item";
    div.innerHTML = `
      <img src="${apt.images[0]}" alt="${apt.title}" class="fav-item-img" onclick="openDetailsModal(${apt.id})">
      <div class="fav-item-details">
        <h5 class="fav-item-title" onclick="openDetailsModal(${apt.id})">${apt.title}</h5>
        <p class="fav-item-price">${apt.priceDisplay}</p>
        <div class="fav-item-actions">
          <a href="https://wa.me/${apt.contact.whatsapp}" target="_blank" class="fav-wa-btn"><i class="fab fa-whatsapp"></i> Chat</a>
          <button class="fav-remove-btn" onclick="toggleFavorite(event, ${apt.id})"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
      </div>
    `;
    listContainer.appendChild(div);
  });
}

function toggleFavoritesDrawer() {
  const drawer = document.getElementById("favorites-drawer");
  drawer.classList.toggle("active");
}

// --- 13. Toast Notification helper ---
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("visible"), 10);
  
  // Clear after 3 seconds
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
