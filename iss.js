const request = require('request');

const fetchMyIP = function(callbackIP) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) 
    return callbackIP(error, null);

    if (response.statusCode !== 200) {
      callbackIP(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callbackIP(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callbackCoord) {
  request(`https://ipvigilante.com/json/` + ip, (error, response, body) => {
    if (error) {
      callbackCoord(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callbackCoord(Error(`Returned status code ${response.statusCode} when getting Coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callbackCoord(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coordinates, callbackFly) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      callbackFly(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callbackFly(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passOver = JSON.parse(body).response;
    callbackFly(null, passOver);
  });
};

const nextISSTimesForMyLocation = function(callbackNext) {
  fetchMyIP((error, ip) => {
    if (error) {
    return callbackNext(error, null)
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callbackNext(error, null)
      }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callbackNext(error, null)
        }
        callbackNext(null, passTimes)
      })
    })
  });

};

module.exports = nextISSTimesForMyLocation

//module.exports = { fetchISSFlyOverTimes };
//module.exports = fetchCoordsByIP;
//module.exports = fetchMyIP
