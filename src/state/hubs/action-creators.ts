import {Hub} from 'lib';
import {HubsActionTypes} from './action-types';

export namespace HubsActionCreators {
    export type HubsAction =
        FetchHubsRequested |
        FetchHubsSuccessful |
        FetchHubsFailed;

    export interface FetchHubsSuccessful {
        type: HubsActionTypes.FETCH_HUBS_SUCCESSFUL;
        hubs: Hub[];
    }

    export interface FetchHubsRequested {
        type: HubsActionTypes.FETCH_HUBS_REQUESTED;
    }

    export interface FetchHubsFailed {
        type: HubsActionTypes.FETCH_HUBS_FAILED;
    }

    export const fetchHubsRequested = (): FetchHubsRequested =>
        ({
            type: HubsActionTypes.FETCH_HUBS_REQUESTED
        });

    export const fetchHubsSuccessful = (hubs: Hub[]): FetchHubsSuccessful =>
        ({
            type: HubsActionTypes.FETCH_HUBS_SUCCESSFUL,
            hubs
        });

    export const fetchHubsFailed = (): FetchHubsFailed =>
        ({
            type: HubsActionTypes.FETCH_HUBS_FAILED,
        });
}
