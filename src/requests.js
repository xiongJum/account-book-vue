import axios from "axios";


export var axiosEnum = {

    GET: axios.get,
    POST: axios.post
}


export class Requests {
    constructor (method, url, headers=null) {
        this.url = url;
        this.headers = headers;
        this.method = method
    }

    public_request (param=null) {
        
        // window.data = 'ceshi'

        return this.method (this.url, param)

        // response.then(res => {
        //     result = res
        //     console.log(result)
        // })


            // .then (response => {
            //     console.log(response)
            //     return response
            // })
            // .then (function (res) {
            //     const data = res
            // })
            // .catch (function (err) {
            //     const data = err
            // })
        
        // console.log(result)

        // return data

    };

    // async function asyncFn(method) {
    //     let returnData = await method.public_request
    //     return returnData
    // }

}