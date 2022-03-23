import axios from "axios";


class Requests {
    constructor (url, headers) {
        this.url = url;
        this.headers = headers;
    }

    get (param=null) {
        axios.get(this.url, param)
            .then (function (res) {
                return res.data
            })
            .catch (function (err) {
                return {}
            })
    }
}