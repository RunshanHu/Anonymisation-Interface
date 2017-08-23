'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var yaml_config = require('node-yaml-config');

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
};

var configuration = yaml_config.load(__dirname + '/config/server_config.yaml');

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  //var server_setting = configuration.server_setting;
  var port = process.env.PORT || configuration.server.port;
  app.listen(port);
  
  console.log('Anonymisation interface started! Listening on http://%s:%d', 
              configuration.server.host, port);

});
