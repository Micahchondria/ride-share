const Passenger = require("../models/Passenger.js");

Passenger.query()
  .then((passengers) => {
    passengers.forEach((passenger) => {
      console.log("Passengers: ", passenger);
      passenger.getPassenger().then((user) => console.log("User: ", user));
    });
  })
  .catch((err) => console.log(err.message));