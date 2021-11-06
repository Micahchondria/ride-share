objection = require('objection');
const Model = objection.Model;

class State extends Model {
    static get tableName() {
        return 'State';
    }

    static get relationMappings() {
        const Vehicle = require('./Vehicle');

        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            }
        }
    }
}

module.exports = State;