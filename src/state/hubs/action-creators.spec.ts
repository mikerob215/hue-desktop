import {ActionsObservable} from 'redux-observable';
import {HubsEpics} from './epics';
import {HubActionTypes} from './action-types';
import {HubsActionCreators} from './action-creators';
import fetchMock from 'fetch-mock';

describe('Hubs Action Creators', () => {
    const action$ = ActionsObservable.of(HubsActionCreators.fetchHubsRequested());

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it(`creates ${HubActionTypes.FETCH_HUBS_SUCCESSFUL.toString()} when fetching hubs is finished`, done => {
        const expectedResponse = [{internalipaddress: '127.0.0.1', id: 'somehueid'}];
        fetchMock.getOnce('https://www.meethue.com/api/nupnp/', expectedResponse);
        HubsEpics.fetchHubsEpic(action$)
            .subscribe(
                (data: HubsActionCreators.FetchHubsSuccessful) => {
                    expect(data.type).toEqual(HubActionTypes.FETCH_HUBS_SUCCESSFUL);
                    expect(data.hubs).toEqual([{internalipaddress: '127.0.0.1', id: 'somehueid'}]);

                    done();
                }
            );
    });

    it(`should handle errors`, done => {
        fetchMock.getOnce('https://www.meethue.com/api/nupnp/', {throws: new Error('404')});

        HubsEpics.fetchHubsEpic(action$)
            .subscribe((data: HubsActionCreators.FetchHubsFailed) => {
                    expect(data.type).toEqual(HubActionTypes.FETCH_HUBS_FAILED);

                    done();
                }
            );
    });
});
