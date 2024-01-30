const { RESTDataSource } = require("apollo-datasource-rest");

class NASAAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.nasa.gov'
    }

    async getApod() {
        return await this.get(
            `planetary/apod?api_key=${process.env.NASA}`);
    }

    async getNEOs() {
        return await this.get(
            `neo/rest/v1/feed/today?detailed=false&api_key=${process.env.NASA}`
        );
    }
}

class ISSAPI extends RESTDataSource {
    constructor() {
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://api.wheretheiss.at/v1/satellites';
    }

    async getSatellites() {
        // Send a GET request to the specified endpoint
        return this.get(`/`);
    }

    async getLocations(limit) {
        return this.get('/25544/positions?timestamps=1436029892,1436029902&units=miles').then(data => {
            return data.slice(0, limit);
        })
    }
}


class COTDBAPI extends RESTDataSource {
    constructor() {
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://cotdb.herokuapp.com/api/';
    }

    async getCards(user, limit) {
        // Send a GET request to the specified endpoint
        return this.get(`/cards?user=${user}`).then(data => {
            return data.slice(0, limit);
        });
    }
}

class OWMAPI extends RESTDataSource {
    constructor() {
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = `https://api.openweathermap.org/data/2.5/weather`;
    }

    async getZip() {
        // Send a GET request to the specified endpoint
        return this.get(`?zip=76712,us&APPID=${process.env.OWM}`);
    }
}

exports.NASAAPI = NASAAPI;
exports.ISSAPI = ISSAPI;
exports.COTDBAPI = COTDBAPI;
exports.OWMAPI = OWMAPI;