'use strict';
const request = require('request');
const openWeather = 'fb652d99255894c891ff5c8a796165d3';
const openWeatherURL = 'https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}';

module.exports = function getCradlepointData(callback) {
    request(
        {
            url: 'https://www.cradlepointecm.com/api/v2/routers/?fields=account,ipv4_address,name,state&limit=500',
            method: 'GET',
            headers: {
                'X-CP-API-ID': 'e79c6722',
                'X-CP-API-KEY': '11248c51069c2e200d1e89c74830c431',
                'X-ECM-API-ID': 'a86d9b3c-6f1b-498d-907a-bd2facf56bc9',
                'X-ECM-API-KEY': '5d707dd2d354f0cc125cb43e7b365b972f7454c2',
                'Content-Type': 'application/json'
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(false, JSON.parse(body).data);
            } else {
                return callback(null, error);
            }
        }
    );
};
