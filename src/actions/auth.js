import Api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function autoLogin() {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { code } = await Api.validateToken();
      if (code === 'jwt_auth_valid_token') {
        dispatch({ type: LOGIN_SUCCESS });
      } else {
        dispatch({ type: LOGIN_FAILURE, error: null });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, error: null });
    }
  };
}

export function loginRequest(username, password) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      await Api.loginWithPassword(username, password);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, error });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      await Api.logout();
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, error });
    }
  };
}
