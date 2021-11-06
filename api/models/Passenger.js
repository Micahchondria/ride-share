// const exports = module.exports = {}
const { Model } = require('objection');
const { knex } = require('../db.js');
class Passenger extends Model{
    static get tableName() {
        return 'Passenger';
    }
    static get relationMappings(){
        const User=require("./User.js");
        const Ride=require("./Ride.js");

        return {
            ride: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join:{
                    from: "Passenger.rideId",
                    to: "Ride.id"
                },
            },

            user: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join:{
                    from: "Passenger.userId",
                    to: "User.id"
                },
            }
        }
    }
    getDrivers(){
        return this.$relatedQuery("driver")
        .$relatedQuery("user")
      .select("firstName")
      .then((theUser) => {
        return theUser;
      })
      .catch((err) => {
        console.log(err);
      });
    }
}
module.exports = {Passenger};