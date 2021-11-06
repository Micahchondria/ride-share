objection = require('objection');
const Model = objection.Model;
const knex = require('../db.js');
Model.knex(knex);

const Vehicle = require('../models/Vehicle');

// tests create, read, update, delete functions of the model
async function crudTest() {
    try {
        // create data
        let testVehicle = await Vehicle.query().insert({
            make: 10,
            model: 'Truck',
            color: 'Green',
            capacity: 5,
            mpg: 25,
            licensePlate: 'TRUCK',
            vehicleTypeId: 1,
            licenseState: 'AK'
        });
        console.log(testVehicle);

        // retrieve data
        testVehicle = await Vehicle.query()
            .where('id', '1');
        console.log(testVehicle);
        
        // update data
        const updatedMake = await Vehicle.query()
            .where('licensePlate', 'like', 'TRUCK')
            .patch({
                make: 11
            });
        testVehicle = await Vehicle.query()
            .where('licensePlate', 'like', 'TRUCK');
        console.log(testVehicle);

        // delete data
        const deletedVehicle = await Vehicle.query()
            .delete()
            .where('licensePlate', 'like', 'TRUCK');
    } catch (e) {
        console.log(e);
    }
}

async function relationTests() {
    try {
        let vehicles = await Vehicle.query()
            .where('id', '1');
        let testVehicle = vehicles[0];

        // test VehicleType relation
        let vehicleType = await testVehicle.$relatedQuery('vehicleType')
            .select('type');
        console.log(vehicleType);

        // test State relation
        let state = await testVehicle.$relatedQuery('state')
            .select('abbreviation', 'name');
        console.log(state);
    } catch (e) {
        console.log(e);
    }
}

async function runTests() {
    await crudTest();
    await relationTests();
    knex.destroy();
}

runTests();