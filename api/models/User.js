
const { Model } = require('objection');
class User extends Model{
    static get tableName() {
        return 'User';
    }

    static get relationMappings(){
        const Driver = require("./Driver.js");
        const Ride = require("./Ride.js");
        const Passenger = require("./Passenger.js");

        return {
            driver: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: "user.id",
                    to: "Driver.userId"
                },
            },

            ride: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + "/Ride",
                join: {
                    from: "User.id",
                    through: {
                        from: "Passenger.userId",
                        to: "Passenger.rideId"
                    },
                    to: "Ride.id"
                }
            },

            passenger: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join:{
                    from: "user.id",
                    to: "Passenger.passengerId"
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

    async verifyPassword(plainTextPassword) {
        return plainTextPassword === this.password;
    }
}

module.exports = User;