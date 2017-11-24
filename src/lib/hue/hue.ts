import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/dom/ajax';
import {fetchUtil} from 'lib';

export interface Hub {
    internalipaddress: string;
    id: string;
}

const discoverURL = 'https://www.meethue.com/api/nupnp/';
const discover: () => Observable<Hub[]> = () =>
    Observable.fromPromise(fetchUtil.get<Hub[]>(discoverURL));

const Hue: {
    discover(): Observable<Hub[]>,
    activeHub: Hub
} = {
    discover,
    activeHub: null,
};

export default Hue;
