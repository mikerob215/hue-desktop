import {createReducer} from 'lib/redux-helpers/create-reducer';
import {HubsActionTypes} from './action-types';
import {HubsActionCreators} from './action-creators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Hue} from '../../lib';
import Hub = Hue.Hub;

export interface HubsState {
    hubs: Hub[];
    isHubsLoading: boolean;
}

export const initialState: HubsState = {
    hubs: [],
    isHubsLoading: false,
};

const HubsReducer = createReducer(initialState, {
    [HubsActionTypes.FETCH_HUBS_REQUESTED](state: HubsState): HubsState {
        return {
            ...state,
            isHubsLoading: true,
        };
    },
    [HubsActionTypes.FETCH_HUBS_SUCCESSFUL](state: HubsState, {hubs}: HubsActionCreators.FetchHubsSuccessful): HubsState {
        return {
            ...state,
            isHubsLoading: false,
            hubs,
        };
    },
    [HubsActionTypes.FETCH_HUBS_FAILED](state: HubsState): HubsState {
        return {
            ...state,
            isHubsLoading: false,
        };
    }
});

export default HubsReducer;