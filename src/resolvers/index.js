const resolvers = {
    Query: {
        async satellites(_, __, { dataSources }) {
            return dataSources.issAPI.getSatellites();
        },
        async locations(_, __, { dataSources }) {
            return dataSources.issAPI.getLocations();
        },
        async apod(_, __, { dataSources }) {
            return dataSources.nasaAPI.getApod();
        },
        async neos(_, __, { dataSources }) {
            return dataSources.nasaAPI.getNEOs().then(data => {
                return data["near_earth_objects"][new Date().toISOString().substr(0,10)];
            })
        },
        async cards(_, { user }, { dataSources }) {
            return dataSources.cotdbAPI.getCards(user);
        },
    },
};

exports.resolvers = resolvers;