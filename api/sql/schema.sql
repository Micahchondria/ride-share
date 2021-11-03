create table if not exists "Vehicle Type"
(
	id serial
		constraint "vehicle type_pk"
			primary key,
	type varchar(40)
);

alter table "Vehicle Type" owner to micah_groeling;

create table if not exists "State"
(
	abbreviation varchar(2) not null
		constraint state_pk
			primary key,
	name varchar(40)
);

alter table "State" owner to micah_groeling;

create table if not exists "Vehicle"
(
	id serial
		constraint vehicle_pk
			primary key,
	make varchar(20),
	model varchar(20),
	color varchar(40),
	capacity integer,
	mpg double precision,
	"licensePlate" varchar(20),
	"vehicleTypeId" integer
		constraint "vehicle_vehicle type_id_fk"
			references "Vehicle Type",
	"licenseState" varchar(2)
		constraint vehicle_state_abbreviation_fk
			references "State"
);

alter table "Vehicle" owner to micah_groeling;

create table if not exists "Location"
(
	id serial
		constraint location_pk
			primary key,
	name varchar(40),
	address varchar(40),
	city varchar(40),
	"zipCode" varchar(10),
	state varchar(40)
		constraint location_state_abbreviation_fk
			references "State"
);

alter table "Location" owner to micah_groeling;

create table if not exists "Ride"
(
	id serial
		constraint ride_pk
			primary key,
	date date,
	time time,
	distance double precision,
	"fuelPrice" double precision,
	fee double precision,
	"vehicleId" integer
		constraint ride_vehicle_id_fk
			references "Vehicle",
	"fromLocationId" integer
		constraint ride_location_id_fk
			references "Location",
	"toLocationId" integer
		constraint ride_location_id_fk_2
			references "Location"
);

alter table "Ride" owner to micah_groeling;

create table if not exists "User"
(
	id serial
		constraint user_pk
			primary key,
	"firstName" varchar(40),
	"lastName" varchar(40),
	email varchar(40),
	password varchar(40),
	phone varchar(20),
	"isAdmin" boolean
);

alter table "User" owner to micah_groeling;

create table if not exists "Driver"
(
	id serial
		constraint driver_pk
			primary key,
	"licenseNumber" varchar(40),
	"userId" integer
		constraint driver_user_id_fk
			references "User",
	"licenseState" varchar(40)
		constraint driver_state_abbreviation_fk
			references "State"
);

alter table "Driver" owner to micah_groeling;

create table if not exists "Authorization"
(
	"driverId" integer not null
		constraint authorization_driver_id_fk
			references "Driver",
	"vehicleId" integer not null
		constraint authorization_vehicle_id_fk
			references "Vehicle",
	constraint authorization_pk
		primary key ("driverId", "vehicleId")
);

alter table "Authorization" owner to micah_groeling;

create table if not exists "Drivers"
(
	"driverId" integer not null
		constraint drivers_driver_id_fk
			references "Driver",
	"rideId" integer not null
		constraint drivers_ride_id_fk
			references "Ride",
	constraint drivers_pk
		primary key ("driverId", "rideId")
);

alter table "Drivers" owner to micah_groeling;

create table if not exists "Passenger"
(
	"userId" integer not null
		constraint passenger_user_id_fk
			references "User",
	"rideId" integer not null
		constraint passenger_ride_id_fk
			references "Ride",
	constraint passenger_pk
		primary key ("userId", "rideId")
);

alter table "Passenger" owner to micah_groeling;

