const { Model } = require('objection');
const knex = require('../db.js');
Model.knex(knex);

const State = require('../models/State');

// tests create, read, update, delete functions of the model
async function crudTest() {
    try {
        // create data
        let testState = await State.query().insert({
            abbreviation: 'TS',
            name: 'Test'
        });
        console.log(testState);

        // retrieve data
        testState = await State.query()
            .where('abbreviation', 'TS');
        console.log(testState);
        
        // update data
        const updatedMake = await State.query()
            .where('abbreviation', 'TS')
            .patch({
                name: 'Test-2'
            });
        testState = await State.query()
            .where('abbreviation', 'TS');
        console.log(testState);

        // delete data
        const deletedState = await State.query()
            .delete()
            .where('abbreviation', 'TS');
    } catch (e) {
        console.log(e);
    }
}

async function relationTests() {
    try {
        let States = await State.query()
            .where('abbreviation', 'AK');
        let testState = States[0];

        // test Vehicle
        let vehicles = await testState.$relatedQuery('vehicle')
            .select('model')
        console.log(vehicles);

        // test location relation
        let locations = await testState.$relatedQuery('location')
            .select('name');
        console.log(locations);

        // test driver relation
        let drivers = await testState.$relatedQuery('driver');
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