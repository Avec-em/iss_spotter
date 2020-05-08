const request = require('request');

const nextISSTimesForMyLocation = function(callbackNext) {
  fetchMyIP((error, ip) => {
    if (error) {
    return callbackNext(error, null)
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callbackNext(error, null)
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callbackNext(error, null)
        }
        callbackNext(null, passTimes)
      })
    })
  });

};

module.exports = nextISSTimesForMyLocation;