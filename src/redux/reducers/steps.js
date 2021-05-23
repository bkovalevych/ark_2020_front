import CNST from "../../constants";
import controller_iot from "../stores/controller_iot";

export default function (state = controller_iot, action) {
    switch (action.type) {
        case CNST.STEPS.UPDATE_STEP.SUCCESS:
            // const {idStep, step} = action.payload;
            // const points = step.gainedPoints - state.controller_iot[idStep].gainedPoints;
            // state.gainedPoints += points;
            // state.controller_iot[idStep] = {...state.controller_iot[idStep], ...step};
            return state;
        case CNST.STEPS.UPDATE_STEP.ERROR:
            return {
                ...state
            };
        case CNST.STEPS.UPDATE_STEP.FETCH:
            if (typeof action.payload.idDecision === 'number') {
                const {idTopic, idStep, idDecision, points} = action.payload;
                const isDone = state.steps[idStep].decisions[idDecision].isDone;
                if (!isDone) {
                    state.steps[idStep].decisions[idDecision].isDone = true;
                    state.steps[idStep].gainedPoints += points;
                    state.gainedPoints += points;
                }
            } else {
                const {idStep, step} = action.payload;
                const points = step.gainedPoints - state.steps[idStep].gainedPoints;
                state.gainedPoints += points;
                state.steps[idStep] = {...state.steps[idStep], ...step};
            }
            return state;
        case CNST.STEPS.GET_STEPS.FETCH:
            return {
                ...state,
                ...action.payload,
                error: null,
                fetching: true,
                steps: []
            };
        case CNST.STEPS.GET_STEPS.ERROR:
            return {
                ...state,
                error: action.payload,
                fetching: false,
                steps: []
            };
        case CNST.STEPS.GET_STEPS.SUCCESS:
            return {
                ...state,
                ...action.payload,
                error: null,
                fetching: false,
            };
        default:
            return state;
    }
}