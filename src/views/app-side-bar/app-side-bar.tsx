import {compose, setDisplayName} from 'recompose';
import * as React from 'react';

const enhance = compose(
    setDisplayName('AppSideBar')
);

const AppSideBarComp: React.SFC = () =>
    <div>asdff</div>;

export const AppSideBar = enhance(AppSideBarComp);
