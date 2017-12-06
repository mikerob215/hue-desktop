import {HubActionTypes} from './action-types';
import {HubActionCreators} from './action-creators';
import {Observable} from 'rxjs/Observable';
import {ActionsObservable} from 'redux-observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import * as R from 'ramda';
import {Hue} from '../../lib';

export namespace HubEpic {
    const RECONNECT_DELAY = 2000;
    const MAX_RETRIES = 20;

    export const connectHubEpic = (action$: ActionsObservable<HubActionCreators.ConnectHubRequested>) => {
        return action$.ofType(HubActionTypes.CONNECT_HUB_REQUESTED)
            .mergeMap((action) =>
                Hue.connect(action.payload.ip)
                    .map(R.head)
                    .map(HubActionCreators.connectHubSuccessful)
                    .retryWhen((errors: ErrorObservable) =>
                        Observable.range(0, MAX_RETRIES + 1)
                            .zip(errors, (i, err) => ({i, err}))
                            .mergeMap(({i, err}) => i === MAX_RETRIES ? Observable.throw(err) : Observable.timer(RECONNECT_DELAY)))
                    .catch(() => Observable.of(HubActionCreators.connectHubFailed()))
            );
    };
}