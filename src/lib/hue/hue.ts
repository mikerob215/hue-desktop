import {Observable} from 'rxjs/Observable';
import {fetchUtil} from 'lib';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/defer';

export interface Hub {
    internalipaddress: string;
    id: string;
}

const discoverURL = 'https://www.meethue.com/api/nupnp/';
/**
 * @name discover
 * @return {Observable<Hub[]>}
 */
const discover: () => Observable<Hub[]> = () =>
    Observable.fromPromise(fetchUtil.get<Hub[]>(discoverURL));

/**
 * @name connect
 * @param {string} ip
 * @return {Observable<any>}
 */
const connect: (ip: string) => Observable<any> = (ip: string) =>
    Observable.defer(() =>
        fetchUtil.post<any>(`http://${ip}/api`, {body: {'devicetype': 'desktop_hue#something'}})
            .then(res => {
                if (res[0].error) return Promise.reject(new Error('unauthorized'));
                return res;
            }));

interface Hue {
    activeHub: Hub;

    discover(): Observable<Hub[]>;

    connect(ip: string): Observable<any>;
}

const Hue: Hue = {
    discover,
    activeHub: null,
    connect,
};

export default Hue;
