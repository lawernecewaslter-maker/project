const seedVehicles = [
  { id: 'f150', make: 'Ford Motor Company', model: 'F-150', year: 2022, mileage: 28500, bodyType: 'Truck', price: 38995, location: 'Dallas, TX', engine: '3.5L EcoBoost V6', transmission: '10-Speed Auto', drivetrain: '4WD', fuelEconomy: '20 MPG', description: 'One-owner truck with towing package and premium infotainment.', images: ['https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'camry', make: 'Toyota', model: 'Camry', year: 2021, mileage: 22340, bodyType: 'Sedan', price: 26450, location: 'Phoenix, AZ', engine: '2.5L 4-Cyl', transmission: '8-Speed Auto', drivetrain: 'FWD', fuelEconomy: '32 MPG', description: 'Reliable midsize sedan with advanced safety suite.', images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'civic', make: 'Honda', model: 'Civic', year: 2020, mileage: 30120, bodyType: 'Sedan', price: 21995, location: 'Orlando, FL', engine: '2.0L 4-Cyl', transmission: 'CVT', drivetrain: 'FWD', fuelEconomy: '35 MPG', description: 'Sporty and efficient with clean history report.', images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'silverado', make: 'Chevrolet', model: 'Silverado', year: 2022, mileage: 19002, bodyType: 'Truck', price: 41995, location: 'Nashville, TN', engine: '5.3L V8', transmission: '10-Speed Auto', drivetrain: '4WD', fuelEconomy: '19 MPG', description: 'Powerful pickup ideal for work and weekend hauling.', images: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'model3', make: 'Tesla, Inc.', model: 'Model 3', year: 2023, mileage: 12800, bodyType: 'Sedan', price: 35995, location: 'San Jose, CA', engine: 'Dual Motor EV', transmission: 'Single-Speed', drivetrain: 'AWD', fuelEconomy: '132 MPGe', description: 'Long-range EV with autopilot and premium interior.', images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'bmw3', make: 'BMW', model: '3 Series', year: 2021, mileage: 24050, bodyType: 'Sedan', price: 33495, location: 'Chicago, IL', engine: '2.0L Turbo', transmission: '8-Speed Auto', drivetrain: 'RWD', fuelEconomy: '30 MPG', description: 'Luxury sport sedan with responsive handling.', images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'cclass', make: 'Mercedes-Benz', model: 'C-Class', year: 2022, mileage: 21100, bodyType: 'Sedan', price: 37995, location: 'Atlanta, GA', engine: '2.0L Turbo', transmission: '9-Speed Auto', drivetrain: 'RWD', fuelEconomy: '29 MPG', description: 'Elegant executive sedan with modern cabin tech.', images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'rav4', make: 'Toyota', model: 'RAV4', year: 2021, mileage: 27000, bodyType: 'SUV', price: 29995, location: 'Seattle, WA', engine: '2.5L 4-Cyl', transmission: '8-Speed Auto', drivetrain: 'AWD', fuelEconomy: '30 MPG', description: 'Versatile SUV with roomy interior and AWD confidence.', images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'] },
  { id: 'crv', make: 'Honda', model: 'CR-V', year: 2022, mileage: 18700, bodyType: 'SUV', price: 31295, location: 'Denver, CO', engine: '1.5L Turbo', transmission: 'CVT', drivetrain: 'AWD', fuelEconomy: '31 MPG', description: 'Family-friendly SUV with excellent cargo space.', images: ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80'] }
];

const brands = ['Ford Motor Company','Chevrolet','Dodge','Toyota','Honda','Tesla, Inc.','BMW','Mercedes-Benz','Nissan','Hyundai Motor Company'];

const app = document.getElementById('app');

const topNav = document.querySelector('.top-nav');
let lastScrollY = window.scrollY;

function handleHeaderOnScroll() {
  const current = window.scrollY;
  if (current > lastScrollY && current > 80) {
    topNav.classList.add('nav-hidden');
    topNav.classList.remove('nav-visible');
  } else {
    topNav.classList.remove('nav-hidden');
    topNav.classList.add('nav-visible');
  }
  lastScrollY = current;
}
const favKey = 'drivenow_favorites';
let state = {
  vehicles: [...seedVehicles],
  filters: { make: '', model: '', year: '', price: 100000, mileage: 200000, bodyType: '' },
  favorites: JSON.parse(localStorage.getItem(favKey) || '[]'),
  selectedBrand: ''
};

const fmt = (n) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n);

function setTheme() {
  const current = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', current);
  document.getElementById('theme-toggle').textContent = current === 'dark' ? '☀️' : '🌙';
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) state.favorites = state.favorites.filter((f) => f !== id);
  else state.favorites.push(id);
  localStorage.setItem(favKey, JSON.stringify(state.favorites));
  router();
}

function filteredVehicles() {
  return state.vehicles.filter((v) => {
    const f = state.filters;
    const matchesBrand = state.selectedBrand ? v.make === state.selectedBrand : true;
    return (!f.make || v.make.toLowerCase().includes(f.make.toLowerCase())) &&
      (!f.model || v.model.toLowerCase().includes(f.model.toLowerCase())) &&
      (!f.year || v.year >= Number(f.year)) &&
      v.price <= Number(f.price) &&
      v.mileage <= Number(f.mileage) &&
      (!f.bodyType || v.bodyType === f.bodyType) &&
      matchesBrand;
  });
}

function carCard(v) {
  const fav = state.favorites.includes(v.id);
  return `<article class="car-card">
      <img class="car-image" src="${v.images[0]}" alt="${v.make} ${v.model}" />
      <div class="car-content">
        <h3>${v.year} ${v.make} ${v.model}</h3>
        <div class="meta">${v.mileage.toLocaleString()} miles • ${v.location}</div>
        <div class="price">${fmt(v.price)}</div>
        <div class="actions">
          <a class="btn secondary" href="#/vehicle/${v.id}">View Details</a>
          <a class="btn" href="#/checkout/${v.id}">Buy Now</a>
          <button class="ghost-btn" onclick="toggleFavorite('${v.id}')">${fav ? '★ Saved' : '☆ Save'}</button>
        </div>
      </div>
    </article>`;
}

function searchBar() {
  return `<div class="search-grid panel">
      <input placeholder="Make" value="${state.filters.make}" oninput="updateFilter('make', this.value)" />
      <input placeholder="Model" value="${state.filters.model}" oninput="updateFilter('model', this.value)" />
      <input type="number" placeholder="Min Year" value="${state.filters.year}" oninput="updateFilter('year', this.value)" />
      <input type="number" placeholder="Max Price" value="${state.filters.price}" oninput="updateFilter('price', this.value)" />
      <input type="number" placeholder="Max Mileage" value="${state.filters.mileage}" oninput="updateFilter('mileage', this.value)" />
      <select onchange="updateFilter('bodyType', this.value)">
        <option value="">Body Type</option>
        <option ${state.filters.bodyType === 'Sedan' ? 'selected':''}>Sedan</option>
        <option ${state.filters.bodyType === 'SUV' ? 'selected':''}>SUV</option>
        <option ${state.filters.bodyType === 'Truck' ? 'selected':''}>Truck</option>
      </select>
    </div>`;
}

function homePage() {
  const results = filteredVehicles().slice(0, 6);
  app.innerHTML = `
    <section class="hero">
      <div class="hero-overlay">
        <h1>Find Your Next Car Online</h1>
        <p>Trusted used-vehicle marketplace with transparent pricing and instant test checkout.</p>
        ${searchBar()}
      </div>
    </section>

    <section class="section">
      <h2>Browse Popular Brands in the USA</h2>
      <div class="brand-grid">
        ${brands.map((b) => `<div class="brand-card" onclick="filterByBrand('${b}')">${b}</div>`).join('')}
      </div>
    </section>

    <section class="section">
      <h2>Featured Inventory</h2>
      <div class="card-grid">${results.map(carCard).join('')}</div>
    </section>`;
}

function inventoryPage() {
  const cars = filteredVehicles();
  app.innerHTML = `<section class="section">
      <h2>Vehicle Inventory ${state.selectedBrand ? `• ${state.selectedBrand}` : ''}</h2>
      ${searchBar()}
      <p class="meta">${cars.length} vehicles found</p>
      <div class="card-grid">${cars.map(carCard).join('') || '<p>No vehicles found.</p>'}</div>
    </section>`;
}

function vehiclePage(id) {
  const car = state.vehicles.find((v) => v.id === id);
  if (!car) { app.innerHTML = '<p>Vehicle not found.</p>'; return; }
  let active = 0;
  const renderGallery = () => {
    app.innerHTML = `<section class="section details-layout">
      <div class="gallery panel">
        <img src="${car.images[active]}" alt="${car.model}" />
        <div class="thumb-row">${car.images.map((img,i) => `<img src="${img}" class="${i===active?'active':''}" onclick="selectImage('${id}', ${i})"/>`).join('')}</div>
      </div>
      <aside class="panel">
        <h2>${car.year} ${car.make} ${car.model}</h2>
        <div class="price">${fmt(car.price)}</div>
        <p>${car.description}</p>
        <div class="specs">
          <div><strong>Engine:</strong> ${car.engine}</div>
          <div><strong>Transmission:</strong> ${car.transmission}</div>
          <div><strong>Drivetrain:</strong> ${car.drivetrain}</div>
          <div><strong>Fuel Economy:</strong> ${car.fuelEconomy}</div>
          <div><strong>Mileage:</strong> ${car.mileage.toLocaleString()} mi</div>
          <div><strong>Location:</strong> ${car.location}</div>
        </div>
        <div class="actions" style="margin-top:1rem">
          <a class="btn" href="#/checkout/${car.id}">Buy Now</a>
          <button class="ghost-btn" onclick="toggleFavorite('${car.id}')">${state.favorites.includes(car.id) ? '★ Saved' : '☆ Save'}</button>
        </div>
      </aside>
    </section>`;
  };
  window.selectImage = (vid, i) => { if (vid === id) { active = i; renderGallery(); } };
  renderGallery();
}

function checkoutPage(id) {
  const car = state.vehicles.find((v) => v.id === id);
  if (!car) return (app.innerHTML = '<p>Vehicle not found.</p>');
  app.innerHTML = `<div class="checkout-card">
    <img class="car-image" src="${car.images[0]}" alt="${car.model}" />
    <h2>Checkout</h2>
    <p><strong>${car.year} ${car.make} ${car.model}</strong></p>
    <p class="price">${fmt(car.price)}</p>
    <button class="btn" onclick="confirmPurchase('${car.id}')">Confirm Purchase</button>
  </div>`;
}

function confirmationPage(payload) {
  app.innerHTML = `<div class="confirm-card" style="text-align:center">
    <div class="checkmark">✓</div>
    <h2>Vehicle Purchased Successfully</h2>
    <p><strong>Purchase Successful!</strong></p>
    <p>Your vehicle order has been successfully placed.</p>
    <p><strong>Order Number:</strong> ${payload.orderNumber}</p>
    <p><strong>Car Purchased:</strong> ${payload.name}</p>
    <p>Thank you for your purchase. Your vehicle order has been recorded successfully.</p>
    <a href="#/inventory" class="btn">Return to Inventory</a>
  </div>`;
}

function router() {
  const hash = location.hash || '#/';
  const [_, route, param] = hash.split('/');
  if (route === '') return homePage();
  if (route === 'inventory') return inventoryPage();
  if (route === 'vehicle') return vehiclePage(param);
  if (route === 'checkout') return checkoutPage(param);
  if (route === 'confirm') {
    const raw = sessionStorage.getItem('purchase_payload');
    return raw ? confirmationPage(JSON.parse(raw)) : inventoryPage();
  }
  homePage();
}

window.updateFilter = (key, value) => { state.filters[key] = value; if (location.hash.includes('inventory')) inventoryPage(); else homePage(); };
window.filterByBrand = (brand) => { state.selectedBrand = brand; location.hash = '#/inventory'; };
window.confirmPurchase = (id) => {
  const car = state.vehicles.find((v) => v.id === id);
  const payload = { orderNumber: `ORD-${Date.now().toString().slice(-8)}`, name: `${car.year} ${car.make} ${car.model}` };
  sessionStorage.setItem('purchase_payload', JSON.stringify(payload));
  location.hash = '#/confirm/success';
};
window.toggleFavorite = toggleFavorite;

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  setTheme();
});

document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chat-box').classList.toggle('hidden');
});

window.addEventListener('hashchange', router);
window.addEventListener('scroll', handleHeaderOnScroll, { passive: true });
setTheme();
handleHeaderOnScroll();
router();
