const geoip = require("geoip-lite");

console.log(geoip.lookup("8.8.8.8"));
console.log(geoip.lookup("1.1.1.1"));
console.log(geoip.lookup("127.0.0.1"));