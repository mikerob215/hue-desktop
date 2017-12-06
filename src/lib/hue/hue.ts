import {Observable} from 'rxjs/Observable';
import {fetchUtil} from 'lib';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';

export namespace Hue {
    export interface Hub {
        internalipaddress: string;
        id: string;
    }

    export const DISCOVER_URL = 'https://www.meethue.com/api/nupnp/';
    /**
     * @name discover
     * @return {Observable<Hub[]>}
     */
    export const discover: () => Observable<Hub[]> = () =>
        Observable.fromPromise(fetchUtil.get<Hub[]>(DISCOVER_URL));

    export interface ConnectSuccess {
        username: string;
    }

    export interface ConnectError {
        error: {
            type: number
            address: string;
            description: string;
        };
    }

    type ConnectResponse = ConnectSuccess | ConnectError;
    /**
     * @name connect
     * @param {string} ip
     * @return {Observable<[ConnectResponse]>}
     */
    export const connect = (ip: string): Observable<[ConnectResponse]> =>
        Observable.defer(() =>
            fetchUtil.post<ConnectResponse>(`http://${ip}/api`, {body: {'devicetype': 'desktop_hue#something'}})
                .then((res: any) =>
                    res[0].error ? Promise.reject(new Error('unauthorized')) : res));

}
