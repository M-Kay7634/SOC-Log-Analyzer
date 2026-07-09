const geoip = require("geoip-lite");

const lookupIP = (ip = "") => {
  if (!ip) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timezone: "Unknown",
    };
  }

  // Localhost
if (ip === "127.0.0.1" || ip === "::1") {
    return {
      country: "Local",
      region: "-",
      city: "-",
      timezone: "-",
    };
  }

  // Private Networks
  if (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  ) {
  return {
    country: "Private Network",
    region: "-",
    city: "-",
    timezone: "-",
  };
}

  
  let geo;

  try {
    geo = geoip.lookup(ip);
  } catch (error) {
    // console.error("GeoIP Lookup Error:", error.message);

    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timezone: "Unknown",
    };
  }

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