import * as R from 'ramda';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {ComponentEnhancer, compose, lifecycle, pure, setDisplayName} from 'recompose';
import {Hub} from 'lib';
import {HubsActionCreators} from './state/hubs/action-creators';
import configureStore from './store/store';
import {HubActionCreators} from './state/hub/action-creators';

const enhance = compose(
    setDisplayName('App'),
);

const mapStateToProps = R.compose(R.pick(['hubs', 'isHubsLoading']), R.prop('Hubs'));

const enhance2: ComponentEnhancer<{ hubs: Hub[], isHubsLoading: boolean, fetchHubsRequested: Function }, {}> = compose(
    connect(mapStateToProps, {...HubsActionCreators, ...HubActionCreators}),
    setDisplayName('SubComponent'),
    pure,
    lifecycle<{ fetchHubsRequested: Function, connectHubRequested: Function }, {}>(
        {
            componentWillMount() {
                console.log(this.props);
                this.props.fetchHubsRequested();
                this.props.connectHubRequested('10.0.0.173');
            },
        },
    ),
);

const subcomponent: React.SFC<{ hubs: Hub[], isHubsLoading: boolean }> = (props) => {
    console.log(props);
    return <div style={{height: '100%'}}>
        {props.isHubsLoading ? 'LOADING.....' : null}
        {R.compose(R.not, R.isEmpty)(props.hubs) ? 'Hubs loaded' : 'No hubs listed'}
    </div>;
};

const SubCmp = enhance2(subcomponent);
const store = configureStore();
const component: React.SFC = () =>
    <Provider store={store}>
        <SubCmp/>
    </Provider>;

const App = enhance(component);

(window as any).getState = store.getState;

ReactDOM.render(<App/>, document.getElementById('app'));
