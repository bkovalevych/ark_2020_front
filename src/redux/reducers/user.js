import CNST from "../../constants";
import user from "../stores/user";

export default function (state = user, action) {
  switch (action.type) {
    case CNST.USER.SIGN_UP.SUCCESS:
      return {
        ...state,
        isSignedUp: true,
        fetching: false,
      };
    case CNST.USER.SIGN_UP.ERROR:
      return {
        ...state,
        ...action.payload,
        fetching: false,
        error: true,
        errorText: CNST.STRING_RESOURCES.SIGN_UP_ERROR.TEXT,
        errorTitle: CNST.STRING_RESOURCES.SIGN_UP_ERROR.TITLE
      };
    case CNST.USER.SIGN_UP.FETCH:
      return {
        ...state,
        ...action.payload,
        fetching: true,
      };
    case CNST.USER.GET_PROFILE.FETCH:
      return {
        ...state,
        fetching: true,
      };
    case CNST.USER.GET_PROFILE.SUCCESS:
      return {
        ...state,
        ...action.payload,
        fetching: false,
        isGetUserFetched: true,
      };
    case CNST.USER.GET_PROFILE.ERROR:
      return {
        ...state,
        fetching: false,
        isGetUserFetched: false,
        isLoggedIn: false,
        error: true,
        errorText: CNST.STRING_RESOURCES.UNKNOWN_ERROR.TEXT,
        errorTitle: CNST.STRING_RESOURCES.UNKNOWN_ERROR.TITLE
      };
    case CNST.USER.SIGN_IN.SUCCESS:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true
      };
    case CNST.USER.SIGN_IN.ERROR:
      return {
        ...state,
        ...action.payload,
        fetching: false,
        error: true,
        errorText: CNST.STRING_RESOURCES.SIGN_IN_ERROR.TEXT,
        errorTitle: CNST.STRING_RESOURCES.SIGN_IN_ERROR.TITLE
      };
    case CNST.USER.SIGN_IN.FETCH:
      return {
        ...state,
        ...action.payload,
        fetching: true,
      };
    case CNST.USER.LOGOUT.SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem('email');
      localStorage.setItem("points", "0");
      return {
        fetching: false,
        email: "",
        firstName: "",
        lastName: "",
        isLoggedIn: false,
        isGetUserFetched: false,
      };
    case CNST.USER.CHANGE_POINTS:
      return {
        ...state,
        ...action.payload
      }
    case CNST.USER.LOGOUT.FETCH:
      return {
        fetching: true,
      };
    case CNST.USER.LOGOUT.ERROR:
      return {
        fetching: false,
        email: "",
        isLoggedIn: false,
        isGetUserFetched: false,
        topics: [],
        error: true,
        errorText: CNST.STRING_RESOURCES.UNKNOWN_ERROR.TEXT,
        errorTitle: CNST.STRING_RESOURCES.UNKNOWN_ERROR.TITLE
      };
    case CNST.USER.INTERFACE.ERROR_HAS_BEEN_HANDLED:
      return {
        ...state,
        error: false,
        errorText: "",
        errorTitle: ""
      };
    default:
      return state;
  }
}
