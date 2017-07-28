'use strict';

var url = require('url');

var Anonymisation = require('./AnonymisationService');

module.exports.interfaceQueryPOST = function interfaceQueryPOST (req, res, next) {
  Anonymisation.interfaceQueryPOST(req.swagger.params, res, next);
};

module.exports.interfaceRegisterPOST = function interfaceRegisterPOST (req, res, next) {
  Anonymisation.interfaceRegisterPOST(req.swagger.params, res, next);
};
