const knex = require("./api/db.js");
const objection = require("objection");
objection.Model.knex = knex;

// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require('joi');

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