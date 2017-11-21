import {createReducer} from "../../lib/redux-helpers";
import {ActionsObservable, Epic} from "redux-observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import Hue, {Hub} from "../../lib/hue";
import "rxjs/add/operator/map";

enum HubActionTypes {
    FETCH_HUBS_REQUESTED = 'FETCH_HUBS_REQUESTED',
    FETCH_HUBS_SUCCESSFUL = 'FETCH_HUBS_SUCCESSFUL'
}

interface HubState {
    hubs: Hub[],
    isHubsLoading: boolean,
}

const initialState: HubState = {
    hubs: [],
    isHubsLoading: false,
};

interface FetchHubsSuccessful {
    type: HubActionTypes.FETCH_HUBS_SUCCESSFUL,
    hubs: Hub[]
}

interface FetchHubsRequested {
    type: HubActionTypes.FETCH_HUBS_REQUESTED,
}

export const fetchHubsRequested = () =>
    ({
        type: HubActionTypes.FETCH_HUBS_REQUESTED
    });

export const fetchHubsSuccessful = (hubs: Hub[]): FetchHubsSuccessful =>
    ({
        type: HubActionTypes.FETCH_HUBS_SUCCESSFUL,
        hubs
    });


type Action = FetchHubsRequested | FetchHubsSuccessful

export const HubsEpic: Epic<FetchHubsSuccessful, any> = (action$: ActionsObservable<Action>) =>
    action$.ofType(HubActionTypes.FETCH_HUBS_REQUESTED)
        .mergeMap(() =>
            Hue.discover()
                .map(fetchHubsSuccessful)
        );

const HubsReducer = createReducer(initialState, {
    [HubActionTypes.FETCH_HUBS_REQUESTED](state: HubState, _: FetchHubsRequested): HubState {
        return {
            ...state,
            isHubsLoading: true,
        }
    },
    [HubActionTypes.FETCH_HUBS_SUCCESSFUL](state: HubState, action: FetchHubsSuccessful): HubState {
        return {
            ...state,
            isHubsLoading: false,
            hubs: action.hubs,
        }
    }
});

export default HubsReducer;