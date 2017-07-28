'use strict';

var url = require('url');

var Anonymisation = require('./AnonymisationService');

module.exports.queryFromClient = function queryFromClient (req, res, next) {
  Anonymisation.queryFromClient(req.swagger.params, res, next);
};

module.exports.registerSharingEvent = function registerSharingEvent (req, res, next) {
  Anonymisation.registerSharingEvent(req.swagger.params, res, next);
};
