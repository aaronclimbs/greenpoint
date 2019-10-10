const axios = require('axios');
const db = require("../models");
var ObjectId = require('mongoose').Types.ObjectId

var today = Date.now()

console.log("Today is" + today)


module.exports = {
  findAll: function(req, res) {
    db.Log
      .find(req.query)
      .populate( "eventID")
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByIdDate: function(req, res) {
    console.log("Findy by ID Date User id is " + req.params.id)
    console.log("Findy by ID Date is " + req.params.date)
    db.Log
      .aggregate([
      {$match: { $and: [{userID:ObjectId(req.params.id)}, {eventDate: req.params.date}]}},  
      // {$group: {
      //   _id:"$eventCat",
      //   totalPoints: {$sum: {$multiply: ["$eventQuantity",'$eventPoints']}}
      // }}

    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Log
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  groupByEventDate: function(req, res) {
    console.log("User id is " + req.params.id)
    console.log("Date is " + req.params.date)
    db.Log
      .aggregate([
      {$match: { $and: [{userID:ObjectId(req.params.id)}, {eventDate: req.params.date}]}},  
      {$group: {
        _id:"$eventCat",
        totalPoints: {$sum: {$multiply: ["$eventQuantity",'$eventPoints']}}
      }},
      {$sort: {totalPoints: -1}}

    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Log
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("received an update for " + req.params.id)
    console.log("update data is " + req.body)
    db.Log
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Items to delete is " + req.params.id)
    db.Log
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};