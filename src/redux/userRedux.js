import Axios from 'axios';

/* selectors */
export const getInfo = ({user}) => user;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOGIN_START = createActionName('LOGIN_START');
const LOGIN_SUCCESS = createActionName('LOGIN_SUCCESS');
const ADMIN_SUCCESS = createActionName('ADMIN_SUCCESS');
const LOGIN_ERROR = createActionName('LOGIN_ERROR');

/* action creators */
export const loginStarted = payload => ({ payload, type: LOGIN_START });
export const loginSuccess = payload => ({ payload, type: LOGIN_SUCCESS });
export const adminSuccess = payload => ({ payload, type: ADMIN_SUCCESS });
export const loginError = payload => ({ payload, type: LOGIN_ERROR });

/* thunk creators */
export const getUser = () => {
  return (dispatch, getState) => {
    dispatch(loginStarted());

    Axios
      .get('http://localhost:8000/auth/google')
      .then(res => {
        dispatch(loginSuccess());
      })
      .catch(err => {
        dispatch(loginError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...statePart,
        active: false,
        admin: false,
        error: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...statePart,
        active: true,
        admin: false,
        error: false,
      };
    }
    case ADMIN_SUCCESS: {
      return {
        ...statePart,
        active: true,
        admin: true,
        error: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...statePart,
        active: false,
        admin: false,
        error: action.payload,
      };
    }

    default:
      return statePart;
  }
};
