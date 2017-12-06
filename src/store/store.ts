import {applyMiddleware, combineReducers, createStore} from 'redux';
import HubsReducer, {HubsState} from '../state/hubs/reducer';
import {combineEpics, createEpicMiddleware, Epic} from 'redux-observable';
import {HubsEpics} from '../state/hubs/epics';
import {HubEpic} from '../state/hub/epic';
import {HubReducer, HubState} from '../state/hub/reducer';
import {HubActionCreators} from '../state/hub/action-creators';

export interface AppState {
    Hubs: HubsState;
    Hub: HubState | HubActionCreators.HubAction;
}

const configureStore = () => {
    const epics: Epic<any, any, any> = combineEpics(
        ...[
            ...Object.values(HubsEpics),
            ...Object.values(HubEpic)
        ]
    );

    const reducers = combineReducers({
        Hubs: HubsReducer,
        Hub: HubReducer
    });

    const epicMiddleware = createEpicMiddleware(epics);

    return createStore(
        reducers,
        applyMiddleware(epicMiddleware)
    );
};

export default configureStore;