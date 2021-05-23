import {call, put} from "redux-saga/effects";
import CNST from "../../constants";
import axios from "axios";

export const signUpRequest = ({email, password, firstName, lastName}) => {
    return axios
        .post(`/signUp`, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            username: email
        })
        .catch(function (error) {
            throw error.response.data;
        });
};

export function* signUp(props) {
    try {
        const response = yield call(signUpRequest, props.payload);
        if (response.status === 200) {
            yield put({type: CNST.USER.SIGN_UP.SUCCESS, payload: response});
        }
    } catch (error) {
        yield put({
            type: CNST.USER.SIGN_UP.ERROR,
            payload: {
                // errors: error,
            },
        });
    }
}

export const signInRequest = ({email, password}) => {
    return axios
        .post(`/login`, {
            email: email,
            password: password,
        })
        .catch(function (error) {
            throw error.response.data;
        });
};

export function* signIn(props) {
    try {
        const response = yield call(signInRequest, props.payload);
        if (response.status === 200) {
            localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem("email", props.payload.email);
            yield put({type: CNST.USER.SIGN_IN.SUCCESS, payload: response});
        }
    } catch (error) {
        yield put({
            type: CNST.USER.SIGN_IN.ERROR,
            payload: {
                 errors: error,
            },
        });
    }
}

export const getUserRequest = ({email}) => {
    if (!email) {
        email = localStorage.getItem("email");
    }
    if (!email) {
        return;
    }
    return axios.get(`/user/get/${email}`).then(response => {
        if (response.status !== 200) throw new Error("bad request");
        return response.data;
    }).then(id =>
       axios.get(`/user/get/profile/${id}`)
    ).catch(function (error) {
        throw error.response.data;
    });
};

export function* getUser(props) {
    try {
        const response = yield call(getUserRequest, props.payload);
        yield put({type: CNST.USER.GET_PROFILE.SUCCESS, payload: response.data});
    } catch (error) {
        // removeToken();
        if(props.payload.firstCheck == false){
            yield put({
                type: CNST.USER.GET_PROFILE.ERROR,
            });
        }
    }
}



export function* logout(props) {
    yield put({type: CNST.USER.LOGOUT.SUCCESS});
}

export function* errorHandled() {
    yield put({
        type: CNST.USER.INTERFACE.ERROR_HAS_BEEN_HANDLED
    });
}
