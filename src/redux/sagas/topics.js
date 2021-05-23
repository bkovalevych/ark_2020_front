import {call, put} from "redux-saga/effects";
import CNST from "../../constants";
import axios from "axios"
import data from "../../template/json_data";

export const getTopicsRequest = () => {
    // Получить топики (БЕЗ ПОЛЯ controller_iot) для конкретного юзера,
    // id вшит будет в хедере
    axios.get(`/topics/get/`)
        .catch((err) => {
         throw err.response.data;
    })
}

export function* getTopics(props) {
    let topics = localStorage.getItem("data");
    if (!topics) {
        topics = data;
        localStorage.setItem("data", JSON.stringify(data))
    } else {
        topics = JSON.parse(topics);
    }
    yield put({
        type: CNST.TOPICS.GET_TOPICS.SUCCESS,
        payload: topics
    })

    // try {
    //     const response = yield call(getTopicsRequest, props.payload);
    //     if (response.status === 200) {
    //         yield put({
    //             type: CNST.TOPICS.GET_TOPICS.SUCCESS,
    //             payload: response
    //         })
    //     }
    // } catch (e) {
    //     yield put( {
    //         type: CNST.TOPICS.GET_TOPICS.ERROR,
    //         payload: {
    //             message: e.toString()
    //         }
    //     })
    // }
}

export function updateTopicRequest({id, topic}) {
    // обновить состояние топика, менятся будут только баллы (возростать)
    // и в случае прохождения увеличиватся количество попыток
    // так же можно ресет чтобы обнулить баллы, но не попытки
    // id - id топика
    // topic - тело топика с чувствительными данными, пример ниже
    //        {"gainedPoints": 15,
    //         "currentStep": 0,
    //         "isDone": false,
    //         "attempts": 0
    //         }
    axios.post(`/topics/put/?idTopic=${id}`, topic).catch((err) => {
        throw err.response.data;
    })
}

export function* updateTopic(props) {

    yield put({
        type: CNST.TOPICS.UPDATE_TOPIC.SUCCESS,
        payload: props
    })
    // try {
    //     const response = yield call(updateTopicRequest, props.payload);
    //     if (response.status === 200) {
    //         yield put({
    //             type: CNST.TOPICS.UPDATE_TOPIC.SUCCESS,
    //             payload: response
    //         })
    //     }
    // } catch (e) {
    //     yield put( {
    //         type: CNST.TOPICS.UPDATE_TOPIC.ERROR,
    //         payload: {
    //             message: e.toString()
    //         }
    //     })
    // }
}