import {
    GET_USER,
    SET_USER,
    GET_ALL_USERS,
    SET_ALL_USERS,
    LOGIN_USER,

    CREATE_POLICY,
    GET_ALL_POLICIES,
    SET_ALL_POLICIES,

    CREATE_REQUEST,
    GET_ALL_REQUESTS,
    SET_ALL_REQUESTS,
    GET_ALL_USER_REQUESTS,
    SET_ALL_USER_REQUESTS,
    UPDATE_REQUEST,

    RESET_TYPE,    
} from './constants';

/**
 * User
 */
export const loginUser = (username, password) => ({
    type: LOGIN_USER,
    username,
    password,
});

export const getUser = (userId) => ({
    type: GET_USER,
    userId,
});
  
export const setUser = (user) => ({
    type: SET_USER,
    user,
});

export const getAllUsers = () => ({
    type: GET_ALL_USERS,
});
  
export const setAllUsers = (users) => ({
    type: SET_ALL_USERS,
    users,
});


/**
 * Policy 
 */
 export const createPolicy = (name, threshold, userIds) => ({
    type: CREATE_POLICY,
    name, 
    threshold, 
    userIds,
});

export const getAllPolicies = () => ({
    type: GET_ALL_POLICIES,
});
  
export const setAllPolicies = (policies) => ({
    type: SET_ALL_POLICIES,
    policies,
});


/**
 * Request 
 */
export const createRequest = (name, policyId) => ({
    type: CREATE_REQUEST,
    name, 
    policyId, 
});

export const getAllRequests = () => ({
    type: GET_ALL_REQUESTS,
});
  
export const setAllRequests = (requests) => ({
    type: SET_ALL_REQUESTS,
    requests,
});

export const getAllUserRequests = (userId) => ({
    type: GET_ALL_USER_REQUESTS,
    userId
});
  
export const setAllUserRequests = (userRequests) => ({
    type: SET_ALL_USER_REQUESTS,
    userRequests,
});

export const updateRequest = (requestId, policyId, userId, code, userAnswer) => ({
    type: UPDATE_REQUEST,
    requestId, 
    policyId, 
    userId, 
    code, 
    userAnswer,
});


/**
 * Reset Response success/failure
 */
 export const resetTypeValue = () => ({
    type: RESET_TYPE
  })