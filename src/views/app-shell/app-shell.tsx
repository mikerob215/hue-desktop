import * as React from 'react';
import {Route} from 'react-router';
import './app-shell.scss';

export const AppShell: React.SFC = () =>
    <div className="app-shell">
        <Route exact path="/" render={() => <div>Home for now</div>}/>
        <Route path={'/hubs/:id'} render={({match: {params: {id}}}) => <p>{id}</p>}/>
    </div>;
