import {createReducer} from 'lib/redux-helpers/create-reducer';
import {Hub} from 'lib/hue/hue';
import {HubActionTypes} from './action-types';
import {HubsActionCreators} from './action-creators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

interface HubState {
    hubs: Hub[];
    isHubsLoading: boolean;
}

const initialState: HubState = {
    hubs: [],
    isHubsLoading: false,
};

const HubsReducer = createReducer(initialState, {
    [HubActionTypes.FETCH_HUBS_REQUESTED](state: HubState): HubState {
        return {
            ...state,
            isHubsLoading: true,
        };
    },
    [HubActionTypes.FETCH_HUBS_SUCCESSFUL](state: HubState, {hubs}: HubsActionCreators.FetchHubsSuccessful): HubState {
        return {
            ...state,
            isHubsLoading: false,
            hubs,
        };
    },
    [HubActionTypes.FETCH_HUBS_FAILED](state: HubState) {
        return {
            ...state,
            isHubsLoadingHubs: false
        };
    }
});

export default HubsReducer;