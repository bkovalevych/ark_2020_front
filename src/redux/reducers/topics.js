import CNST from "../../constants";
import moveData from "../stores/moveData";

export default function (state = moveData, action) {
    switch (action.type) {
        case CNST.TOPICS.GET_TOPICS.SUCCESS:
            let points = 0;
            for (let topic of action.payload) {
                points += topic.gainedPoints;
            }
            localStorage.setItem("points", points.toString());
            return {
                ...state,
                error: null,
                fetching: false,
                topics: action.payload
            };
        case CNST.TOPICS.GET_TOPICS.ERROR:
            return {
                ...state,
                error: action.payload,
                fetching: false,
                topics: []
            };
        case CNST.TOPICS.GET_TOPICS.FETCH:
            return {
                ...state,
                ...action.payload,
                error: null,
                fetching: true,
                topics: []
            };
        case CNST.TOPICS.UPDATE_TOPIC.FETCH:
            return {
                ...state,
                ...action.payload
            };
        case CNST.TOPICS.UPDATE_TOPIC.ERROR:
            return {
                ...state
            };
        case CNST.TOPICS.UPDATE_TOPIC.SUCCESS:
            const {idTopic, topic} = action.payload;
            state.topics[idTopic] = {...state.topics[idTopic], ...topic}
            return {
                fetching: false,
                error: null,
                ...state
            };
        default:
            return state;
    }
}