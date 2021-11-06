const { Driver } = require('./Driver');

objection = require('objection');
const Model = objection.Model;

class State extends Model {
    static get tableName() {
        return 'State';
    }

    static get idColumn() {
        return 'abbreviation';
    }

    static get relationMappings() {
        const Vehicle = require('./Vehicle');
        const Location = require('./Location');

        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            },

            location: {
                relation: Model.HasManyRelation,
                modelClass: Location,
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            },

            driver: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + "/Driver",
                join: {
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            }
        }
    }
}

module.exports = State;