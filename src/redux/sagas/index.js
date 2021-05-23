import { takeLatest } from "redux-saga/effects";
import CNST from "../../constants";
import {getUser, signIn, signUp, logout, errorHandled} from "./user";
import {getTopics, updateTopic} from "./topics"
import {getSteps, updateStep} from "./steps"

export default function* rootSaga() {
  yield takeLatest(CNST.USER.SIGN_IN.FETCH, signIn);
  yield takeLatest(CNST.USER.SIGN_UP.FETCH, signUp);
  yield takeLatest(CNST.USER.GET_PROFILE.FETCH, getUser);
  yield takeLatest(CNST.USER.LOGOUT.FETCH, logout);

  yield takeLatest(CNST.TOPICS.UPDATE_TOPIC.FETCH, updateTopic);
  yield takeLatest(CNST.STEPS.UPDATE_STEP.FETCH, updateStep);

  yield takeLatest(CNST.TOPICS.GET_TOPICS.FETCH, getTopics);
  yield takeLatest(CNST.STEPS.GET_STEPS.FETCH, getSteps);

  yield takeLatest(CNST.USER.INTERFACE.HANDLE_ERROR, errorHandled);
}
