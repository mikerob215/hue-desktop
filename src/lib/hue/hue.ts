import {Observable} from 'rxjs/Observable';
import {fetchUtil} from 'lib';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';

export interface Hub {
    internalipaddress: string;
    id: string;
}

const DISCOVER_URL = 'https://www.meethue.com/api/nupnp/';
/**
 * @name discover
 * @return {Observable<Hub[]>}
 */
const discover: () => Observable<Hub[]> = () =>
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
 * @return {Observable<any>}
 */
const connect: (ip: string) => Observable<any> = (ip: string) =>
    Observable.defer(() =>
        fetchUtil.post<ConnectResponse>(`http://${ip}/api`, {body: {'devicetype': 'desktop_hue#something'}})
            .then((res: any) =>
                res[0].error ? Promise.reject(new Error('unauthorized')) : res));

interface Hue {
    activeHub: Hub;
    discover(): Observable<Hub[]>;

    connect(ip: string): Observable<ConnectResponse>;
}

const Hue: Hue = {
    discover,
    activeHub: null,
    connect,
};

export default Hue;
