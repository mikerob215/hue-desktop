import {createReducer} from "../../lib/redux-helpers";
import {Hub} from "../../lib/hue";
import {HubActionTypes} from "./action-types";
import {HubsActionCreators} from "./action-creators";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

interface HubState {
    hubs: Hub[],
    isHubsLoading: boolean,
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
        }
    },
    [HubActionTypes.FETCH_HUBS_SUCCESSFUL](state: HubState, action: HubsActionCreators.FetchHubsSuccessful): HubState {
        return {
            ...state,
            isHubsLoading: false,
            hubs: action.hubs,
        }
    }
});

export default HubsReducer;