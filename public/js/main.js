const windy_api = 'N2rcMJYkzqOdQC1od1WrW3OX3i7CUaCB';

const dataSocket = new WebSocket('ws://localhost:9002/connect');

let cradleGroup = [];
const redMarker = L.divIcon({ className: 'red-pin' });
const greenMarker = L.divIcon({ className: 'green-pin' });
const yellowMarker = L.divIcon({ className: 'yellow-pin' });
const greyMarker = L.divIcon({ className: 'grey-circle' });
let c = 0;
dataSocket.addEventListener('message', function(event) {
    let data = JSON.parse(event.data);

    if (data.conType === 'LTE') {
        L.marker([data.loc.lat, data.loc.lon], { icon: yellowMarker })
            .bindPopup(
                `Store: #${data.name} <br> ${data.loc.StoreAddress}<br> 
                ${data.loc.City} ${data.loc.State}, 
                ${data.loc.ZipCode}<p> IP: <a href="https://${data.ip}:8443/">${data.ip}</a> <br>
                Lat: ${data.loc.lat} | Lon: ${data.loc.lat} <br>Connection: ${data.conType}`
            )
            .addTo(markerLayerLTE);
    }

    if (data.conType === 'WAN') {
        L.marker([data.loc.lat, data.loc.lon], { icon: greenMarker })
            .bindPopup(
                `Store: #${data.name} <br> ${data.loc.StoreAddress}<br> 
                ${data.loc.City} ${data.loc.State}, 
                ${data.loc.ZipCode}<p> IP: <a href="https://${data.ip}:8443/">${data.ip}</a> <br>
                Lat: ${data.loc.lat} | Lon: ${data.loc.lat} <br>Connection: ${data.conType}`
            )
            .addTo(markerLayerWAN);
    }

    if (data.state === 'offline') {
        L.marker([data.loc.lat, data.loc.lon], { icon: redMarker })
            .bindPopup(
                `Store: #${data.name} <br> ${data.loc.StoreAddress}<br> 
            ${data.loc.City} ${data.loc.State}, 
            ${data.loc.ZipCode}<p> IP: <a href="https://${data.ip}:8443/">${data.ip}</a> <br>
            Lat: ${data.loc.lat} | Lon: ${data.loc.lat} <br>Connection: ${data.state}`
            )
            .addTo(markerLayerOffline);
    }
});

const openWeather = 'fb652d99255894c891ff5c8a796165d3';
const markerLayerLTE = L.layerGroup();
const markerLayerWAN = L.layerGroup();
const markerLayerOffline = L.layerGroup();
// const lightMap = L.map('lightMap');
// const darkMap = L.map('darkMap');

const map = L.map('map', {
    center: [42.9611, -85.6555],
    minZoom: 2,
    zoom: 13,
    layers: markerLayerLTE,
    markerLayerWAN,
    markerLayerOffline
});
const baseMaps = {
    // 'Light Map': lighMap,
    // 'Dark Map': darkMap
};
const markerOverlay = {
    LTE: markerLayerLTE,
    WAN: markerLayerWAN,
    Offline: markerLayerOffline
};

L.control.layers(baseMaps, markerOverlay).addTo(map);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var weatherB = L.tileLayer(`https://maps.aerisapi.com/{client_id}_{client_key}/radar/{z}/{x}/{y}/current.png`, {
//     client_id: 'e8sH7sM8xAJt2N5fbisNF',
//     client_key: 'eZ5vDLG3eQbFKFvfdWdCqEQP5qjM0Q8gzE0Hxaeq',
//     opacity: 0.5
// }).addTo(map);
