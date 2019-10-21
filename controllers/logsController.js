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
      {$sort: {_id: 1}}

    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  groupByEventMonth: function(req, res) {
    console.log("User id is " + req.params.id)
    console.log("Month is " + req.params.month)
    var month = parseInt(req.params.month)
    var year = parseInt(req.params.year)
    db.Log
      .aggregate([
      {$match: { $and: [{userID:ObjectId(req.params.id)}, {eventMonth: month}, {eventYear: year}]}},  
      {$group: {
        _id:"$eventCat",
        totalPoints: {$sum: {$multiply: ["$eventQuantity",'$eventPoints']}}
      }},
      {$sort: {_id: 1}}

    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  groupByUserTotalMonth: function(req, res) {
    
    
    var month = parseInt(req.params.month)
    var year = parseInt(req.params.year)
    db.Log
    .aggregate([
      {$lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user_info"
      }},
      {$unwind: "$user_info"},
   {$match: { $and: [ {eventMonth: month}, {eventYear: year}]}},  
   {$group: {
 
     _id: "$user_info.name", count: {$sum: {$multiply: ["$eventPoints", "$eventQuantity"] }}}},
  { 
     $sort: 
     {"count":-1 }
   },
   {$limit:10}

  ])
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
},

groupByUserCatStatsMonth: function(req, res) {
console.log("Leaderboard info query " + month + " " + year)
  var month = parseInt(req.params.month)
  var year = parseInt(req.params.year)

  db.Log
  .aggregate([
    {$lookup: {
      from: "users",
      localField: "userID",
      foreignField: "_id",
      as: "user_info"
    }},
    {$unwind: "$user_info"},
 {$match: { $and: [ {eventCat: req.params.category}, {eventMonth: month}, {eventYear: year}]}},  
 {$group: {

   _id: "$user_info.name", count: {$sum: {$multiply: ["$eventPoints", "$eventQuantity"] }}}},
{ 
   $sort: 
   {"count":-1 }
 },
 {$limit:5}

])
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
},

groupBySiteMonth: function(req, res) {
    var month = parseInt(req.params.month)
    var year = parseInt(req.params.year)
    db.Log
    .aggregate([
      {$lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user_info"
      }},
      {$unwind: "$user_info"},
   {$match: { $and: [ {eventMonth: month}, {eventYear: year}]}},  
   {$group: {
  
     _id: null, count: {$sum: {$multiply: ["$eventPoints", "$eventQuantity"] }}}},

  
  ])
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  groupBySiteYear: function(req, res) {
    
    var year = parseInt(req.params.year)
    db.Log
    .aggregate([
      {$lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user_info"
      }},
      {$unwind: "$user_info"},
   {$match: { $and: [ {eventYear: year}]}},  
   {$group: {
  
     _id: null, count: {$sum: {$multiply: ["$eventPoints", "$eventQuantity"] }}}},

  
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