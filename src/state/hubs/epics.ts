import {ActionsObservable} from 'redux-observable';
import Hue from 'lib/hue/hue';
import {HubsActionCreators} from './action-creators';
import {HubsActionTypes} from './action-types';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

export namespace HubsEpics {
    export const fetchHubsEpic = (action$: ActionsObservable<HubsActionCreators.HubsAction>) =>
        action$.ofType(HubsActionTypes.FETCH_HUBS_REQUESTED)
            .mergeMap(() =>
                Hue.discover()
                    .map(HubsActionCreators.fetchHubsSuccessful)
                    .catch(() => Observable.of(HubsActionCreators.fetchHubsFailed()))
            );
}
