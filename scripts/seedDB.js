const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/greenpoint_test"
);

const eventsSeed = [
  {name: "Recycle Plastic Bottle", points: 5, category: "re-use", added: true},
  {name: "Recycle Aluminum Can", points: 5, category: "re-use", added: true},
  {name: "Recycle Cardboard", points: 5, category: "re-use", added: true},
  // {name: "Use Plastic Grocery Bag", points: -5, category: "food", added: true},
  // {name: "Use Paper Grocery Bag", points: -2, category: "food", added: true},
  {name: "Re-use canvas Grocery Bag", points: 6, category: "food", added: true},
  {name: "Plant a Tree", points: 10, category: "green_action", added: true},
  {name: "Walk 1 Mile", points: 5, category: "transportation", added: true},
  {name: "Bike 1 Mile", points: 4, category: "transportation", added: true},
  {name: "Ride-share 1 Mile", points: 3, category: "transportation", added: true},
  // {name: "Drive 1 Mile", points: -5, category: "transportation", added: true},
  // {name: "Ride Electric Scooter 1 Mile", points: -1, category: "transportation", added: true},
  // {name: "Ride Electric Bike 1 Mile", points: -1, category: "transportation", added: true},
  {name: "Use Public Transportation 1 Mile", points: 2, category: "transportation", added: true},
  {name: "Consume 1 Unit of Local Produce", points: 3, category: "food", added: true},
  {name: "Use Re-usable Water Bottle 5 times", points: 4, category: "re-use", added: true},
  {name: "Recycle Used Motor Oil", points: 3, category: "re-use", added: true},
  {name: "Properly Dispose of Batteries", points: 5, category: "re-use", added: true},
  {name: "Use Ecological Cleaning Products", points: 5, category: "lifestyle", added: true},
  // {name: "Use of Non-eco Cleaning Products", points: -5, category: "lifestyle", added: true},
  // {name: "Take a Plane Flight", points: -20, category: "transportation", added: true},
  {name: "Recycle Electronics", points: 5, category: "re-use", added: true},
  {name: "Pick up 5 items of Trash", points: 5, category: "green_action", added: true},
  // {name: "Use Plastic Utensils", points: -5, category: "food", added: true},
  {name: "Bring Re-usable Utensils to Eat Out", points: 5, category: "food", added: true},
  {name: "Repair items of Clothing", points: 4, category: "lifestyle", added: true},
  // {name: "Buy New Item of Clothing", points: -4, category: "lifestyle", added: true},
  // {name: "Print on Regular Paper", points: -2, category: "lifestyle", added: true},
  {name: "Replace Dairy Products with Alternative", points: 5, category: "food", added: true},
  // {name: "Consume Dairy Product", points: -3, category: "food", added: true},
  {name: "Replace Meat Product with Alternative", points: 5, category: "food", added: true},
  // {name: "Consume Meat Product", points: -5, category: "food", added: true},
  // {name: "Consume Fish Product", points: -5, category: "food", added: true},
  {name: "Borrowed Item instead of Bought", points: 4, category: "lifestyle", added: true},
  {name: "Reduce Energy Consumption in the Home", points: 5, category: "lifestyle", added: true},
  {name: "Volunteer at a Local Park", points: 5, category: "green_action", added: true}
];

const usersSeed = [
{
    "name" : "jerry",
    "email" : "jerrytest1@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "james",
    "email" : "jamestest1@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "john",
    "email" : "johntest1@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Mary",
    "email" : "marytest1@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Magdalena",
    "email" : "magdalenatest1@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Sally",
    "email" : "sallytest@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Sloopy",
    "email" : "sloopytest@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Charlie",
    "email" : "charlietest@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Chaz",
    "email" : "chaztest@test.com",
    "password" : "test",
    "__v" : 0
},
{
    "name" : "Snuffalupagus",
    "email" : "snuffalupagustest@test.com",
    "password" : "test",
    "__v" : 0
}
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Event
  .remove({})
  .then(() => db.Event.collection.insertMany(eventsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });