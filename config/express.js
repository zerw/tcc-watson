'use strict';

// Module dependencies
var express    = require('express'),
  bodyParser   = require('body-parser');

module.exports = function (app) {

  // Only loaded when running in Bluemix
  if (process.env.VCAP_APPLICATION)
    require('./security')(app);

  // Configure Express
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(express.static(__dirname + '/../public'));
};
