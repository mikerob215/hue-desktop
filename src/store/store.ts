import {applyMiddleware, combineReducers, createStore} from 'redux';
import HubsReducer from '../state/hubs/reducer';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {HubsEpics} from '../state/hubs/epics';

const configureStore = () => {
    const epics = combineEpics(
        ...Object.values(HubsEpics),
    );

    const reducers = combineReducers({
        Hubs: HubsReducer
    });

    const epicMiddleware = createEpicMiddleware(epics);

    return createStore(
        reducers,
        applyMiddleware(epicMiddleware)
    );
};

export default configureStore;