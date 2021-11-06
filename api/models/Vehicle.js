const { Model } = require('objection');

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }

    static get relationMappings() {
        const VehicleType = require('./VehicleType');
        const State = require('./State');
        const Authorization = require('./Authorization');

        return {
            vehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: VehicleType,
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: 'VehicleType.id'
                }
            },

            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            },

            authorization: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'Vehicle.id',
                    to: 'Authorization.vehicleId'
                }
            }
        }
    }
}

module.exports = Vehicle;