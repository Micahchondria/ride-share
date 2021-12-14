<template>
  <v-container>
    <div>
      <h4 class="display-1">Users</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="userHeaders"
        v-bind:items="users"
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
              <v-icon small class="ml-2" @click="updateuser(item)">
                mdi-pencil
              </v-icon>
              <v-btn @click="assignPassenger(item)">
                Assign as passenger to ride
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>

      <div v-show="isPopupVisible">
        <v-data-table
        class="elevation-1"
        v-bind:headers="rideHeaders"
        v-bind:items="rides"
      >
        <template v-slot:item="{ item }">
          <tr v-show="!idInPassengers(item.passengers)">
            <!-- <td><v-btn v-show="item.userAdded" @click="addToRide()">Add</v-btn></td> -->
            <td><v-btn @click="addToRide(item.id)">Add</v-btn></td>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.toLocation }}</td>
            <td>{{ item.fromLocation }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-btn @click="closePopup()">
        Cancel
      </v-btn>
      <v-btn @click="closePopup()">
        OK
      </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "users",

  data: function() {
    return {
      userHeaders: [
        { text: "First", value: "firstName" },
        { text: "Last", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone"},
        { text: "Action", value: "action" }
      ],
      rideHeaders: [
        { text: "Added", value: "check" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "From", value: "fromLocation" },
        { text: "To", value: "toLocation" }
      ],
      users: [],
      rides: [],
      isPopupVisible: false,
      idToAssign: null,

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
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

    getRides() {
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

    showPopup() {
      this.isPopupVisible = true;
    },

    closePopup() {
      this.isPopupVisible = false;
    },

    assignPassenger(user) {
      this.idToAssign = user.id;
      this.showPopup();
      console.log(this.users);
    },

    addToRide(rideId) {
      this.$axios.post(`/users/${this.idToAssign}/rides/${rideId}`).then(response => {
        if (response.data.ok) {
          console.log("added");
          // update the info you have about rides
          // or do something else that makes it disappear lol
          this.getRides();
        }
      })
    },

    // Calculate the CSS class for an item
    itemClass(item) {
      const currentuser = this.$store.state.currentuser;
      if (currentuser && currentuser.id === item.id) {
        return "currentuser";
      }
    },

    // Update user information.
    updateuser(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
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

// CURRENT STATE: gets correct rides to show for each user and sends correct request to server.
// Does not update what rides a user is in until reload.
// UI: horrific
// Cannot edit user.
</script>

<style>
.currentuser {
  background: lightcoral;
}
</style>
