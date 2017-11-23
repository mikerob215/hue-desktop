import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/dom/ajax';

export interface Hub {
    internalipaddress: string;
    id: string;
}

const discoverURL = 'https://www.meethue.com/api/nupnp/';
const discover: () => Observable<Hub[]> = () =>
    Observable.fromPromise(fetch(discoverURL).then(res => res.json()));

const Hue: {
    discover(): Observable<Hub[]>,
    activeHub: Hub
} = {
    discover,
    activeHub: null,
};

export default Hue;
