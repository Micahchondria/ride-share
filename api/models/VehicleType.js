objection = require('objection');
const Model = objection.Model;

const Vehicle = require('./Vehicle');

class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }

    static get relationMappings() {
        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'VehicleType.id',
                    to: 'Vehicle.vehicleTypeId'
                }
            }
        }
    }
}

module.exports = VehicleType;