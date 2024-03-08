const { cities, vehicles } = require('../constants/constants');

let fugitiveLocation = '';
const simulateFugitiveLocation = () => {
  fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;
};

const findCapturedByCop = (copChoices) => {
  const capturedByCop = copChoices.find((choice) => {
    const copCity = cities.find((city) => city.name === choice.city);
    const copVehicle = vehicles.find((vehicle) => vehicle.kind === choice.vehicle);
    return choice.city === fugitiveLocation && copVehicle.range > 2 * copCity.distance;
  });
  return capturedByCop;
};

module.exports = { simulateFugitiveLocation, findCapturedByCop };
