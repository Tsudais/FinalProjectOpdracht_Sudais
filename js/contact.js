document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([51.0347, 4.3769], 9);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const catIcon = L.icon({
    iconUrl: "assets/logo.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const marker1 = L.marker([50.8503, 4.3517], { icon: catIcon }).addTo(map);
  marker1.bindPopup(`
    <div class="popup-title"> De Katten Boutique - Brussel</div>
    <div class="popup-address">
      Grote Markt 1<br>
      1000 Brussel<br>
      <strong>Tel:</strong> +32 2 123 45 67<br>
      <strong>Open:</strong> Ma-Za 10:00-18:00
    </div>
  `);

  const marker2 = L.marker([51.2194, 4.4025], { icon: catIcon }).addTo(map);
  marker2.bindPopup(`
    <div class="popup-title"> De Katten Boutique - Antwerpen</div>
    <div class="popup-address">
      Groenplaats 21<br>
      2000 Antwerpen<br>
      <strong>Tel:</strong> +32 3 987 65 43<br>
      <strong>Open:</strong> Ma-Za 10:00-18:00
    </div>
  `);

  const group = L.featureGroup([marker1, marker2]);
  map.fitBounds(group.getBounds().pad(0.1));

  marker1.on("mouseover", function () {
    this.openPopup();
  });

  marker2.on("mouseover", function () {
    this.openPopup();
  });
});
