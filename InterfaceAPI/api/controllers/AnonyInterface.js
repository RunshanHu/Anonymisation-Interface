'use strict';

var request = require('request-promise');

module.exports = {register, queryFromUser};

var registerEventHandler = {
    // end point for handle datasets register event
};

function register(req, res, next) {
  /*
   * register a new data sharing event
   */

}

var queryEventHandler = {
   queryRI: function(req) {
    // send the query to Registry Interface
    return request({
      method: 'POST',
      uri: 'http://localhost:60001/ri/anonymisation/queryOldRes',
      body: req,
      headers: {'User-Agent': 'Anonymisation Interface'},
      json: true //automatically stringfiles the body to JSON
    });
   },

  getResultFromAnonyService: function(budget) {
    // query Anonymisation service using budget
    return request({
      method: 'GET',
      uri: 'http://195.110.40.69:50001/api/v1/macro',
      qs: {
        configuration: '40ec8c43-ce90-4b13-968d-6cf962515159',
        file: 'ffbbcd8c-c4cb-4580-9687-9cd44ec34035'
      }, 
      headers: {
        'User-Agetn': 'Anonymisation Interface'
      },
      json: true
    }); 
  },

  sendResultToRI: function() {
    // send the anonymised result to Registry Interface
    return request({
      method: 'POST',
      uri: 'http://localhost:60001/ri/anonymisation/receiveAnonyRes',
      body: {
        "requestorID": "test_ID",
        "token": "test_token",
        "data_consumer": "test_consumer",
        "dataID": "test_data_007",
        "function_type": "test_function_type",
        "budget_used": 10,
        "anonymised_result": 111
      },
      headers: {'User-Agent': 'Anonymisation Interface'},
      json: true
    });
  },

  sendFinalResToUser: function() {
    // send the final result to the user
    
  }

};


function queryFromUser(req, res, next){
  /*
   * process a user query  
   */
   res = queryEventHandler.queryRI(req)
    .then(getResultFromAnonyService)
    .then(sendResultToRI)
    .then();
}


