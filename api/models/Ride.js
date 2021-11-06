const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        return {

        }
    }
}

module.exports = Ride;