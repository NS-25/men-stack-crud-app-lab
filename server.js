
/// dotenv section
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const Car = require("./models/cars.js");

//express section
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

///Mongoose section....
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

////

app.get("/", async (req, resp) => {
  // console.log("hello");
  resp.render("main.ejs");
});

/// cars (index) displays a list of car
app.get("/cars", async (req, resp) => {
  const cars = await Car.find({})
  resp.render("displaycars.ejs", { cars: cars });
});
// cars/new  (new) show a form to create a new car
app.get("/cars/new", async (req, resp) => {

  resp.render("createcars.ejs");
});
// create a new car using post method.... (creat a new car)...
app.post("/cars", async (req, resp) => {
  const newCar = req.body;
  // console.log(req.body);
  console.log(newCar);
  await Car.create(newCar);
  resp.redirect("/cars");
});
/// cars/:id (Displays a specificcar by it id:);
// app.get("/cars/:id", async (req, resp) => {

//   resp.render("ok!");
// });

//// cars/:id/edit ( show a form to edit an existing car)..
app.get("/cars/:id/edit", async (req, resp) => {
  const car = await Car.findById(req.params.id);
  resp.render("editcar.ejs", { car: car });
});
///// cars/:id PUT method to update... ( update a specific car by it :id);
app.put("/cars/:id", async (req, resp) => {
  await Car.findByIdAndUpdate(req.params.id, req.body)
  resp.redirect("/cars");
});

// cars/:id destroy using delete method ( deletes a specific plant by its ID);
app.delete("/cars/:id", async (req, resp) => {
  await Car.findByIdAndDelete(req.params.id)
  resp.redirect("/cars");
});






app.listen(3000, () => {
  console.log("I am running on port 3000!")
});