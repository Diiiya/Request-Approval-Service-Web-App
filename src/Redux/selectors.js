import { createSelector } from 'reselect';
import get from 'lodash/get';

/**
* Direct selector to the user state domain
*/
export const selectUserDomain = (state) => state.user;

/**
*  User selector
*/
export const userSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const user = get(substate, 'user');
    return user;
  }
);

export const allUserSelector = createSelector(
    selectUserDomain,
    (substate) => {
      const users = get(substate, 'users');
      return users;
    }
);


/**
 * Policy Selector
 */
export const allPoliciesSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const policies = get(substate, 'policies');
    return policies;
  }
);


/**
 * Request Selector
 */
export const allRequestsSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const requests = get(substate, 'requests');
    return requests;
  }
);

export const allUserRequestsSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const userRequests = get(substate, 'userRequests');
    return userRequests;
  }
);



/**
 * SUCCESS / FAILURE after CUD operation
 */
 export const requestResponseSelector = createSelector(
    selectUserDomain,
    (substate) => {
      const type = get(substate, 'type');
      if (type?.includes("SUCCESS")) {
        return true;
      }
      return false;
    }
  );