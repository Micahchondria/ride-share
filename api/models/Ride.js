const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        const Vehicle = require('./Vehicle');
        const Location = require('./Location');
        // const Driver = require('./Driver');
        const User = require('./User');

        return {
            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Ride.vehicleId',
                    to: 'Vehicle.id'
                }
            },

            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.fromLocationId',
                    to: 'Location.id'
                }
            },

            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Ride.toLocationId',
                    to: 'Location.id'
                }
            },

            // driver: {
            //     relation: Model.ManyToManyRelation,
            //     modelClass: Driver,
            //     join: {
            //         from: 'Ride.id',
            //         through: {
            //             from: 'Drivers.driverId',
            //             to: 'Drivers.rideId'
            //         },
            //         to: 'Driver.id'
            //     }
            // },

            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/User",
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Passenger.rideId',
                        to: 'Passenger.userId'
                    },
                    to: 'User.id'
                }
            },

            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Drivers',
                join: {
                    from: 'Ride.id',
                    to: 'Drivers.driverId'
                }
            },

            passenger: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Passenger',
                join: {
                    from: 'Ride.id',
                    to: 'Passenger.rideId'
                }
            }
        }
    }
}

module.exports = Ride;