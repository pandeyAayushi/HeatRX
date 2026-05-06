/* ═══════════════════════════════════════════
   HeatRx-Equity — Application Logic
   ═══════════════════════════════════════════ */

// ── MOCK DATA ───────────────────────────────────────────────
const CITY_DATA = {
  delhi: {
    center: [28.6139, 77.2090],
    zoom: 12,
    city: "Delhi",
    zones: [
      {
        id: "dz1",
        name: "Connaught Place Core",
        risk: "High",
        temp: "44.2°C",
        cause: "Low vegetation, dense concrete surface",
        solution: "Install cool roofs, increase street greenery",
        ndvi: 0.12,
        coordinates: [28.6315, 77.2167],
        rank: 1
      },
      {
        id: "dz2",
        name: "Nehru Place Tech Hub",
        risk: "High",
        temp: "43.1°C",
        cause: "High surface albedo, minimal shade cover",
        solution: "Vertical gardens, permeable pavements",
        ndvi: 0.18,
        coordinates: [28.5493, 77.2513],
        rank: 2
      },
      {
        id: "dz3",
        name: "Okhla Industrial Zone",
        risk: "High",
        temp: "42.7°C",
        cause: "Industrial heat emission, no green buffer",
        solution: "Industrial heat shields, tree plantation drives",
        ndvi: 0.09,
        coordinates: [28.5355, 77.2767],
        rank: 3
      },
      {
        id: "dz4",
        name: "Karol Bagh District",
        risk: "Medium",
        temp: "39.8°C",
        cause: "Dense urban fabric, insufficient ventilation",
        solution: "Green corridors, reflective road surfaces",
        ndvi: 0.26,
        coordinates: [28.6514, 77.1907],
        rank: 4
      },
      {
        id: "dz5",
        name: "Dwarka Sector 21",
        risk: "Medium",
        temp: "38.5°C",
        cause: "Mixed use development with sparse parks",
        solution: "Pocket parks, tree-lined streets",
        ndvi: 0.35,
        coordinates: [28.5521, 77.0518],
        rank: 5
      }
    ],
    heatPoints: [
      [28.6315, 77.2167, 1.0], [28.5493, 77.2513, 0.95], [28.5355, 77.2767, 0.9],
      [28.6514, 77.1907, 0.65], [28.5521, 77.0518, 0.55],
      [28.6600, 77.2300, 0.8], [28.5800, 77.2100, 0.75], [28.6100, 77.2400, 0.85],
      [28.5700, 77.1800, 0.6], [28.6200, 77.1500, 0.5], [28.6450, 77.2450, 0.7],
      [28.5250, 77.2200, 0.88], [28.5950, 77.2650, 0.72]
    ],
    ndviPoints: [
      [28.6300, 77.2100, 0.1], [28.5450, 77.2500, 0.15], [28.5300, 77.2800, 0.08],
      [28.6500, 77.1900, 0.3], [28.5500, 77.0500, 0.4],
      [28.6800, 77.1200, 0.85], [28.7000, 77.1000, 0.9], [28.7200, 77.1500, 0.8],
      [28.5000, 77.1000, 0.75], [28.6000, 77.1300, 0.65], [28.6700, 77.2700, 0.35]
    ]
  },
  noida: {
    center: [28.5355, 77.3910],
    zoom: 12,
    city: "Noida",
    zones: [
      {
        id: "nz1",
        name: "Sector 18 Commercial",
        risk: "High",
        temp: "42.8°C",
        cause: "Commercial density, impervious surfaces",
        solution: "Green rooftops, shade canopies",
        ndvi: 0.14,
        coordinates: [28.5700, 77.3215],
        rank: 1
      },
      {
        id: "nz2",
        name: "Greater Noida West",
        risk: "Medium",
        temp: "40.2°C",
        cause: "Rapid construction, loss of agricultural land",
        solution: "Mandatory green space per building",
        ndvi: 0.28,
        coordinates: [28.4580, 77.4022],
        rank: 2
      },
      {
        id: "nz3",
        name: "Sector 62 IT Park",
        risk: "High",
        temp: "41.5°C",
        cause: "Data center heat, paved parking lots",
        solution: "Cool pavements, parking lot greening",
        ndvi: 0.11,
        coordinates: [28.6213, 77.3682],
        rank: 3
      },
      {
        id: "nz4",
        name: "Sector 135 Highway",
        risk: "Medium",
        temp: "39.4°C",
        cause: "High traffic, limited roadside vegetation",
        solution: "Median plantation, noise-heat barriers",
        ndvi: 0.22,
        coordinates: [28.5000, 77.4100],
        rank: 4
      },
      {
        id: "nz5",
        name: "Botanical Garden Zone",
        risk: "Low",
        temp: "35.1°C",
        cause: "Adequate vegetation but isolated",
        solution: "Extend green corridors to neighboring zones",
        ndvi: 0.72,
        coordinates: [28.5573, 77.3486],
        rank: 5
      }
    ],
    heatPoints: [
      [28.5700, 77.3215, 1.0], [28.4580, 77.4022, 0.7], [28.6213, 77.3682, 0.9],
      [28.5000, 77.4100, 0.65], [28.5573, 77.3486, 0.2],
      [28.5400, 77.3600, 0.8], [28.5900, 77.3900, 0.75], [28.5100, 77.3300, 0.6]
    ],
    ndviPoints: [
      [28.5700, 77.3215, 0.12], [28.4580, 77.4022, 0.25], [28.6213, 77.3682, 0.1],
      [28.5573, 77.3486, 0.75], [28.5200, 77.3800, 0.5], [28.6000, 77.3000, 0.6]
    ]
  },
  mumbai: {
    center: [19.0760, 72.8777],
    zoom: 12,
    city: "Mumbai",
    zones: [
      {
        id: "mz1",
        name: "Dharavi Precinct",
        risk: "High",
        temp: "43.5°C",
        cause: "High density, minimal open space",
        solution: "Community micro-gardens, ventilation corridors",
        ndvi: 0.08,
        coordinates: [19.0422, 72.8538],
        rank: 1
      },
      {
        id: "mz2",
        name: "BKC Financial District",
        risk: "High",
        temp: "42.0°C",
        cause: "Glass facades, AC exhaust heat",
        solution: "Building-level energy efficiency, green facades",
        ndvi: 0.13,
        coordinates: [19.0596, 72.8657],
        rank: 2
      },
      {
        id: "mz3",
        name: "Kurla West Market",
        risk: "Medium",
        temp: "40.1°C",
        cause: "Street market heat, high footfall",
        solution: "Shading structures, misting stations",
        ndvi: 0.19,
        coordinates: [19.0728, 72.8826],
        rank: 3
      },
      {
        id: "mz4",
        name: "Andheri Industrial",
        risk: "Medium",
        temp: "39.7°C",
        cause: "Light industry emissions, low greenery",
        solution: "Green buffer zones, industrial cooling",
        ndvi: 0.24,
        coordinates: [19.1197, 72.8464],
        rank: 4
      },
      {
        id: "mz5",
        name: "Aarey Fringe Zone",
        risk: "Low",
        temp: "34.8°C",
        cause: "Forest proximity; risk from urban encroachment",
        solution: "Protect forest boundary, extend green zone",
        ndvi: 0.78,
        coordinates: [19.1764, 72.8646],
        rank: 5
      }
    ],
    heatPoints: [
      [19.0422, 72.8538, 1.0], [19.0596, 72.8657, 0.95], [19.0728, 72.8826, 0.7],
      [19.1197, 72.8464, 0.65], [19.1764, 72.8646, 0.15],
      [19.0200, 72.8300, 0.85], [19.0900, 72.8700, 0.78], [19.0500, 72.9000, 0.6]
    ],
    ndviPoints: [
      [19.0422, 72.8538, 0.07], [19.0596, 72.8657, 0.12], [19.1764, 72.8646, 0.8],
      [19.1500, 72.8900, 0.65], [19.0800, 72.8200, 0.4]
    ]
  },
  bangalore: {
    center: [12.9716, 77.5946],
    zoom: 12,
    city: "Bangalore",
    zones: [
      {
        id: "blz1",
        name: "Whitefield Tech Corridor",
        risk: "High",
        temp: "38.9°C",
        cause: "Rapid IT development, lake encroachment",
        solution: "Lake restoration, tech park greening",
        ndvi: 0.17,
        coordinates: [12.9698, 77.7500],
        rank: 1
      },
      {
        id: "blz2",
        name: "Silk Board Junction",
        risk: "High",
        temp: "39.4°C",
        cause: "Chronic traffic congestion, zero greenery",
        solution: "Grade separation with green medians",
        ndvi: 0.10,
        coordinates: [12.9166, 77.6232],
        rank: 2
      },
      {
        id: "blz3",
        name: "Marathahalli Bridge",
        risk: "Medium",
        temp: "37.5°C",
        cause: "High vehicle density, paved floodplain",
        solution: "Bioswales, riparian buffer replanting",
        ndvi: 0.25,
        coordinates: [12.9591, 77.6974],
        rank: 3
      },
      {
        id: "blz4",
        name: "Hebbal Lake Zone",
        risk: "Low",
        temp: "33.2°C",
        cause: "Protected wetland; minor peripheral stress",
        solution: "Strengthen buffer zone regulations",
        ndvi: 0.68,
        coordinates: [13.0450, 77.5980],
        rank: 4
      },
      {
        id: "blz5",
        name: "Koramangala Hub",
        risk: "Medium",
        temp: "37.1°C",
        cause: "Café culture sprawl replacing parks",
        solution: "Street tree canopy program",
        ndvi: 0.30,
        coordinates: [12.9352, 77.6245],
        rank: 5
      }
    ],
    heatPoints: [
      [12.9698, 77.7500, 1.0], [12.9166, 77.6232, 0.95], [12.9591, 77.6974, 0.7],
      [13.0450, 77.5980, 0.15], [12.9352, 77.6245, 0.68],
      [12.9800, 77.6500, 0.8], [12.9400, 77.7000, 0.75]
    ],
    ndviPoints: [
      [12.9698, 77.7500, 0.15], [12.9166, 77.6232, 0.09], [13.0450, 77.5980, 0.7],
      [13.0800, 77.6200, 0.75], [12.9200, 77.5500, 0.5]
    ]
  },
  hyderabad: {
    center: [17.3850, 78.4867],
    zoom: 12,
    city: "Hyderabad",
    zones: [
      {
        id: "hyz1",
        name: "HITEC City Core",
        risk: "High",
        temp: "43.8°C",
        cause: "Glass towers, massive paved plazas",
        solution: "Blue-green infrastructure, cool roofing mandate",
        ndvi: 0.11,
        coordinates: [17.4435, 78.3772],
        rank: 1
      },
      {
        id: "hyz2",
        name: "Old City — Charminar",
        risk: "High",
        temp: "44.5°C",
        cause: "Ancient dense streets, no green space",
        solution: "Heritage-sensitive green interventions",
        ndvi: 0.07,
        coordinates: [17.3616, 78.4747],
        rank: 2
      },
      {
        id: "hyz3",
        name: "Kukatpally Housing",
        risk: "Medium",
        temp: "40.3°C",
        cause: "Residential density, limited parks",
        solution: "Community parks, roof gardens",
        ndvi: 0.22,
        coordinates: [17.4849, 78.3947],
        rank: 3
      },
      {
        id: "hyz4",
        name: "Hussain Sagar Fringe",
        risk: "Low",
        temp: "35.6°C",
        cause: "Lake cooling effect; pollution threat",
        solution: "Lake water quality management",
        ndvi: 0.55,
        coordinates: [17.4239, 78.4738],
        rank: 4
      },
      {
        id: "hyz5",
        name: "Nacharam Industrial",
        risk: "High",
        temp: "42.1°C",
        cause: "Chemical plant heat + impervious land",
        solution: "Industrial green belt, emission controls",
        ndvi: 0.08,
        coordinates: [17.3963, 78.5596],
        rank: 5
      }
    ],
    heatPoints: [
      [17.4435, 78.3772, 1.0], [17.3616, 78.4747, 0.98], [17.4849, 78.3947, 0.7],
      [17.4239, 78.4738, 0.2], [17.3963, 78.5596, 0.95],
      [17.4000, 78.4500, 0.85], [17.3800, 78.4200, 0.78]
    ],
    ndviPoints: [
      [17.4435, 78.3772, 0.1], [17.3616, 78.4747, 0.06], [17.4239, 78.4738, 0.58],
      [17.3400, 78.5200, 0.65], [17.4700, 78.4200, 0.35]
    ]
  }
};

// ── STATE ──────────────────────────────────────────────────
let activeCity     = "delhi";
let activeLayer    = "heat";   // "heat" or "ndvi"
let heatLayer      = null;
let ndviLayer      = null;
let markers        = [];
let selectedZoneId = null;
let priorityList   = new Set();

// ── MAP INIT ───────────────────────────────────────────────
const map = L.map("map", {
  zoomControl: true,
  attributionControl: true
});

// OpenStreetMap dark tiles
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19
}).addTo(map);

// ── HOTSPOT MARKER FACTORY ─────────────────────────────────
function makeHotspotIcon(zone) {
  const colors = {
    High:   { core: "#ff4d4d", ring: "rgba(255,77,77,0.3)",   glow: "rgba(255,77,77,0.15)" },
    Medium: { core: "#f59e0b", ring: "rgba(245,158,11,0.3)",  glow: "rgba(245,158,11,0.12)" },
    Low:    { core: "#22c55e", ring: "rgba(34,197,94,0.3)",   glow: "rgba(34,197,94,0.12)" }
  };
  const c = colors[zone.risk] || colors.Medium;

  const html = `
    <div style="
      position: relative;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      <div style="
        position: absolute;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: ${c.glow};
        border: 2px solid ${c.ring};
        animation: pulse-ring 1.8s ease-out infinite;
      "></div>
      <div style="
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: ${c.core};
        border: 2.5px solid rgba(255,255,255,0.5);
        box-shadow: 0 0 14px ${c.ring}, 0 0 28px ${c.glow};
        animation: pulse-core 2.5s ease-in-out infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 9px;
        font-weight: 700;
        font-family: 'Space Grotesk', sans-serif;
      ">${zone.rank}</div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -26]
  });
}

// ── RENDER CITY ────────────────────────────────────────────
function renderCity(cityKey) {
  const data = CITY_DATA[cityKey];
  if (!data) return;
  activeCity = cityKey;

  // fly to city
  map.flyTo(data.center, data.zoom, { duration: 1.4, easeLinearity: 0.25 });

  // clear layers
  if (heatLayer) { map.removeLayer(heatLayer); heatLayer = null; }
  if (ndviLayer)  { map.removeLayer(ndviLayer);  ndviLayer  = null; }
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  // heat layer
  heatLayer = L.heatLayer(data.heatPoints, {
    radius: 35,
    blur: 25,
    maxZoom: 14,
    gradient: { 0.1: "#ffd600", 0.4: "#ff9800", 0.7: "#ff4d4d", 1.0: "#cc0000" }
  });

  // ndvi layer
  ndviLayer = L.heatLayer(data.ndviPoints, {
    radius: 38,
    blur: 28,
    maxZoom: 14,
    gradient: { 0.0: "#7c2d12", 0.3: "#92400e", 0.55: "#eab308", 0.8: "#22c55e", 1.0: "#15803d" }
  });

  // add active layer
  if (activeLayer === "heat") heatLayer.addTo(map);
  else                        ndviLayer.addTo(map);

  // add markers
  data.zones.forEach(zone => {
    const icon   = makeHotspotIcon(zone);
    const marker = L.marker(zone.coordinates, { icon });

    const badgeClass = zone.risk === "High" ? "badge-high" : zone.risk === "Medium" ? "badge-medium" : "badge-low";
    marker.bindPopup(`
      <div class="popup-inner">
        <strong class="popup-zone">${zone.name}</strong>
        <span class="popup-risk ${badgeClass}">${zone.risk} Risk</span>
        <span class="popup-cause">📌 ${zone.cause}</span>
        <span class="popup-hint">Click to explore full details →</span>
      </div>
    `, { maxWidth: 220 });

    marker.on("click", () => {
      showZoneDetail(zone, cityKey);
    });

    marker.addTo(map);
    markers.push(marker);
  });

  // update stats
  const high = data.zones.filter(z => z.risk === "High").length;
  const med  = data.zones.filter(z => z.risk === "Medium").length;
  document.getElementById("statHotspots").textContent = data.zones.length;
  document.getElementById("statHighRisk").textContent  = high;
  document.getElementById("statMedRisk").textContent   = med;

  // update priority zones (top 3 by rank)
  renderPriorityZones(data);

  // reset panel
  resetPanel();
}

// ── ZONE DETAIL PANEL ──────────────────────────────────────
function showZoneDetail(zone, cityKey) {
  selectedZoneId = zone.id;
  document.getElementById("panelDefault").style.display = "none";
  const detail = document.getElementById("panelDetail");
  detail.style.display = "flex";
  detail.style.flexDirection = "column";
  detail.style.gap = "12px";

  document.getElementById("zoneName").textContent    = zone.name;
  document.getElementById("zoneTemp").textContent    = zone.temp;
  document.getElementById("zoneCause").textContent   = zone.cause;
  document.getElementById("zoneSolution").textContent = zone.solution;

  const badge = document.getElementById("riskBadge");
  badge.textContent = zone.risk + " Risk";
  badge.className = "risk-badge";
  if (zone.risk === "High")   badge.classList.add("badge-high");
  if (zone.risk === "Medium") badge.classList.add("badge-medium");
  if (zone.risk === "Low")    badge.classList.add("badge-low");

  // NDVI meter
  const pct = Math.round(zone.ndvi * 100);
  document.getElementById("zoneNDVI").textContent = zone.ndvi.toFixed(2);
  // Deferred so transition plays
  setTimeout(() => {
    document.getElementById("ndviBarFill").style.width = pct + "%";
  }, 50);

  // Update action button
  const btn = document.getElementById("actionBtn");
  if (priorityList.has(zone.id)) {
    btn.textContent = "✓ Added to Priority List";
    btn.classList.add("added");
  } else {
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Add to Priority List
    `;
    btn.classList.remove("added");
  }

  // Fly map to zone
  map.flyTo(zone.coordinates, 14, { duration: 0.9 });

  // Open corresponding popup
  const markerIdx = CITY_DATA[activeCity].zones.findIndex(z => z.id === zone.id);
  if (markerIdx >= 0 && markers[markerIdx]) {
    markers[markerIdx].openPopup();
  }
}

function resetPanel() {
  document.getElementById("panelDefault").style.display = "flex";
  document.getElementById("panelDetail").style.display  = "none";
  document.getElementById("ndviBarFill").style.width     = "0%";
  selectedZoneId = null;
}

// ── PRIORITY ZONES ─────────────────────────────────────────
function renderPriorityZones(data) {
  const top3 = data.zones.filter(z => z.rank <= 3).sort((a, b) => a.rank - b.rank);
  const container = document.getElementById("priorityCards");
  container.innerHTML = "";

  top3.forEach(zone => {
    const card = document.createElement("div");
    card.className = "priority-card";
    card.setAttribute("data-zone-id", zone.id);

    const riskColors = { High: "#ff4d4d", Medium: "#f59e0b", Low: "#22c55e" };
    card.innerHTML = `
      <span class="priority-rank rank-${zone.rank}">#${zone.rank}</span>
      <div class="priority-info">
        <div class="priority-zone">${zone.name}</div>
        <div class="priority-desc" style="color:${riskColors[zone.risk]}">${zone.risk} Risk — ${zone.cause}</div>
      </div>
    `;

    card.addEventListener("click", () => showZoneDetail(zone, activeCity));
    container.appendChild(card);
  });
}

// ── LAYER TOGGLE ───────────────────────────────────────────
function switchLayer(layer) {
  activeLayer = layer;

  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.layer === layer);
  });

  const legendBar   = document.querySelector(".legend-bar");
  const legendTitle = document.getElementById("legendTitle");
  const legendScale = document.getElementById("legendScale");

  if (layer === "heat") {
    if (ndviLayer)  map.removeLayer(ndviLayer);
    if (heatLayer)  heatLayer.addTo(map);
    legendTitle.textContent = "Heat Index";
    legendBar.className     = "legend-bar heat-bar";
    legendScale.querySelector(".legend-low").textContent  = "Cool";
    legendScale.querySelector(".legend-high").textContent = "Hot";
  } else {
    if (heatLayer)  map.removeLayer(heatLayer);
    if (ndviLayer)  ndviLayer.addTo(map);
    legendTitle.textContent = "Vegetation (NDVI)";
    legendBar.className     = "legend-bar ndvi-bar";
    legendScale.querySelector(".legend-low").textContent  = "Bare";
    legendScale.querySelector(".legend-high").textContent = "Dense";
  }
}

// ── ACTION BUTTON ──────────────────────────────────────────
document.getElementById("actionBtn").addEventListener("click", () => {
  if (!selectedZoneId) return;

  const btn = document.getElementById("actionBtn");
  if (priorityList.has(selectedZoneId)) {
    priorityList.delete(selectedZoneId);
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Add to Priority List
    `;
    btn.classList.remove("added");
  } else {
    priorityList.add(selectedZoneId);
    btn.textContent = "✓ Added to Priority List";
    btn.classList.add("added");
  }
});

// ── EVENT LISTENERS ────────────────────────────────────────
document.getElementById("citySelect").addEventListener("change", e => {
  renderCity(e.target.value);
});

document.getElementById("btnHeat").addEventListener("click", () => switchLayer("heat"));
document.getElementById("btnNDVI").addEventListener("click", () => switchLayer("ndvi"));

// ── KEYBOARD NAV ───────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.key === "Escape") resetPanel();
});

// ── INIT ──────────────────────────────────────────────────
renderCity("delhi");
