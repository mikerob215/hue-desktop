import {applyMiddleware, combineReducers, createStore} from 'redux';
import HubsReducer from '../state/hubs/reducer';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {HubsEpics} from '../state/hubs/epics';
import {HubEpic} from '../state/hub/epic';

const configureStore = () => {
    const epics: any = combineEpics(
        ...[
            ...Object.values(HubsEpics),
            ...Object.values(HubEpic)
        ]
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