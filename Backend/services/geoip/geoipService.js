const geoip = require("geoip-lite");

const lookupIP = (ip) => {
  const geo = geoip.lookup(ip);

  if (!geo) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timezone: "Unknown",
    };
  }

  return {
    country: geo.country,
    region: geo.region || "Unknown",
    city: geo.city || "Unknown",
    timezone: geo.timezone || "Unknown",
  };
};

module.exports = {
  lookupIP,
};