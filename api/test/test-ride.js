const { Model } = require('objection');
const knex = require('../db.js');
Model.knex(knex);

const Ride = require('../models/Ride');

// tests create, read, update, delete functions of the model
async function crudTest() {
    try {
        // create data
        let testRide = await Ride.query().insert({
            time: '12:00:00',
            distance: 5,
            fuelPrice: 75,
            vehicleId: 1,
            fromLocationId: 1,
            toLocationId: 1
        });
        console.log(testRide);

        // retrieve data
        testRide = await Ride.query()
            .where('id', '1');
        console.log(testRide);
        
        // update data
        await Ride.query()
            .where('distance', 5)
            .where('fuelPrice', 75)
            .patch({
                time: '12:00:01'
            });
        testRide = await Ride.query()
            .where('distance', 5)
            .where('fuelPrice', 75);
        console.log(testRide);

        // delete data
        await Ride.query()
            .delete()
            .where('distance', 5)
            .where('fuelPrice', 75);
    } catch (e) {
        console.log(e);
    }
}

async function relationTests() {
    try {
        let rides = await Ride.query()
            .where('id', '1');
        let testRide = rides[0];

        // test Vehicle relation
        let vehicle = await testRide.$relatedQuery('vehicle')
            .select('make', 'model');
        console.log(vehicle);

        // test fromLocation relation
        let fromLocation = await testRide.$relatedQuery('fromLocation')
            .select('name');
        console.log(fromLocation);

        // test toLocation relation
        let toLocation = await testRide.$relatedQuery('toLocation')
            .select('name');
        console.log(toLocation);

        // test passenger relation
        let passengers = await testRide.$relatedQuery('passenger');
        console.log(passengers);

        // test drivers relation
        let drivers = await testRide.$relatedQuery('drivers');
        console.log(drivers);
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