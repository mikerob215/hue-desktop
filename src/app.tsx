import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, setDisplayName} from 'recompose';
import configureStore from './store/store';
import {MemoryRouter} from 'react-router';
import {AppShell} from './views/app-shell/app-shell';

const enhance = compose(
    setDisplayName('App'),
);

const store = configureStore();
const component: React.SFC = () =>
    <Provider store={store}>
        <MemoryRouter>
                <AppShell/>
        </MemoryRouter>
    </Provider>;

const App = enhance(component);

(window as any).getState = store.getState;

ReactDOM.render(<App/>, document.getElementById('app'));
