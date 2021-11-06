const { Model } = require('objection');

class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }

    static get relationMappings() {
        return {

        }
    }
}

module.exports = Authorization;