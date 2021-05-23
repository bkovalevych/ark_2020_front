import CNST from "../../constants/"

export function getSteps(idTopic) {
    return {
        type: CNST.STEPS.GET_STEPS.FETCH,
        payload: {idTopic}
    }
}

export function updateStep({idTopic, idStep, step}) {
    return {
        type: CNST.STEPS.UPDATE_STEP.FETCH,
        payload: {idTopic, idStep, step}
    }
}

export function updateDecision({idTopic, idStep, idDecision, points}) {
    return {
        type: CNST.STEPS.UPDATE_STEP.FETCH,
        payload: {idTopic, idStep, idDecision, points}
    }
}