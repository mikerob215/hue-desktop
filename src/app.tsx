import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {MemoryRouter} from 'react-router';
import {AppShell} from './views/app-shell/app-shell';

const store = configureStore();
const App: React.SFC = () =>
    <Provider store={store}>
        <MemoryRouter>
                <AppShell/>
        </MemoryRouter>
    </Provider>;

(window as any).getState = store.getState;

ReactDOM.render(<App/>, document.getElementById('app'));
