import * as React from 'react';
import {compose, setDisplayName} from 'recompose';
import './app-nav.scss';

const enhance = compose(
    setDisplayName('App-Nav')
);

const BEM_BASE = 'app-nav';

const component = () =>
    <nav className={BEM_BASE}>
        <div className={`${BEM_BASE}__hubs`}>
            Hubs
        </div>
    </nav>;

export const AppNav = enhance(component);