INSERT INTO public."State" (abbreviation, name) VALUES ('AK', 'Alaska');

INSERT INTO public."Location" (id, name, address, city, "zipCode", state) VALUES (1, 'My house', '361 Nonsense Ave', 'Anchorage', '06063', 'AK');

INSERT INTO public."Vehicle Type" (id, type) VALUES (1, 'Sedan');

INSERT INTO public."Vehicle" (id, make, model, color, capacity, mpg, "licensePlate", "vehicleTypeId", "licenseState") VALUES (1, '56', 'Corolla', 'Blue', 17, 12, '666-666-666', 1, 'AK');

INSERT INTO public."Ride" (id, date, time, distance, "fuelPrice", fee, "vehicleId", "fromLocationId", "toLocationId") VALUES (1, '2021-11-05', '12:00:00', 1, 70, 3, 1, 1, 1);

INSERT INTO public."User" (id, "firstName", "lastName", email, password, phone, "isAdmin") VALUES (1, 'Person', 'McJenkins', 'person.mcjenkins@gmail.com', 'password-time', '765-555-7777', false);

INSERT INTO public."Driver" (id, "licenseNumber", "userId", "licenseState") VALUES (1, '55555', 1, 'AK');

INSERT INTO public."Passenger" ("userId", "rideId") VALUES (1, 1);

INSERT INTO public."Drivers" ("driverId", "rideId") VALUES (1, 1);

INSERT INTO public."Authorization" ("driverId", "vehicleId") VALUES (1, 1);