import axios from 'axios';
import * as R from 'ramda';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/map";

const extractData = R.prop('data');

export interface Hub {
    internalipaddress: string,
    id: string
}

const discover: () => Observable<Hub[]> = () =>
    Observable.fromPromise(axios.get(`https://www.meethue.com/api/nupnp/`))
        .map(extractData);

const Hue: {
    discover(): Observable<Hub[]>,
    activeHub: Hub
} = {
    discover,
    activeHub: null,
};

export default Hue;
