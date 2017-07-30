'use strict';

module.exports = {register, queryFromUser, queryFromRI, returnFinalResult};

function register(req, res, next) {
  /*
   * register a new data sharing event
   */


}

function queryFromUser(req, res, next){
  /*
   * process a user query  
   */
  
  var old_res = queryRI();
  if(old_res == true) {
      var perturbed_res = getResFromAnonyService();
      var utility_check = sendResToRI(perturbed_res);
       


  }
}

function queryFromRI(req, res, next) {
  /*
   * process the query from RI 
   */

} 

function returnFinalResult(req, res, next) {
  /*
   * return final result to User
   */
}
