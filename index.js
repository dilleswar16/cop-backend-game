const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { simulateFugitiveLocation, findCapturedByCop } = require("./game/game");
const { cities, vehicles } = require("./constants/constants");
const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/cities", (req, res) => {
  res.json(cities);
});

app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

app.post("/game", (req, res) => {
  const copChoices = req.body;
  simulateFugitiveLocation();

  const capturedByCop = findCapturedByCop(copChoices);

  res.status(200).json({
    caught: !!capturedByCop,
    capturedByCop: capturedByCop ? capturedByCop.cop : null,
    message: capturedByCop
      ? `The fugitive was caught by cop ${capturedByCop.cop}`
      : "The fugitive was not caught by any cop.",
  });
});

app.get("/testgame", (req, res) => {
  let dummyCities = cities;
  let dummyVehicles = vehicles;

  const testData = generateRandomTestData(dummyCities,dummyVehicles);

  console.log(testData)
 
  console.log(process.env.HOSTED_URL)
  // Call the /game endpoint with testData as the request body
  fetch(`${process.env.HOSTED_URL}/game`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(testData),
  })
  .then(response => response.json())
  .then(data => {
     // Handle the response from the /game endpoint
     console.log(data);
     res.status(200).json(data);
  })
  .catch((error) => {
     console.error('Error:', error);
     res.status(500).json({ error: 'An error occurred while processing the request.' });
  });
 });
 

 function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomTestData(cities, vehicles) {
  // Create deep copies of cities and vehicles to avoid modifying the original objects
  const dummyCities = JSON.parse(JSON.stringify(cities));
  const dummyVehicles = JSON.parse(JSON.stringify(vehicles));

  const testData = [{
      cop: 1,
      city: "",
      vehicle: "",
    },
    {
      cop: 2,
      city: "",
      vehicle: "",
    },
    {
      cop: 3,
      city: "",
      vehicle: "",
    },
  ];

  // Create a set to track assigned cities
  const assignedCities = new Set();

  for (const copData of testData) {
    // Choose a random city for the cop (ensuring uniqueness)
    let chosenCity;
    do {
      chosenCity = getRandomElement(dummyCities).name;
    } while (assignedCities.has(chosenCity));
    assignedCities.add(chosenCity);
    copData.city = chosenCity;

    // Choose a random vehicle for the cop (considering count)
    const availableVehicles = dummyVehicles.filter(v => v.count > 0);
    if (availableVehicles.length === 0) {
      console.log(`No available vehicles for Cop ${copData.cop}.`);
      continue; // Skip this cop if no vehicles are available
    }
    const chosenVehicle = getRandomElement(availableVehicles);
    copData.vehicle = chosenVehicle.kind;
    chosenVehicle.count--; // Decrease count for chosen vehicle
  }

  return testData;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
