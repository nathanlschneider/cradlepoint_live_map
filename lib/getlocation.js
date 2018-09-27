'use strict';
const geoJSON = require('./geolocation.json');

module.exports = function getLocationData(name, callback) {
    let trimmedName = nameTrimmer(name);
    if (trimmedName.length < 4 && trimmedName.length !== 0) {
        for (let i = 0; i < geoJSON.length; i++) {
            if (geoJSON[i].Store.toString() === trimmedName) {
                callback(false, geoJSON[i]);
            }
        }
    }
};

function nameTrimmer(data) {
    if (data.startsWith('0' || 0)) {
        while (data.charAt(0) === '0') {
            data = data.substr(1);
        }
    }
    return data;
}
