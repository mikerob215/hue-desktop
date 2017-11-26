import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/dom/ajax';
import {fetchUtil} from 'lib';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/defer';

export interface Hub {
    internalipaddress: string;
    id: string;
}

const discoverURL = 'https://www.meethue.com/api/nupnp/';
const discover: () => Observable<Hub[]> = () =>
    Observable.fromPromise(fetchUtil.get<Hub[]>(discoverURL));

const connect: (ip: string, id: string) => Observable<any> = (ip: string) =>
    Observable.defer(() => fetchUtil.post<any>(`http://${ip}/api`, {body: {'devicetype': 'desktop_hue#something'}}).then(res => {
        if (res[0].error) return Promise.reject(new Error('unauthorized'));
        return res;
    }))
        .retry();

const Hue: {
    discover(): Observable<Hub[]>,
    activeHub: Hub,
    connect(ip: string, id: string): Observable<any>
} = {
    discover,
    activeHub: null,
    connect,
};

export default Hue;
