const mongoose = require("mongoose");
const db = require("../models");


// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://"
// );

const actionSeed = [
  {userAction: "Recycle Plastic Bottle", points: 5, category: "re-use", added: true},
  {userAction: "Recycle Aluminum Can", points: 5, category: "re-use", added: true},
  {userAction: "Recycle Cardboard", points: 5, category: "re-use", added: true},
  {userAction: "Use Plastic Grocery Bag", points: -5, category: "food", added: true},
  {userAction: "Use Paper Grocery Bag", points: -2, category: "food", added: true},
  {userAction: "Re-use canvas Grocery Bag", points: 6, category: "food", added: true},
  {userAction: "Plant a Tree", points: 10, category: "green_action", added: true},
  {userAction: "Walk 1 Mile", points: 5, category: "transportation", added: true},
  {userAction: "Bike 1 Mile", points: 4, category: "transportation", added: true},
  {userAction: "Ride-share 1 Mile", points: 3, category: "transportation", added: true},
  {userAction: "Drive 1 Mile", points: -5, category: "transportation", added: true},
  {userAction: "Ride Electric Scooter 1 Mile", points: -1, category: "transportation", added: true},
  {userAction: "Ride Electric Bike 1 Mile", points: -1, category: "transportation", added: true},
  {userAction: "Use Public Transportation 1 Mile", points: 2, category: "transportation", added: true},
  {userAction: "Consume 1 Unit of Local Produce", points: 3, category: "food", added: true},
  {userAction: "Use Re-usable Water Bottle 5 times", points: 4, category: "re-use", added: true},
  {userAction: "Recycle Used Motor Oil", points: 3, category: "re-use", added: true},
  {userAction: "Properly Dispose of Batteries", points: 5, category: "re-use", added: true},
  {userAction: "Use Ecological Cleaning Products", points: 5, category: "lifestyle", added: true},
  {userAction: "Use of Non-eco Cleaning Products", points: -5, category: "lifestyle", added: true},
  {userAction: "Take a Plane Flight", points: -20, category: "transportation", added: true},
  {userAction: "Recycle Electronics", points: 5, category: "re-use", added: true},
  {userAction: "Pick up 5 items of Trash", points: 5, category: "green_action", added: true},
  {userAction: "Use Plastic Utensils", points: -5, category: "food", added: true},
  {userAction: "Bring Re-usable Utensils to Eat Out", points: 5, category: "food", added: true},
  {userAction: "Repair items of Clothing", points: 4, category: "lifestyle", added: true},
  {userAction: "Buy New Item of Clothing", points: -4, category: "lifestyle", added: true},
  {userAction: "Print on Regular Paper", points: -2, category: "lifestyle", added: true},
  {userAction: "Replace Dairy Products with Alternative", points: 5, category: "food", added: true},
  {userAction: "Consume Dairy Product", points: -3, category: "food", added: true},
  {userAction: "Replace Meat Product with Alternative", points: 5, category: "food", added: true},
  {userAction: "Consume Meat Product", points: -5, category: "food", added: true},
  {userAction: "Consume Fish Product", points: -5, category: "food", added: true},
  {userAction: "Borrowed Item instead of Bought", points: 4, category: "lifestyle", added: true},
  {userAction: "Reduce Energy Consumption in the Home", points: 5, category: "lifestyle", added: true},
  {userAction: "Volunteer at a Local Park", points: 5, category: "green_action", added: true}
];


db.Action
  .remove({})
  .then(() => db.Action.collection.insertMany(actionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });