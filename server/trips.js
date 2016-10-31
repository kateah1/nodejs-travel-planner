var tripRouter = require('express').Router();
var _ = require('lodash');

var myTrips = [];
var myTripDetail = [];
var id = 0;

var addId = function (request, response, next) {
  id++;
  request.body.id = id + '';
  next();
};

tripRouter.param('id', function (request, response, next, id) {
  var trip = _.find(myTrips, {id: id});

  if (trip) {
    request.trip = trip;
    next();
  } else {
    response.send();
  }
});

tripRouter.route('/')
  .get(function (request, response) {
    response.json(myTrips);
  })
  .post(addId, function (request, response) {
    var trip = {
      id: request.body.id,
      name: request.body.name,
      destination: request.body.destination,
      startDate: request.body.startDate,
      endDate: request.body.endDate
    };

    myTrips.push(trip);

    response.json(myTrips);
  });

tripRouter.route('/:id')
  .get(function (request, response) {
    response.json(request.trip);
  })
  .put(function (request, response) {
    var update = {
      name: request.body.name,
      destination: request.body.destination,
      startDate: request.body.startDate,
      endDate: request.body.endDate
    };

    var trip = _.findIndex(myTrips, {id: request.params.id});
    if (!myTrips[trip]) {
      response.send();
    } else {
      var updatedTrip = _.assign(myTrips[trip], update);
      response.status(201).json(updatedTrip);
    }
  })
  .delete(function (request, response) {
    var trip = _.findIndex(myTrips, {id: request.params.id});
    myTrips.splice(trip, 1);
    myTripDetail.splice(trip, 1);

    response.json(myTrips);
  });

tripRouter.route('/:id/myTripDetail')
  .get(function (request, response) {
    var trip = _.findIndex(myTripDetail, {id: request.params.id});
    response.json(myTripDetail[trip]);
  })
  .post(function (request, response) {
    var tripDetail = {
      id: request.params.id,
      hotel: request.body.hotel,
      checkIn: request.body.checkIn,
      checkOut: request.body.checkOut,
      departAirport: request.body.departAirport,
      arriveAirport: request.body.arriveAirport,
      flightNum: request.body.flightNum,
      notes: request.body.notes
    };

    myTripDetail.push(tripDetail);

    response.json(myTripDetail);
  })
  .put(function (request, response) {
    var update = {
      hotel: request.body.hotel,
      checkIn: request.body.checkIn,
      checkOut: request.body.checkOut,
      departAirport: request.body.departAirport,
      arriveAirport: request.body.arriveAirport,
      flightNum: request.body.flightNum,
      notes: request.body.notes
    };

    var trip = _.findIndex(myTripDetail, {id: request.params.id});
    if (!myTripDetail[trip]) {
      response.send();
    } else {
      var updatedTrip = _.assign(myTripDetail[trip], update);
      response.json(updatedTrip);
    }
  });

module.exports = tripRouter;
