const { Model } = require('objection');
const knex = require('../db.js');
Model.knex(knex);

const Location = require('../models/Location');

// tests create, read, update, delete functions of the model
async function crudTest() {
    try {
        // create data
        let testLocation = await Location.query().insert({
            name: 'test-location',
            address: '1 test st',
            city: 'test city',
            state: 'AK',
            zipCode: 3
        });
        console.log(testLocation);

        // retrieve data
        testLocation = await Location.query()
            .where('id', '1');
        console.log(testLocation);
        
        // update data
        await Location.query()
            .where('city', 'like', 'test city')
            .patch({
                zipCode: 11
            });
        testLocation = await Location.query()
            .where('city', 'like', 'test city');
        console.log(testLocation);

        // delete data
        await Location.query()
            .delete()
            .where('city', 'like', 'test city');
    } catch (e) {
        console.log(e);
    }
}

async function relationTests() {
    try {
        let locations = await Location.query()
            .where('id', '1');
        let testLocation = locations[0];

        // test State relation
        let state = await testLocation.$relatedQuery('stateRelation')
            .select('abbreviation', 'name');
        console.log(state);

        // test Ride relations
        let rideFrom = await testLocation.$relatedQuery('rideFrom');
        console.log(rideFrom);
        let rideTo = await testLocation.$relatedQuery('rideTo');
        console.log(rideTo);
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