import { call, put } from "redux-saga/effects";
import { setUser, setAllUsers, setAllPolicies, setAllRequests, setAllUserRequests } from './actions';
import {  
    requestGetUser, 
    requestLoginUser,
    requestGetAllUsers } from "../Requests/user";
import { requestCreatePolicy, requestGetAllPolicies } from "../Requests/policy";
import { 
  requestCreateRequest, 
  requestGetAllRequests, 
  requestGetAllUserRequests,
  requestUpdateRequest } from '../Requests/requestA';

import { takeLatest } from "redux-saga/effects";

import {
    GET_USER,
    GET_ALL_USERS,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    CREATE_POLICY,
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_ERROR,
    GET_ALL_POLICIES,

    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_ERROR,
    GET_ALL_REQUESTS,
    GET_ALL_USER_REQUESTS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,

} from './constants';

export function* watcherSaga() {    
    yield takeLatest(LOGIN_USER, handleLoginUser);
    yield takeLatest(GET_USER, handleGetUser);
    yield takeLatest(GET_ALL_USERS, handleGetAllUsers);

    yield takeLatest(CREATE_POLICY, handleCreatePolicy);
    yield takeLatest(GET_ALL_POLICIES, handleGetAllPolicies);

    yield takeLatest(CREATE_REQUEST, handleCreateRequest);
    yield takeLatest(GET_ALL_REQUESTS, handleGetAllRequests);
    yield takeLatest(GET_ALL_USER_REQUESTS, handleGetAllUserRequests);
    yield takeLatest(UPDATE_REQUEST, handleUpdateRequest);
}


/**
 * User
 */

 export function* handleLoginUser({username, password}) {
    try {
      const response = yield call(requestLoginUser, username, password);
      yield put({ type: LOGIN_USER_SUCCESS, response });
      localStorage.setItem("user", username);
      localStorage.setItem("userId", response.data.value.userId)
      localStorage.setItem("isAdmin", response.data.value.isAdmin)
    } catch (error) {
      yield put({ type: LOGIN_USER_ERROR, error });
    }
}

export function* handleGetUser(userId) {
    try {      
      const response = yield call(requestGetUser, userId);
      const { data } = response;
      yield put(setUser(data));
    } catch (error) {
      // console.log(error);
    }
}

export function* handleGetAllUsers() {
    try {
      const response = yield call(requestGetAllUsers);
      const { data } = response;
      yield put(setAllUsers(data?.value?.data));
    } catch (error) {
      // console.log(error);
    }
}

/**
 * Policies
 */

export function* handleCreatePolicy({name, threshold, userIds}) {
  try {
    const response = yield call(requestCreatePolicy, name, threshold, userIds);
    yield put({ type: CREATE_POLICY_SUCCESS, response });
  } catch (error) {
    yield put({ type: CREATE_POLICY_ERROR, error });
  }
}

export function* handleGetAllPolicies() {
  try {
    const response = yield call(requestGetAllPolicies);
    const { data } = response;
    yield put(setAllPolicies(data?.value?.data));
  } catch (error) {
    // console.log(error);
  }
}


/**
 * Requests
 */
export function* handleCreateRequest({name, policyId}) {
  try {
    const response = yield call(requestCreateRequest, name, policyId);
    yield put({ type: CREATE_REQUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: CREATE_REQUEST_ERROR, error });
  }
}

export function* handleGetAllRequests() {
  try {
    const response = yield call(requestGetAllRequests);
    const { data } = response;
    yield put(setAllRequests(data?.value?.data));
  } catch (error) {
    // console.log(error);
  }
}

export function* handleGetAllUserRequests({userId}) {
  try {
    const response = yield call(requestGetAllUserRequests, userId);
    const { data } = response;
    yield put(setAllUserRequests(data?.userRequests));
  } catch (error) {
    // console.log(error);
  }
}

export function* handleUpdateRequest({requestId, policyId, userId, code, userAnswer}) {
  try {
    const response = yield call(requestUpdateRequest, requestId, policyId, userId, code, userAnswer);
    yield put({ type: UPDATE_REQUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: UPDATE_REQUEST_ERROR, error });
  }
}
