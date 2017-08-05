var request = require('request-promise');

var test = {
  getResultFromAnonyService: function() {
    return request({
        method: 'GET',
        uri: 'http://195.110.40.69:50001/api/v1/macro',
        qs: {
          configuration: '40ec8c43-ce90-4b13-968d-6cf962515159',
          file: 'ffbbcd8c-c4cb-4580-9687-9cd44ec34035'
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true
      });
  },

  getResultFromAnonyRI: function() {
    return request({
      method: 'POST',
      uri: 'http://localhost:60001/ri/anonymisation/queryOldRes',
      body: {
          "requestorID": "test_from_anony_interface_to_RI",
          "token": "test_from_anony_interface_to_RI",
          "data_consumer": "test_from_anony_interface_to_RI",
          "dataID": "test_data_007",
          "function_type": "test_sum",
          "request_budget": 10
      },
      headers: {
      'User-Agent': 'Request-Promise'
      },
      json: true
    }); 
  },

  sendResultToRI: function() {
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
  }
}

function main() {
  return test.getResultFromAnonyRI();
}

main().then(function(result){
  console.log(result);
});
