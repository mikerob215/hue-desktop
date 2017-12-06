import {createReducer} from 'lib';
import {HubActionTypes} from './action-types';
import {HubActionCreators} from './action-creators';

export interface HubState {
    isConnectingToHub: boolean;
    username: string;
}

export const initialState: HubState = {
    isConnectingToHub: false,
    username: null,
};

export const HubReducer = createReducer(initialState, {
    [HubActionTypes.CONNECT_HUB_REQUESTED](state: HubState, _action: HubActionTypes.CONNECT_HUB_REQUESTED) {
        return {
            ...state,
            isConnectingToHub: true
        };
    },
    [HubActionTypes.CONNECT_HUB_SUCCESSFUL](state: HubState, _action: HubActionCreators.ConnectHubSuccessful) {
        return {
            ...state,
            isConnectingToHub: false
        };
    },
    [HubActionTypes.CONNECT_HUB_FAILED](state: HubState, _action: HubActionCreators.ConnectHubFailed) {
        return {
            ...state,
            isConnectingToHub: false
        };
    }
});