import {HubsActionTypes} from './action-types';
import {Hue} from '../../lib';
import {Action} from 'redux';
import Hub = Hue.Hub;

export namespace HubsActionCreators {
    export type HubsAction =
        FetchHubsRequested |
        FetchHubsSuccessful |
        FetchHubsFailed;

    export interface FetchHubsSuccessful extends Action {
        type: HubsActionTypes.FETCH_HUBS_SUCCESSFUL;
        hubs: Hub[];
    }

    export interface FetchHubsRequested extends Action {
        type: HubsActionTypes.FETCH_HUBS_REQUESTED;
    }

    export interface FetchHubsFailed extends Action {
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
