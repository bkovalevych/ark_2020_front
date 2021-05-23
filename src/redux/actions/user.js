import CNST from "../../constants/";

export function signUpAction(data) {
  return {
    type: CNST.USER.SIGN_UP.FETCH,
    payload: data,
  };
}

export function signInAction(data) {
  return {
    type: CNST.USER.SIGN_IN.FETCH,
    payload: data,
  };
}

export function getUserAction(data) {
  return {
    payload: data,
    type: CNST.USER.GET_PROFILE.FETCH,
  };
}

export function logoutAction() {
  return {
    type: CNST.USER.LOGOUT.FETCH
  }
}

export function errorHasBeenHandled() {
  return {
    type: CNST.USER.INTERFACE.HANDLE_ERROR
  }
}