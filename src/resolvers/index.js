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
        }
    },
};

exports.resolvers = resolvers;