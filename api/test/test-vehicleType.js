objection = require('objection');
const Model = objection.Model;
const knex = require('../db.js');
Model.knex(knex);

const VehicleType = require('../models/VehicleType');

async function relationTest() {
    try {
        let sampleVehicleTypes = await VehicleType.query()
            .where('id', '1');
        let sampleVehicle = await sampleVehicleTypes[0].$relatedQuery('vehicle')
            .select('model', 'capacity');
        console.log(sampleVehicle);
    } catch (e) {
        console.log(e);
    }
}

async function runTests() {
    await relationTest();
    knex.destroy();
}

runTests();