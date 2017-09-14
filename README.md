# Anonymisation-Interface
Interface orchestrating Anonymisation and Registry Interface components

## Installation Guide

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
 $ npm start
```
The server is now running and listening on the port chosen in the
*config/server_config.yaml* file (e.g. 50001). 

The anonymisaiton interface is expected to interact with the anonymisation
component in the [Registry
Interface](https://github.com/sunfish-prj/Registry-Interface), whose *url* and
*port* are defined in the configuration file *config/default.yaml*.



