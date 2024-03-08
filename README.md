## Fugitive Capture Game Server

This is a Node.js server for a fugitive capture game where players (cops) choose cities to investigate and vehicles to use in order to capture a fugitive. The server provides endpoints to retrieve available cities and vehicles, as well as a game endpoint to simulate the capture attempt.

## Installation

1. Clone this repository: `git clone (https://github.com/dilleswar16/cop-backend-game.git)`
2. Install dependencies: `npm install`
3. Server Live `https://cop-backend-game.onrender.com`
4. Front end Live `https://cop-frontend-game.onrender.com`

## Usage

1. Start the server: `nodemon index.js || node index.js`
2. Access the server endpoints:

   - GET `/cities`: Retrieve available cities.
   - GET `/vehicles`: Retrieve available vehicles.
   - POST `/game`: Start a new game with cop choices. Body should contain cop choices in the format `{ cop1: { city: "CityName", vehicle: "VehicleName" }, cop2: ... }`.
   - GET `/testgame`: Simulate a game with randomly generated cop choices for testing purposes. This endpoint generates random cop choices, sends them to the `/game` endpoint to simulate the capture attempt, and returns the result of the simulation.

## Dependencies

- express: Web server framework for Node.js.
- body-parser: Middleware for parsing incoming request bodies.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).

## Constants

- `cities`: Array of available cities.
- `vehicles`: Array of available vehicles.

## Game Logic

- `simulateFugitiveLocation()`: Simulates the fugitive's location.
- `findCapturedByCop(copChoices)`: Finds if the fugitive was captured by any cop based on their choices.


