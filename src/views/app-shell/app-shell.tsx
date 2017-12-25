import * as React from 'react';
import {ComponentEnhancer, compose, setDisplayName} from 'recompose';
import {Route} from 'react-router';
import './app-shell.scss';
import {Hubs} from '../hubs/hubs';
import {AppArea} from '../app=area/app-area';

const enhance: ComponentEnhancer<{}, {}> = compose(
    setDisplayName('App-Shell'),
);

const component: React.SFC = () =>
    <div className="app-shell">
        <AppArea/>
        <Route exact path="/" component={Hubs}/>
        <Route path={'/hubs/:id'} render={({match: {params: {id}}}) => <p>{id}</p>}/>
    </div>;

export const AppShell = enhance(component);
