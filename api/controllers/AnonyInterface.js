'use strict';

var rp = require('request-promise');
var url = require('url');
var config = require('config');
var debug = true;

module.exports = {register, queryFromUser};

var registerEventHandler = {
    // end point for handle datasets register event
};

function register(req, res, next) {
  /*
   * register a new data sharing event
   */
   if(debug) console.log("--->Anonymisation Interface: register method called!");
   res.status(400).end();
}

var reqPara = config.get('request_parameter');
var queryEventHandler = {
   queryRI: function(req) {
    // send the query to Registry Interface
    if(debug) {
      console.log("--->Anonymisation Interface: queryRI method called!");
    }

    return rp({
      method: 'POST',
      // uri: 'http://localhost:60001/ri/anonymisation/queryOldRes',
      uri: url.format({
             protocol: 'http',
             hostname: reqPara._queryRI.ip,
             port: reqPara._queryRI.port,
             pathname: reqPara._queryRI.path
           }),
      body: req.body,
      headers: {'User-Agent': 'Anonymisation Interface'},
      json: true //automatically stringfiles the body to JSON
    });
   },

  getResultFromAnonyService: function(small_budget_flag, budget) {
    // query Anonymisation service using budget
    if(debug) {
      console.log("--->Anonymisation Interface: getResultFromAnonyService method called!");
      if(small_budget_flag) console.log("---->using small budget: " + budget);
        else console.log("---->using requested budget: " + budget)
    }

    return rp({
      method: 'GET',
      // uri: 'http://195.110.40.69:50001/api/v1/macro',
      uri: url.format({
             protocol: 'http',
             hostname: reqPara._getResultFromAnonyService._IBMService.ip,
             port: reqPara._getResultFromAnonyService._IBMService.port,
             pathname: reqPara._getResultFromAnonyService._IBMService.path
           }),
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

  utilityCheck: function(options) {
    // send the anonymised result to Registry Interface
    if(debug) {
      console.log("--->Anonymisation Interface: utilityCheck method called!");
    }

    return rp({
      method: 'POST',
      uri: 'http://localhost:60001/ri/anonymisation/receiveAnonyRes',
      body: options, 
      headers: {'User-Agent': 'Anonymisation Interface'},
      json: true
    });
  },

  updateLedger: function(final_response) {
    if(debug) console.log("--->Anonymisation Interface: updateLedger method called!");

  }


};


function queryFromUser(req, res, next){
  /*
   * process a user query  
   */
   var final_response = {
       "data_provider": "sample",
       "data_consumer": req.body.data_consumer,
       "time_stamp": "smaple",
       "dataID": req.body.dataID, 
       "anonymised_result": 0
   };

  var small_budget;

   queryEventHandler.queryRI(req)
    .then(response => {
      if(debug) {
        console.log("---->response from <queryRI>: ");
        console.log(response);
      }
      final_response.data_provider = response.data_provider;
      final_response.time_stamp = response.time_stamp;
      if(response.ifExist == 1) {
        if(debug) console.log("---->old result exists");
        var using_small_budget = 1;
        small_budget = response.budget_used;
        return queryEventHandler.getResultFromAnonyService(using_small_budget,small_budget)
                .then(response_array => {
                  var options = {
                    "anonymised_result": response_array[1],
                    "budget_used": small_budget, 
                    "dataID": req.body.dataID,
                    "data_consumer": req.body.data_consumer,
                    "function_type": req.body.function_type,
                    "requestorID": req.body.requestorID,
                    "token": req.body.token,
                  };
                  return queryEventHandler.utilityCheck(options);
                }).then(response => {
                  if(debug) {
                    console.log("---> response from RI-utilityCheck: ");
                    console.log(response);
                  }
                  if(response.final_status == 0){
                      if(debug) console(`---->utilityCheck fail and 
                        not pass budget verification, return null result`);
                      final_response.anonymised_result = response.final_result;
                  } else if(response.final_status == 1){
                            if(debug) console.log(`---->utilityCheck pass, return perturbed result`);
                            final_response.anonymised_result = response.final_result;
                  } else if (response.final_status == 2){
                            if(debug) console.log(`---->utilityCheck not pass, 
                              budget verification pass, return new result`);
                            final_response.anonymised_result = response.final_result;
                  }
                  queryEventHandler.updateLedger(final_response);
                });
      }else{
        if(debug) console.log("---->old result does not exist");
        if(response.budget_used == req.body.request_budget){
          if(debug) console.log("---->budget verification passed");
            var not_using_small_budget = 0;
            return queryEventHandler.getResultFromAnonyService(not_using_small_budget, response.budget_used)
                    .then(response_array => {
                      final_response.anonymised_result = response_array[1]; 
                      queryEventHandler.updateLedger(final_response);
                    });
        }else {
          if(debug) console.log("---->budget verification not passed, return null result");
          final_response.anonymised_result = response.final_result;
          queryEventHandler.updateLedger(final_response);
        }
      }
    })
    .catch(err => console.log);

   res.setHeader('Content-Type', 'application/json');
   //res.send(final_response);
   res.send(final_response);
 
}


