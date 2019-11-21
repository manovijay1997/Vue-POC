import axios from "axios";

const URL = "http://shielded-garden-86694.herokuapp.com";

export class Apihelper {
  post(uri, data) {
    return axios.post(`${URL}` + uri, data, {
      headers: {
        "content-Type": "application/json"
      }
    });
  }
  get(uri) {
    return axios
      .get(`${URL}` + uri, {
        headers: {
          "content-Type": "application/json"
        },
        withCredentials: false
      })
      .then(res => {
        // console.log(res);
        return res;
      })
      .catch(e => {
        console.log(e);
      });
  }
}
