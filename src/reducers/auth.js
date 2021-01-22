import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  loggedIn: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.error,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: null,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
