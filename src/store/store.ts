import {applyMiddleware, combineReducers, createStore} from "redux";
import HubsReducer, {HubsEpic} from "../state/hubs";
import {combineEpics, createEpicMiddleware} from "redux-observable";

const epics = combineEpics(
    HubsEpic
);

const reducers = combineReducers({
    Hubs: HubsReducer
});

const store = createStore(reducers, applyMiddleware(createEpicMiddleware(epics)));

export default store;