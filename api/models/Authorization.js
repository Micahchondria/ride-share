const { Model } = require('objection');

class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }

    static get relationMappings() {
        const Driver = require('./Driver');
        const Vehicle = require('./Vehicle');

        return {
            driver: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'Drivers.driverId',
                    to: 'Driver.id'
                }
            },

            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Drivers.vehicleId',
                    to: 'Vehicle.id'
                }
            }
        }
    }
}

module.exports = Authorization;