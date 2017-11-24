import * as R from 'ramda';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {ComponentEnhancer, compose, lifecycle, pure, setDisplayName} from 'recompose';
import {Hub} from 'lib';
import {HubsActionCreators} from './state/hubs/action-creators';
import configureStore from './store/store';

const enhance = compose(
    setDisplayName('App'),
);

const mapStateToProps = R.compose(R.pick(['hubs', 'isHubsLoading']), R.prop('Hubs'));

const enhance2: ComponentEnhancer<{ hubs: Hub[], isHubsLoading: boolean, fetchHubsRequested: Function }, {}> = compose(
    connect(mapStateToProps, {...HubsActionCreators}),
    setDisplayName('SubComponent'),
    pure,
    lifecycle<{ fetchHubsRequested: Function }, {}>(
        {
            componentWillMount() {
                this.props.fetchHubsRequested();
            },
        },
    ),
);

const subcomponent: React.SFC<{ hubs: Hub[], isHubsLoading: boolean }> = (props) =>
    <div style={{height: '100%'}}>
        {props.isHubsLoading ? 'LOADING.....' : null}
        {R.compose(R.not, R.isEmpty)(props.hubs) ? 'Hubs loaded' : null}
    </div>;

const SubCmp = enhance2(subcomponent);
const store = configureStore();
const component: React.SFC = () =>
    <Provider store={store}>
        <SubCmp/>
    </Provider>;

const App = enhance(component);

ReactDOM.render(<App/>, document.getElementById('app'));
