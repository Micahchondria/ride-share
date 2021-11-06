const { Model } = require('objection');
const Ride = require('./Ride');

class Drivers extends Model {
    static get tableName() {
        return 'Drivers';
    }

    static get relationMappings() {
        const Driver = require('./Driver');
        const Ride = require('./Ride');

        return {
            driver: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'Drivers.driverId',
                    to: 'Driver.id'
                }
            },

            ride: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Drivers.rideId',
                    to: 'Ride.id'
                }
            }
        }
    }
}

module.exports = Drivers;