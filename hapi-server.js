// const knex = require("./api/db.js");
// console.log(knex);
const knex = require("knex")({
  client: "pg",
  connection: {
    host: 'pg.cse.taylor.edu',
    user: 'catherine_bell',
    password: 'kunitase',
    database: 'catherine_bell'
  },
});
// const objection = require("objection");
// objection.Model.knex = knex;
const { Model } = require("objection");
Model.knex(knex);

// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require('@hapi/joi');

// Load model classes.
const Driver = require("./api/models/Driver");
const Drivers = require("./api/models/Drivers");
const Location = require("./api/models/Location");
const Passenger = require("./api/models/Passenger");
const Ride = require("./api/models/Ride");
const State = require("./api/models/State");
const User = require("./api/models/User");
const Vehicle = require("./api/models/Vehicle");
const VehicleType = require("./api/models/VehicleType");

const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: true,
    },
  });

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    await server.register({
      plugin: require("hapi-pino"),
      options: {
        prettyPrint: true
      }
    });
    
    server.route([
      {
        method: "GET",
        path: "/",
        handler: (request, h) => {
          return "Welcome to the ride share site";
        },
      },
      {
        method: "GET",
        path: "/users",
        handler: (request, h) => {
          return User.query();
        },
      },
      {
        method: "GET",
        path: "/drivers",
        handler: (request, h) => {
          return Drivers.query();
        },
      },
      {
        method: "GET",
        path: "/rides",
        handler: (request, h) => {
          return Ride.query();
        },
      },
      {
        method: "GET",
        path: "/vehicletypes",
        handler: (request, h) => {
          return VehicleType.query();
        },
      },
      {  
        method: "GET",
        path: "/vehicles",
        handler: (request, h) => {
          return Vehicle.query();
        },
      },
      {
        method: "GET",
        path: "/locations",
        handler: (request, h) => {
          return Location.query();
        },
      },
      
      // not working, probably because of messing with users; easy to fix
      {
        method: "GET",
        path: "/passengers",
        handler: (request, h) => {
          return Passenger.query().withGraphFetched("user");
        },
      },
      {
        method: "POST",
        path: "/users",
        options: {
          validate: {
            payload: Joi.object({
              firstName: Joi.string().min(1).max(140).required(),
              lastName: Joi.string().min(1).max(140).required(),
              email: Joi.string().min(1).max(140).required(),
              password: Joi.string().min(1).max(140).required(),
              phone: Joi.number().integer().min(1000000).max(9999999999).required(),
              isAdmin: Joi.boolean().required()
            })
          }
        },
        handler: async (request, h) => {
          let user = await User.query().insert(request.payload);
          if (user) return h.response(user).code(201);
          return Boom.badRequest(`Could not create user with ID ${request.params.id}`);
        }
      },

      {
        method: "POST",
        path: "/login",
        config: {
          description: "Log in",
          validate: {
            payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().min(8).required(),
            }),
          },
        },
        handler: async (request, h) => {
          const user = await User.query()
            .where("email", request.payload.email)
            .first();
          if (
            user &&
            (await user.verifyPassword(request.payload.password))
          ) {
            return {
              ok: true,
              msge: `Logged in successfully as '${request.payload.email}'`,
              details: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            };
          } else {
            return {
              ok: false,
              msge: "Invalid email or password",
            };
          }
        },
      },

      {
        method: "POST",
        path: "/drivers",
        options: {
          validate: {
            payload: Joi.object({
              licenseNumber: Joi.string().min(1).max(20).required(),
              licenseState: Joi.string().min(1).max(2).required(),
            })
          }
        },
        handler: async (request, h) => {
          let driver = await Driver.query().insert({
            userId: 1,
            licenseNumber: request.payload.licenseNumber,
            licenseState: request.payload.licenseState
          });
          if (driver) return h.response(driver).code(201);
          return Boom.badRequest(`Could not create driver with ID ${request.params.id}`);
        }
      },
      {
        method: "POST",
        path: "/rides",
        options: {
          validate: {
            payload: Joi.object({
              date: Joi.string().min(1).max(50).required(),
              time: Joi.string().min(1).max(20).required(),
              distance: Joi.number().required(),
              fee: Joi.number().required(),
              vehicleId: Joi.number().integer().required(),
              fromLocationId: Joi.number().integer().required(),
              toLocationId: Joi.number().integer().required()
            })
          }
        },
        handler: async (request, h) => {
          let ride = await Ride.query().insert(request.payload);
          if (ride) return h.response(ride).code(201);
          return Boom.badRequest(`Could not create ride with ID ${request.params.id}`);
        }  
      },
      // {
      //   method: "POST",
      //   path: "/vehicletypes",
        
      // },
      { 
        method: "POST",
        path: "/vehicles",
        options: {
          validate: {
            payload: Joi.object({
              make: Joi.string().min(1).max(140).required(),
              model: Joi.string().min(1).max(140).required(),
              color: Joi.string().min(1).max(140).required(),
              vehicleTypeId: Joi.number().integer().required(),
              capacity: Joi.number().integer().required(),
              licenseState: Joi.string().min(1).max(2).required(),
              licensePlate: Joi.string().min(1).max(15).required(),
            })
          }
        },
        handler: async (request, h) => {
          let vehicle = await Vehicle.query().insert({
            make: request.payload.make,
            model: request.payload.model,
            color: request.payload.color,
            vehicleTypeId: request.payload.vehicleTypeId, //NOTE Postman sees actual value, Postgres gets <null>
            capacity: request.payload.capacity,
            licenseState: request.payload.licenseState,
            licensePlate: request.payload.licensePlate,
          });
          if (vehicle) return h.response(vehicle).code(201);
          return Boom.badRequest(`Could not create vehicle with ID ${request.params.id}`);
        }
      },
      {
        method: "POST",
        path: "/locations",
        options: {
          validate: {
            payload: Joi.object({
              name: Joi.string().min(1).max(140).required(),
              address: Joi.string().min(1).max(140).required(),
              city: Joi.string().min(1).max(140).required(),
              state: Joi.string().min(1).max(2).required(),
              zipCode: Joi.string().min(1).max(15).required(),
              fuelPrice: Joi.number().required(),
            })
          }
        },
        handler: async (request, h) => {
          let location = await Location.query().insert({
            name: request.payload.name,
            address: request.payload.address,
            city: request.payload.city,
            state: request.payload.state, //NOTE Postman sees actual value, Postgres gets <null>
            zipCode: request.payload.zipCode,
            fuelPrice: request.payload.fuelPrice,
          });
          if (location) return h.response(location).code(201);
          return Boom.badRequest(`Could not create location with ID ${request.params.id}`);
        }
      },
      {
        method: "POST",
        path: "/passengers",
        handler: (request, h) => {
          return Passenger.query();
        },
      }

    ]);
    
    // Output logging information.
    // await server.register({
    //     // plugin: require("hapi-pino"),
    //     // options: {
    //     // prettyPrint: true,
    //     // },
    // });

    await server.start();
}

init();
