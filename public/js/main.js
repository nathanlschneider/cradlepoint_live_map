const dataSocket = new WebSocket('ws://localhost:9002/connect');

let cradleGroup = [];
const redMarker = L.divIcon({ className: 'red-circle' });
const blueMarker = L.divIcon({ className: 'blue-circle' });
const yellowMarker = L.divIcon({ className: 'yellow-circle' });
const greyMarker = L.divIcon({ className: 'grey-circle' });
let c = 0;
dataSocket.addEventListener('message', function(event) {
    let data = JSON.parse(event.data);

    console.log(data);

    if (data.conType === 'LTE') {
        L.marker([data.location.lat, data.location.lon], { icon: yellowMarker })
            .bindPopup(data.name + ' ' + data.conType)
            .addTo(map);
        console.log(c++);
    }

    if (data.conType === 'WAN') {
        L.marker([data.location.lat, data.location.lon], { icon: blueMarker })
            .bindPopup(data.name + ' ' + data.conType)
            .addTo(map);
    }

    if (data.state === 'offline') {
        L.marker([data.location.lat, data.location.lon], { icon: greyMarker })
            .bindPopup(data.name + ' ' + data.conType)
            .addTo(map);
    }
});

const openWeather = 'fb652d99255894c891ff5c8a796165d3';

var map = L.map('map', {
    center: [42.9611, -85.6555],
    minZoom: 2,
    zoom: 13
    //layers: cities
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

// var weatherA = L.tileLayer(`https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}`, {
//     layer: 'precipitation_new',
//     api_key: 'fb652d99255894c891ff5c8a796165d3'
// }).addTo(map);

var weatherB = L.tileLayer(`https://maps.aerisapi.com/{client_id}_{client_key}/radar/{z}/{x}/{y}/current.png`, {
    client_id: 'e8sH7sM8xAJt2N5fbisNF',
    client_key: 'eZ5vDLG3eQbFKFvfdWdCqEQP5qjM0Q8gzE0Hxaeq'
}).addTo(map);
