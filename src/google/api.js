class GoogleClient {
    constructor(axios, apiKey) {
        this.axios = axios
        this.apiKey = apiKey
    }

    geocode(address) {
        return this.axios.get('', {
            params: {
                address,
                key: this.apiKey
            }
        })
    }
}

export default GoogleClient