import {ActionsObservable} from 'redux-observable';
import {HubsActionCreators} from './action-creators';
import {HubsActionTypes} from './action-types';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {Hue} from '../../lib';

export namespace HubsEpics {
    export const fetchHubsEpic = (action$: ActionsObservable<HubsActionCreators.HubsAction>) =>
        action$.ofType(HubsActionTypes.FETCH_HUBS_REQUESTED)
            .mergeMap(() =>
                Hue.discover()
                    .map(HubsActionCreators.fetchHubsSuccessful)
                    .catch(() => Observable.of(HubsActionCreators.fetchHubsFailed()))
            );
}
