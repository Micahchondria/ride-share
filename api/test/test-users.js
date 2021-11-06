const User = require("../models/User.js");

async function runTests() {
  await User.query()
	.then((users) => {
	  users.forEach((user) => {
		console.log("Firstname: ", user.firstName);

		console.log(user);
	  });
	})
	.catch((err) => console.log(err.message));
}

 micah = {
   id: 1,
   firstName: "Micah",
   lastName: "chondria",
   email: "micah@example.com",
   password: "password321",
   phone: 8001337,
   isAdmin: false,
 }

User.query()
  .insert(micah)
  .then(result => console.log(result))
  .catch((err) => console.log(err));


User.query()
 .deleteById(0)
 .catch((err) => console.log(err));

User.query()
   .patch({ password: "password123" })
   .catch((err) => console.log(err));

runTests();