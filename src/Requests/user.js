import axios from "axios";

export function requestLoginUser(username, password) {
    return axios.request({
      method: "post",
      url: `https://localhost:44327/api/v1/Users/Login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { username, password }
    });
}

export function requestGetUser(userId) {
    return axios.request({
      method: "get",
      url: `https://localhost:44327/api/v1/Users/GetById/${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
}

export function requestGetAllUsers() {
    return axios.request({
      method: "get",
      url: `https://localhost:44327/api/v1/Users/GetAll/1/1000/false/false`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
}