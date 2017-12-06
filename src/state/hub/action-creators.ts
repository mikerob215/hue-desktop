import {HubActionTypes} from './action-types';
import {Action} from 'redux';

export namespace HubActionCreators {
    export type HubAction =
        ConnectHubSuccessful |
        ConnectHubRequested |
        ConnectHubFailed;

    export interface ConnectHubRequested extends Action {
        type: HubActionTypes.CONNECT_HUB_REQUESTED;
        payload: { ip: string, id: string };
    }

    export interface ConnectHubSuccessful extends Action {
        type: HubActionTypes.CONNECT_HUB_SUCCESSFUL;
        payload: { username: string };
    }

    export interface ConnectHubFailed extends Action {
        type: HubActionTypes.CONNECT_HUB_FAILED;
    }

    export const connectHubRequested = (ip: string, id?: string): ConnectHubRequested => ({
        type: HubActionTypes.CONNECT_HUB_REQUESTED,
        payload: {id, ip},
    });

    export const connectHubSuccessful = (response: any): ConnectHubSuccessful =>
        ({
            type: HubActionTypes.CONNECT_HUB_SUCCESSFUL,
            payload: {username: response[0].success.username},
        });

    export const connectHubFailed = (): ConnectHubFailed => {
        return ({
            type: HubActionTypes.CONNECT_HUB_FAILED
        });
    };
}
