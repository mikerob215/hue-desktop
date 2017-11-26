import Hue from 'lib/hue/hue';
import {HubActionTypes} from './action-types';
import {HubActionCreators} from './action-creators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {ActionsObservable} from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

const RECONNECT_DELAY = 2000;
export namespace HubEpic {
    export const connectHubEpic = (action$: ActionsObservable<HubActionCreators.ConnectHubRequested>) => {
        return action$.ofType(HubActionTypes.CONNECT_HUB_REQUESTED)
            .mergeMap((action) =>
                Hue.connect(action.payload.ip)
                    .map(HubActionCreators.connectHubSuccessful)
                    .retryWhen(errors => errors.delay(RECONNECT_DELAY))
                    .catch(() => Observable.of(HubActionCreators.connectHubFailed()))
            );
    };
}