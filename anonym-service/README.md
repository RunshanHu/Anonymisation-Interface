# Dummy Anonymisation service

This anonymisation service provides the restful api for calculating the
average, sum, maximum and minimum of a salary dataset using differential privacy.

The api is defined in *AnonyServiceRESTAPI.yaml*.

## Usage guide

### Dependencies

Install the dependencies
- *Nodejs v6.x*
- *Npm v3.x*

Releases and installation guides can be found on the official websites
[here](https://nodejs.org) and [here](https://www.npmjs.com/)

To check that all the dependencies have been set up, execute
```
 $ node -v 
 -> v6.1.0
 $ npm -v
 -> 3.10.6
```

### Anonymisation Interface set-up

To set the service, execute the following commands
```
 $ git clone https://github.com/sunfish-prj/Anonymisation-Interface.git
 $ cd Anonymisation-Interface/anonym_service/restful
 $ node server.js
```
The anonymisation server is now running and listening on the port 3000.

