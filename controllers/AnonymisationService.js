'use strict';

exports.interfaceQueryPOST = function(args, res, next) {
  /**
   * This endpoint is used to query the anonymised statistical result given  the DataId and requested budget. 
   *
   * body Query-body Body in JSON
   * returns query-response
   **/
  var examples = {};
  examples['application/json'] = {
  "timeStamp" : "aeiou",
  "dataID" : "aeiou",
  "data_provider" : "aeiou",
  "anonymised_result" : 0.80082819046101150206595775671303272247314453125,
  "data_consumer" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.interfaceRegisterPOST = function(args, res, next) {
  /**
   * This endpoint is used to register a data-sharing event. 
   *
   * body Register-body Body in JSON
   * returns register-response
   **/
  var examples = {};
  examples['application/json'] = {
  "message" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

