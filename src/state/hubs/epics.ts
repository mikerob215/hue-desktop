import {ActionsObservable} from "redux-observable";
import Hue from "../../lib/hue";
import {HubsActionCreators} from "./action-creators";
import {HubActionTypes} from "./action-types";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";

export namespace HubsEpics {
    export const FetchHubsEpic = (action$: ActionsObservable<HubsActionCreators.HubsAction>) =>
        action$.ofType(HubActionTypes.FETCH_HUBS_REQUESTED)
            .mergeMap(() =>
                Hue.discover()
                    .map(HubsActionCreators.fetchHubsSuccessful)
                    .catch(() => Observable.of(HubsActionCreators.fetchHubsFailed()))
            );
}
