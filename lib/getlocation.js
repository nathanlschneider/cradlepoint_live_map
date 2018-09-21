'use strict';
const request = require('request');
const access_key = 'd8ab2aa6a0c949b783f49505d615642f';

module.exports = function getLocationData(ipAddr, callback) {
    request(
        {
            url: `https://api.ipgeolocation.io/ipgeo?apiKey=${access_key}&ip=${ipAddr}&fields=latitude,longitude`,
            method: 'GET'
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(false, JSON.parse(body));
            } else {
                return callback(true, error);
            }
        }
    );
};
