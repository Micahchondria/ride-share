<template>
  <v-container>
    <div>
        <h4 class="display-1">System</h4>

        <ul v-bind:items="categories">
            <li v-for="category in categories" :key="category.text">
                <v-btn v-bind:to="{ name: category.value }">{{ category.text }}</v-btn>
            </li>
        </ul>

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
        categories: [
            { text: "Vehicles", value: "vehicles" },
            { text: "Vehicle types", value: "vehicleTypes" },
            { text: "Locations", value: "locations" },
            { text: "Users", value: "users" },
            { text: "Rides", value: "rides" },
            { text: "Drivers", value: "drivers" },
            { text: "Passengers", value: "passengers" }
        ],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

//   mounted: function() {
//     this.$axios.get("/users").then(response => {
//       this.users = response.data.map(user => ({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         isAdmin: user.isAdmin
//       }));
//     });
//   },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
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
</script>

<style>
.currentuser {
  background: lightcoral;
}
</style>
