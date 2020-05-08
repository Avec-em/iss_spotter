// const fetchMyIP = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("No! It didnt work:" , error);
//     return;
//   }

//   console.log('Yes! It worked! IP:' , ip);
// });

// const fetchCoordsByIP = require('./iss');

// fetchCoordsByIP('70.68.80.95', (error, coords) => {
//   if (error) {
//     console.log("No! It didnt work:" , error);
//     return;
//   }

//   console.log('Yes! It worked! Coords:' , coords);
// });

// const { fetchISSFlyOverTimes } = require('./iss');

// const myCoords = { latitude: '49.32310', longitude: '-122.86260' };

// fetchISSFlyOverTimes(myCoords, (error, passTimes) => {
//   if (error) {
//     console.log("No! It didnt work:" , error);
//     return;
//   }

//   console.log('Yes! It worked! Pass Over Head times:' , passTimes);
// });

const nextISSTimesForMyLocation = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const nextTime = new Date();
    nextTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${nextTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("No! It didnt work:", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});