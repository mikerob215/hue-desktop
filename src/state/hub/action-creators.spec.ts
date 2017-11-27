import {HubEpic} from './epic';
import {ActionsObservable} from 'redux-observable';
import {HubActionCreators} from './action-creators';
import {HubActionTypes} from './action-types';
import fetchMock from 'fetch-mock';

describe('Hub Connect Epic', () => {

    beforeEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should successfully connect to hub if given username', done => {
        const expectedResponse = [{'success': {'username': 'K6Mfj3SFJ9K9UDbCtpOrwlaG7SIdWV-ZLsthiLfb'}}];
        const action$ = ActionsObservable.of(HubActionCreators.connectHubRequested('127.0.0.1'));

        fetchMock.post('http://127.0.0.1/api', expectedResponse);

        HubEpic.connectHubEpic(action$)
            .subscribe(
                (data: HubActionCreators.ConnectHubSuccessful) => {
                    expect(data.type).toEqual(HubActionTypes.CONNECT_HUB_SUCCESSFUL);
                    expect(data.payload.username).toBe('K6Mfj3SFJ9K9UDbCtpOrwlaG7SIdWV-ZLsthiLfb');

                    done();
                }
            );
    });
});