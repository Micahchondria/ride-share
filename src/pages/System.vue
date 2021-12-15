<template>
  <v-container>
    <template v-if="driverStatus">
      <label>You are a driver</label>
    </template>
    <template v-else>
    </template>
    <div>
        <h4 class="display-1">System</h4>
        <v-btn v-if="!driverStatus" @click="becomeDriver()">Become a Driver</v-btn>
        <!-- VEHICLES -->
        <v-btn @click="showVehicles = !showVehicles">Vehicles</v-btn>
        <div v-if="showVehicles">
        <!-- <div> -->
            <h4>Vehicles</h4>

            <v-data-table
                class="elevation-1"
                v-bind:headers="vehicleHeaders"
                v-bind:items="vehicles"
            >
            <template v-slot:item="{ item }">
                <tr v-bind:class="itemClass(item)">
                <td>{{ item.make }}</td>
                <td>{{ item.model }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.capacity }}</td>
                <td>{{ item.mpg }}</td>
                <td>{{ item.licensePlate }}</td>
                <td>
                    <v-icon small @click="deletevehicle(item)">
                    mdi-delete
                    </v-icon>
                    <v-icon small class="ml-2" @click="editvehicle(item)">
                    mdi-pencil
                    </v-icon>
                    <v-icon small @click="addvehicle(item)">
                      mdi-plus 
                    </v-icon>
                    <v-btn @click="assignToRide(item)">
                    Assign to a ride
                    </v-btn>
                </td>
                </tr>
            </template>
            </v-data-table>

            <v-card class="elevation=12" v-if="updateVehicle">
                <v-card-text>
                    <v-form>
                        <v-text-field
                        v-model="toAssign.make"
                        name="make"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.model"
                        name="model"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.color"
                        name="color"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.capacity"
                        name="capacity"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.mpg"
                        name="mpg"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.licensePlate"
                        name="licensePlate"
                        type="text"
                        />
                    </v-form>
                    <v-data-table show-select
                    v-model="selected"
                    v-bind:headers="vehicleHeaders"
                    v-bind:items="vehicles">
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn v-on:click="updateVehicle = false">Cancel</v-btn>
                    <v-btn v-on:click="updatevehicle()" color="primary">Update vehicle</v-btn>
                </v-card-actions>
            </v-card>

            
            <v-card class="elevation=12" v-if="createVehicle">
                <v-card-text>
                    <v-form>
                        <v-text-field
                        v-model="toAssign.make"
                        name="make"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.model"
                        name="model"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.color"
                        name="color"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.capacity"
                        name="capacity"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.mpg"
                        name="mpg"
                        type="text"
                        />
                        <v-text-field
                        v-model="toAssign.licensePlate"
                        name="licensePlate"
                        type="text"
                        />
                    </v-form>
                    <v-data-table show-select
                    v-model="selected"
                    v-bind:headers="vehicleHeaders"
                    v-bind:items="vehicles">
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn v-on:click="createVehicle = false">Cancel</v-btn>
                    <v-btn v-on:click="createvehicle(item)" color="primary">Create vehicle</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        
        <!-- USERS -->
        <v-btn @click="showUsers = !showUsers">Users</v-btn>
        <div v-if="showUsers">
            <h4>Users</h4>

            <v-data-table
                class="elevation-1"
                v-bind:headers="userHeaders"
                v-bind:items="users"
                item-key="id"
            >
            <template v-slot:item="{ item }">
                <tr v-bind:class="itemClass(item)">
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>
                    <v-icon small @click="deleteuser(item)">
                    mdi-delete
                    </v-icon>
                    <v-icon small class="ml-2" @click="edituser(item)">
                    mdi-pencil
                    </v-icon>
                    <v-btn @click="assignPassenger(item)">
                    Assign as passenger to ride
                    </v-btn>
                </td>
                </tr>
            </template>
            </v-data-table>
        </div>

        <v-card class="elevation=12" v-if="updateUser">
            <v-card-text>
                <v-form>
                    <v-text-field
                    v-model="userToAssign.firstName"
                    name="firstName"
                    type="text">
                    </v-text-field>
                    <v-text-field
                    v-model="userToAssign.lastName"
                    name="lastName"
                    type="text">
                    </v-text-field>
                    <v-text-field
                    v-model="userToAssign.email"
                    name="email"
                    type="text"
                    />
                    <v-text-field
                    v-model="userToAssign.phone"
                    name="phone"
                    type="text"
                    />
                </v-form>
                <v-data-table show-select
                v-model="selected"
                v-bind:headers="rideHeaders"
                v-bind:items="rides">
                    <!-- <template v-slot:item.data-table-select="{ on, props }">
                        <v-simple-checkbox color="green" v-bind="props" v-on="on"></v-simple-checkbox>
                    </template> -->
                    <!-- <template v-slot:item.name="{ item }" v-show="!idInPassengers(item.passengers)">
                        <td>Custom {{item.name}}</td>
                    </template> -->
                    <!-- <template v-slot:item.data-table-select="{ on, props }">
                        <v-simple-checkbox color="green" v-bind="props" v-on="on"></v-simple-checkbox>
                    </template>
                    <template v-slot:item="{ item }">
                        <tr v-show="!idInPassengers(item.passengers)">
                        <td><v-simple-checkbox color="green" v-bind="props" v-on="on"></v-simple-checkbox></td>
                        <td><template v-slot:item.data-table-select="{ on, props }">
                            <v-simple-checkbox color="green" v-bind="props" v-on="on"></v-simple-checkbox>
                        </template></td>
                        <td><v-btn v-show="item.userAdded" @click="addToRide()">Add</v-btn></td>
                        <td><v-btn @click="addToRide(item.id)">Add</v-btn></td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.time }}</td>
                        <td>{{ item.toLocation }}</td>
                        <td>{{ item.fromLocation }}</td>
                        </tr>
                    </template> -->
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="updateUser = false">Cancel</v-btn>
                <v-btn v-on:click="updateuser()" color="primary">Update user</v-btn>
            </v-card-actions>
        </v-card>

        <!-- <ul v-bind:items="categories">
            <li v-for="category in categories" :key="category.text">
                <v-btn v-bind:to="{ name: category.value }">{{ category.text }}</v-btn>
            </li>
        </ul> -->

      <!-- <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="users"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>
              <v-icon small @click="deleteuser(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateuser(item)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table> -->

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "System",

  data: function() {
    return {
        selected: [],
        
        categories: [
            { text: "Vehicles", value: "vehicles" },
            { text: "Vehicle types", value: "vehicleTypes" },
            { text: "Locations", value: "locations" },
            { text: "Users", value: "users" },
            { text: "Rides", value: "rides" },
            { text: "Drivers", value: "drivers" },
            { text: "Passengers", value: "passengers" }
        ],

        vehicleHeaders: [
            { text: "Make", value: "make" },
            { text: "Model", value: "model" },
            { text: "Color", value: "color" },
            { text: "Capacity", value: "capacity" },
            { text: "MPG", value: "mpg" },
            { text: "License Plate", value: "licensePlate" }
        ],
        vehicles: [],
        showVehicles: false,
        updateVehicle: false,
        createVehicle: false,
        driverStatus: false,
        showDriver: false,

        userHeaders: [
            { text: "First", value: "firstName" },
            { text: "Last", value: "lastName" },
            { text: "Email", value: "email" },
            { text: "Phone", value: "phone"},
            { text: "Action", value: "action" }
        ],
        users: [],
        showUsers: false,
        updateUser: false,

        rideHeaders: [
            { text: "Date", value: "date" },
            { text: "Time", value: "time" },
            { text: "From", value: "fromLocation" },
            { text: "To", value: "toLocation" }
        ],
        rides: [],
        
        userToAssign: {},
        toAssign: {},


      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/vehicles").then(response => {
        this.vehicles = response.data.map(vehicle => ({
            id: vehicle.id,
            make: vehicle.make,
            model: vehicle.model,
            color: vehicle.color,
            capacity: vehicle.capacity,
            mpg: vehicle.mpg,
            licensePlate: vehicle.licensePlate
        }))
    }),

    this.$axios.get("/users").then(response => {
      this.users = response.data.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }));
    });

    this.$axios.get("/rides?passengers=true").then(response => {
      this.rides = response.data.map(ride => ({
        id: ride.id,
        date: ride.date,
        time: ride.time,
        fromLocation: ride.fromLocation.name,
        toLocation: ride.toLocation.name,
        passengers: ride.passenger
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },
    becomeDriver() {
      this.driverStatus = true;
      console.log("You are now a driver");
    },
    // Calculate the CSS class for an item
    itemClass(item) {
      const currentuser = this.$store.state.currentuser;
      if (currentuser && currentuser.id === item.id) {
        return "currentuser";
      }
    },

    // VEHICLE METHODS

    editvehicle(item) {
        this.toAssign = item;
        this.updateVehicle = true;
    },

    addvehicle(item) {
      this.toAssign = item;
      this.createVehicle = true;
    },

    createvehicle(item) {
      this.toAssign = item;
      this.createVehicle = true;
      this.$axios.post(`/vehicles`, {
        make: this.userToAssign.make,
        model: this.userToAssign.model,
        color: this.userToAssign.color,
        capacity: this.userToAssign.capacity,
        licensePlate: this.userToAssign.licensePlate,
      }).then(response => {
        console.log(response);
      });
      
    },

    updatevehicle() {
      this.updateVehicle = false;
      console.log(this.userToAssign.licensePlate);
      /*this.$axios.patch(`/vehicles/${this.userToAssign.licensePlate}`, {
          make: this.userToAssign.make,
          model: this.userToAssign.model,
          color: this.userToAssign.color,
          capacity: this.userToAssign.capacity,
          licensePlate: this.userToAssign.licensePlate
      }).then(response => {
          // force update of visible users Ig
          console.log(response);
      });
      this.selected.forEach(ride => {
          console.log(`${this.userToAssign.licensePlate}, ${ride.id}`);
          this.$axios.post(`/vehicle/${this.userToAssign.licensePlate}/rides/${ride.id}`);
      });

        // reset data table selection
      this.selected = [];
      */
    },

    // USER METHODS

    // open rides for a specific user
    assignPassenger(user) {
    //   this.idToAssign = user.id;
    //   this.showPopup();
        console.log(user);
    //   console.log(this.users);
    },

    idInPassengers(passengers) {
      let value = false;
      passengers.forEach(passenger => {
        console.log(`${passenger.userId}, ${this.idToAssign}, ${value}`);
        if (passenger.userId === this.idToAssign) {
          value = true;
        }
      });
      return value;
    },

    addUserToRide(rideId) {
      this.$axios.post(`/users/${this.idToAssign}/rides/${rideId}`).then(response => {
        if (response.data.ok) {
          console.log("added");
          // update the info you have about rides
          // or do something else that makes it disappear lol
        }
      })
    },

    // Update user information.
    edituser(item) {
        this.userToAssign = item;
        this.updateUser = true;
      console.log("UPDATE", JSON.stringify(item, null, 2));
    //   this.showSnackbar("Sorry, update is not yet implemented.");
    },

    updateuser() {
        this.updateUser = false;
        console.log(this.userToAssign.email);
        this.$axios.patch(`/users/${this.userToAssign.id}`, {
            firstName: this.userToAssign.firstName,
            lastName: this.userToAssign.lastName,
            email: this.userToAssign.email,
            phone: this.userToAssign.phone
        }).then(response => {
            // force update of visible users Ig
            console.log(response);
        });
        this.selected.forEach(ride => {
            console.log(`${this.userToAssign.id}, ${ride.id}`);
            this.$axios.post(`/users/${this.userToAssign.id}/rides/${ride.id}`);
        });

        // reset data table selection
        this.selected = [];
    },

    // Delete an user.
    deleteuser(item) {
      this.$axios.delete(`/users/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local user
          // by filtering the deleted user from the list of users.
          this.users = this.users.filter(
            user => user.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentuser {
  background: lightcoral;
}

.v-input--selection-controls__ripple.green--text {
   color: blue !important;
}
</style>
