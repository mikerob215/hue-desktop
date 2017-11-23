import {Hub} from '../../lib/hue';
import {HubActionTypes} from './action-types';

export namespace HubsActionCreators {
    export type HubsAction =
        FetchHubsRequested |
        FetchHubsSuccessful |
        FetchHubsFailed;

    export interface FetchHubsSuccessful {
        type: HubActionTypes.FETCH_HUBS_SUCCESSFUL;
        hubs: Hub[];
    }

    export interface FetchHubsRequested {
        type: HubActionTypes.FETCH_HUBS_REQUESTED;
    }

    export interface FetchHubsFailed {
        type: HubActionTypes.FETCH_HUBS_FAILED;
    }

    export const fetchHubsRequested = (): FetchHubsRequested =>
        ({
            type: HubActionTypes.FETCH_HUBS_REQUESTED
        });

    export const fetchHubsSuccessful = (hubs: Hub[]): FetchHubsSuccessful =>
        ({
            type: HubActionTypes.FETCH_HUBS_SUCCESSFUL,
            hubs
        });

    export const fetchHubsFailed = (): FetchHubsFailed =>
        ({
            type: HubActionTypes.FETCH_HUBS_FAILED,
        });
}
