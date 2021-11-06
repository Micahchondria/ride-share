const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }

    static get relationMappings() {
        const State = require('./State');

        return {
            stateRelation: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'
                }
            }
        }
    }
}

module.exports = Location;