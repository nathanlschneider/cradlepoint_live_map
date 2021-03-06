'use strict';
const MarkerMaker = require('./lib/markermaker');
const getCradlepointData = require('./lib/functions');
const getLocationData = require('./lib/getlocation');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
let objMapMarker = {};

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.ws('/connect', (ws, req) => {
    getCradlepointData(function(err, payload) {
        if (err) return console.log(err);
        for (let i = 0; i < payload.length; i++) {
            objMapMarker[i] = new MarkerMaker(
                payload[i].account,
                payload[i].ipv4_address,
                payload[i].name,
                payload[i].state
            );
        }

        for (let i = 0; i < Object.keys(objMapMarker).length; i++) {
            getLocationData(objMapMarker[i].name, function(err, payload) {
                if (err) return console.log(err);

                objMapMarker[i].loc = {
                    StoreAddress: payload.StoreAddress,
                    City: payload.City,
                    State: payload.State,
                    ZipCode: payload.ZipCode,
                    lat: payload.Latitude,
                    lon: payload.Longitude
                };
                ws.send(JSON.stringify(objMapMarker[i]));
            });
        }
    });
});

app.listen(9002);
