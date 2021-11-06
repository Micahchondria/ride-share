const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }

    static get relationMappings() {
        return {

        }
    }
}

module.exports = Location;