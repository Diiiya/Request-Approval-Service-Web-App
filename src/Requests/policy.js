import axios from "axios";

export function requestCreatePolicy(name, threshold, userIds) {
    return axios.request({
      method: "post",
      url: `https://localhost:44327/api/v1/Policies/Create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { name, threshold, userIds }
    });
}

export function requestGetAllPolicies() {
  return axios.request({
    method: "get",
    url: `https://localhost:44327/api/v1/Policies/GetAll`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}