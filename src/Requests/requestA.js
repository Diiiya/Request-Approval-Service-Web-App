import axios from "axios";

export function requestCreateRequest(name, policyId) {
    return axios.request({
      method: "post",
      url: `https://localhost:44327/api/v1/Requests/Create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { name, policyId }
    });
}

export function requestGetAllRequests() {
  return axios.request({
    method: "get",
    url: `https://localhost:44327/api/v1/Requests/GetAll`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function requestGetAllUserRequests(userId) {
  return axios.request({
    method: "get",
    url: `https://localhost:44327/api/v1/Requests/GetAllPerUser/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function requestUpdateRequest(requestId, policyId, userId, code, userAnswer) {
  return axios.request({
    method: "put",
    url: `https://localhost:44327/api/v1/Requests/Update`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {requestId, policyId, userId, code, userAnswer}
  });
}