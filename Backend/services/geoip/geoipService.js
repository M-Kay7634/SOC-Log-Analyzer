const geoip = require("geoip-lite");

const lookupIP = (ip) => {
  const result = geoip.lookup(ip);

  if (!result) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timezone: "Unknown",
    };
  }

  return {
    country: result.country,
    region: result.region,
    city: result.city || "Unknown",
    timezone: result.timezone,
  };
};

module.exports = {
  lookupIP,
};