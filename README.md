# Fpl App Fe

## General Info

The React/Redux front-end for Fpl App Api. Users can challenge their friends to see who is the best fantasy football manager by drafting and trading EPL stars. An in-depth look at the rules and logic can be found [here](https://github.com/djstozza/fpl-app-api).


## Getting Started

### Initial setup

**Node.js** version `=>14.75` is required to run this application locally. If you don't have it setup already, please use [NVM](https://github.com/creationix/nvm) - a script that allows you to manage multiple Node.js versions on your local system.

### Quick start

Run  `npm install`  to install the required node packages and  `npm start`  to fire up the app on  `http://localhost:8080`.

Note that if the app doesn't run on  `http://localhost:8080`, it won't be able to connect to the Staging API due to CORS restrictions.

To get around this, either point the app to a local copy of the API that allows any domains to connect to it or run the app on  `http://localhost:8080`.

### Fpl App Api
This frontend app requires an instance of the API to run against.

During development, please pull down and setup an instance of the API by following  [these instructions](https://github.com/djstozza/fpl-app-api).

Once you have the API up and running locally, ensure that the  `REACT_APP_API_URL`  variable, as well as the `REACT_APP_CABLE_URL` (for streaming) in your .env file is set to the URL for the local instance of the API.

If you do not have a .env file, please create one in the root directory of this project.

### Testing
```
npm run test
```
## Author

* [Daniel Sztolcman](https://github.com/djstozza)


## License

This project is licensed under the MIT License

## Acknowledgments

* [Fantasy Premier League (FPL) API](https://fantasy.premierleague.com/drf/bootstrap-static)
