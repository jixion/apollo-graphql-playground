const {gql} = require("apollo-server");

const owmType = gql`
type Query {
  owm: WeatherData
}

type WeatherData {
  coord: Coord
  weather: Weather
  main: WeatherMain
  name: String
}

type Coord {
  lat: Float
  lon: Float
}

type Weather {
  description: String
  main: String
}

type WeatherMain {
  temp: Float
  feels_like: Float
}

`;

async function owm(_, __, { dataSources }) {
    return dataSources.owmAPI.getZip().then(data => {
        return data;
    });
}

module.exports = {owmType, owm};