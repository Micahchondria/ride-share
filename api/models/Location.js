const { Model } = require('objection');
const Ride = require('./Ride');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }

    static get relationMappings() {
        const State = require('./State');
        const Ride = require('./Ride');

        return {
            stateRelation: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'
                }
            },

            rideFrom: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationId'
                }
            },

            rideTo: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationId'
                }
            }
        }
    }
}

module.exports = Location;