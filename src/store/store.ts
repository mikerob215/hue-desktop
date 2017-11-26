import {applyMiddleware, combineReducers, createStore} from 'redux';
import HubsReducer from '../state/hubs/reducer';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {HubsEpics} from '../state/hubs/epics';
import {HubEpic} from '../state/hub/epic';
import {Hubreducer} from '../state/hub/reducer';

const configureStore = () => {
    const epics: any = combineEpics(
        ...[
            ...Object.values(HubsEpics),
            ...Object.values(HubEpic)
        ]
    );

    const reducers = combineReducers({
        Hubs: HubsReducer,
        Hub: Hubreducer
    });

    const epicMiddleware = createEpicMiddleware(epics);

    return createStore(
        reducers,
        applyMiddleware(epicMiddleware)
    );
};

export default configureStore;