const User = require("../models/User.js");

async function runTests() {
  await User.query()
	.then((users) => {
	  users.forEach((user) => {
		console.log("FIRSTNAME", user.firstName);

		console.log(user);
	  });
	})
	.catch((err) => console.log(err.message));
}