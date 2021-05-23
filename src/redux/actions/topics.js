import CNST from "../../constants/"

export function getTopics() {
    return {
        type: CNST.TOPICS.GET_TOPICS.FETCH
    }
}

export function updateTopic({idTopic, topic}) {
    return {
        type: CNST.TOPICS.UPDATE_TOPIC.FETCH,
        payload: {idTopic, topic}
    }
}

