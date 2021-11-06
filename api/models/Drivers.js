const { Model } = require('objection');

class Drivers extends Model {
    static get tableName() {
        return 'Drivers';
    }

    static get relationMappings() {
        return {

        }
    }
}

module.exports = Drivers;