'use strict';

const accessKey = '0cb6ce81dfcafaf4302ac04a5e6d10ef';
const cradlepointIP = '66.249.79.23';
const URL = `http://api.ipstack.com/${cradlepointIP}?access_key=${accessKey}`;

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log(JSON.parse(xhttp.responseText));
    }
};
xhttp.open('GET', URL, true);
xhttp.send();