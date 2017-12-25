import * as React from 'react';
import {AppSideBar} from '../app-side-bar/app-side-bar';
import {AppNav} from '../app-nav/app-nav';

export const AppArea: React.SFC = () =>
    <main>
        <AppNav/>
        <AppSideBar/>
    </main>;
