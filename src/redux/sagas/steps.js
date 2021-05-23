import {call, put} from "redux-saga/effects";
import CNST from "../../constants";
import axios from "axios";
import data from "../../template/json_data"
export const getStepsRequest = ({id}) => {
    return axios
        .get(`/steps/get/?idTopic=${id}`) // id юзера будет зашит в хедере
        .catch(function (error) {
            throw error.response.data;
        });
};

export function* getSteps(props) {
    let topics = localStorage.getItem("data");
    if (!topics) {
        topics = data;
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        topics = JSON.parse(topics);
    }
    yield put({
        type: CNST.STEPS.GET_STEPS.SUCCESS,
        payload: topics[props.payload.idTopic]
    })
    // try {
    //     const response = yield call(getStepsRequest, props.payload);
    //     if (response.status === 200) {
    //         yield put({
    //             type: CNST.STEPS.GET_STEPS.SUCCESS,
    //             payload: response
    //         })
    //     }
    // } catch (e) {
    //     yield put({
    //         type: CNST.STEPS.GET_STEPS.ERROR,
    //         payload: {
    //             message: e.toString()
    //         }
    //     })
    // }
}

export const updateStepRequest = ({idTopic, idStep, step}) => {
    // idTopic - id задачи
    // idStep - id подзадачи
    // step - тело подзадачи с чувствительными данными, пример ниже
    // {
    //   "isDone": "false",
    //   "gainedPoints": 0
    // }
    return axios.post(`steps/put/?idTopic=${idTopic}&idStep=${idStep}`
        , step).catch(err => {
            throw err.response.data;
        })
}

export function* updateStep(props) {
    let topics = JSON.parse(localStorage.getItem("data"))
    const {idTopic, idStep} = props.payload;
    if (typeof props.payload.idDecision === 'number') {
        const {idDecision, points} = props.payload;
        const isDone = topics[idTopic].steps[idStep].decisions[idDecision].isDone;
        if (!isDone) {
            topics[idTopic].steps[idStep].decisions[idDecision].isDone = true;
            topics[idTopic].steps[idStep].gainedPoints += points;
            topics[idTopic].gainedPoints += points;
        }
        let count = topics[idTopic].steps[idStep].decisions.length;
        for (let decision of topics[idTopic].steps[idStep].decisions) {
            if (decision.isDone) {
                --count;
            }
        }
        if (count === 0 && (topics[idTopic].steps[idStep].text && topics[idTopic].steps[idStep].isDone || !topics[idTopic].steps[idStep].text)) {
            if (topics[idTopic]['steps'].length - 1 === idStep) {
                topics[idTopic].isDone = true;
                ++topics[idTopic].attempts;
            } else {
                ++topics[idTopic].currentStep
            }
        }
    } else {
        const {step} = props.payload;

        let points = step.gainedPoints - topics[idTopic]["steps"][idStep].gainedPoints
        topics[idTopic]["steps"][idStep] = {...topics[idTopic]["steps"][idStep], ...step};
        topics[idTopic].gainedPoints += points;
        let count = topics[idTopic].steps[idStep].decisions? topics[idTopic].steps[idStep].decisions.length: 0;
        if (topics[idTopic].steps[idStep].decisions) {
            for (let decision of topics[idTopic].steps[idStep].decisions) {
                if (decision.isDone) {
                    --count;
                }
            }
        }

        if (count === 0 && topics[idTopic]['steps'].length - 1 === idStep) {
            topics[idTopic].isDone = true;
            ++topics[idTopic].attempts;
        } else {
            ++topics[idTopic].currentStep
        }
    }

    let points = 0;
    for (let topic of topics) {
        points += topic.gainedPoints;
    }
    localStorage.setItem("points", points.toString());
    localStorage.setItem("data", JSON.stringify(topics))
    yield put({
        type: CNST.USER.CHANGE_POINTS,
        payload: {points}
    })
    yield put({
        type: CNST.STEPS.UPDATE_STEP.SUCCESS,
        payload: {idTopic, idStep, step: topics[idTopic].steps[idTopic]}
    })
    delete topics[idTopic].steps;
    yield put({
        type: CNST.TOPICS.UPDATE_TOPIC.SUCCESS,
        payload: {idTopic, topic: topics[idTopic]}
    });
    // try {
    //     const response = yield call(updateStepRequest, props.payload);
    //     if (response.status === 200) {
    //         yield put({
    //             type: CNST.STEPS.UPDATE_STEP.SUCCESS
    //         })
    //     }
    // } catch (e) {
    //     yield  put({
    //         type: CNST.TOPICS.UPDATE_TOPIC.ERROR,
    //         payload: {
    //             message: e.toString()
    //         }
    //     })
    // }
}