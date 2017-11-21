import {applyMiddleware, combineReducers, createStore} from "redux";
import HubsReducer from "../state/hubs/reducer";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {HubsEpics} from "../state/hubs/epics";

const epics = combineEpics(
    ...Object.values(HubsEpics),
);

const reducers = combineReducers({
    Hubs: HubsReducer
});

const store = createStore(reducers, applyMiddleware(createEpicMiddleware(epics)));

export default store;