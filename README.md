# Fpl App Fe

## General Info

The React/Redux front-end for [Fpl App Api](https://fpl-app-api.herokuapp.com/api/v1/round.js). Users can challenge their friends to see who is the best fantasy football manager by drafting and trading EPL stars. An in-depth look at the rules and logic can be found [here](https://github.com/djstozza/fpl_app_api/blob/master/README.md).


## Getting Started

### Prerequisites

```
NPM: 6.4.1
Node: 11.2.0
```

### Setup

Make sure that you have `Fpl App Api` set up and running a server on port `3001` by following the instructions set out [here](https://github.com/djstozza/fpl_app_api/blob/master/README.md).

#### Install packages with npm and run server (on port 3000)
```
npm install
npm start
```

#### To create an optimised build and serve it locally
```
npm run build
npm install -g serve
serve -s build -p 3000
```

#### To run tests
```
npm run test
```
## Author

* [Daniel Sztolcman](https://github.com/djstozza)


## License

This project is licensed under the MIT License

## Acknowledgments

* [Fantasy Premier League (FPL) API](https://fantasy.premierleague.com/drf/bootstrap-static)
