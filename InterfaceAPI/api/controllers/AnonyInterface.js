'use strict';

var request = require('request-promise');

module.exports = {register, queryFromUser};

var registerEventHandler = {

};

var queryEventHandler = {
   queryRI: function(req) {
    // send the query to Registry Interface
     
   },

  getResultFromAnonyService: function(budget) {
    // query Anonymisation service using budget
    
  },

  sendResultToRI: function() {
    // send the anonymised result to Registry Interface
    
  },

  sendFinalResToUser: function() {
    // send the final result to the user
    
  }

};

function register(req, res, next) {
  /*
   * register a new data sharing event
   */

}

function queryFromUser(req, res, next){
  /*
   * process a user query  
   */
   res = queryEventHandler.queryRI(req)
    .then(getResultFromAnonyService)
    .then(sendResultToRI)
    .then();
}


