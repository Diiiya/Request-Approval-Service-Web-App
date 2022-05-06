import {
    SET_USER,
    SET_ALL_USERS,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    CREATE_POLICY,
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_ERROR,
    SET_ALL_POLICIES,

    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_ERROR,
    SET_ALL_REQUESTS,
    SET_ALL_USER_REQUESTS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_ERROR,

    RESET_TYPE
} from "./constants";

const initialState = {
    user: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
        case LOGIN_USER_SUCCESS:
        case LOGIN_USER_ERROR:
        case CREATE_POLICY:
        case CREATE_POLICY_SUCCESS:
        case CREATE_POLICY_ERROR:
        case CREATE_REQUEST:
        case CREATE_REQUEST_SUCCESS:
        case CREATE_REQUEST_ERROR:
        case UPDATE_REQUEST:
        case UPDATE_REQUEST_SUCCESS:
        case UPDATE_REQUEST_ERROR:
        case RESET_TYPE: {
            const { type } = action;
            return { ...state, type };
        }

        case SET_USER: {
            const { user } = action;
            return { ...state, user };
        }

        case SET_ALL_USERS: {
            const { users } = action;
            return { ...state, users };
        }

        case SET_ALL_POLICIES: {
            const { policies } = action;
            return { ...state, policies };
        }

        case SET_ALL_REQUESTS: {
            const { requests } = action;
            return { ...state, requests };
        }

        case SET_ALL_USER_REQUESTS: {
            const { userRequests } = action;
            return { ...state, userRequests };
        }

        default:
            return state;
    }
};