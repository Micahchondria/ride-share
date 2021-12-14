const { Model } = require('objection');
const knex = require('../db.js');
Model.knex(knex);
const Driver = require("../models/Driver.js");
console.log(Driver);

async function crudTest() {
    try {
        // create data
        let testDriver = await Driver.query().insert({
            id: 1,
            userId: 2,
            liscenceNumber: 'HIJKL',
            liscenceState: 4,
        });
        console.log(testDriver);

        // retrieve data
        testDriver = await Driver.query()
            .where('1', '2', 'HIJKL', '4');
        console.log(testDriver);
        
        // update data
        const updatedMake = await Driver.query()
            .where('1', '2', 'HIJKL', '4')
            .patch({
                liscenceNumber: 'JKLIH'
            });
        testDriver = await State.query()
            .where('1', '2', 'HIJKL', '4');
        console.log(testState);

        // delete data
        const deletedDriver = await Driver.query()
            .delete()
            .where('1', '2', 'HIJKL', '4');
    } catch (e) {
        console.log(e);
    }
}

async function relationTests() {
    try {
        let sampleDrivers = await Driver.query()
            .where('id', '1');
        let testDriver = sampleDrivers[0];
      
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
