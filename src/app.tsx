import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ComponentEnhancer, compose, lifecycle, setDisplayName,} from 'recompose';
import {connect, Provider} from "react-redux";
import store from "./store/store";
import {Hub} from "./lib/hue";
import * as R from 'ramda';
import {HubsActionCreators} from "./state/hubs/action-creators";

const mapStateToProps = ({Hubs: {hubs, isHubsLoading}}: { Hubs: { hubs: any, isHubsLoading: any } }) => ({
    hubs,
    isHubsLoading
});

const enhance = compose(
    setDisplayName('App'),
);

const enhance2: ComponentEnhancer<{ hubs: Hub[], isHubsLoading: boolean, fetchHubsRequested: Function }, {}> = compose(
    connect(mapStateToProps, {...HubsActionCreators}),
    setDisplayName('SubComponent'),
    lifecycle<{ fetchHubsRequested: Function }, {}>(
        {
            componentWillMount() {
                this.props.fetchHubsRequested()
            }
        }
    ),
);

const subcomponent: React.SFC<{ hubs: Hub[], isHubsLoading: boolean }> = (props) => {
    console.log(props);
    return <div>
        {props.isHubsLoading ? 'LOADING.....' : null}
        {R.compose(R.not, R.isEmpty)(props.hubs) ? 'Hubs loaded' : null}
    </div>;
};

const SubCmp = enhance2(subcomponent);

const component: React.SFC = () =>
    <Provider store={store}>
        <SubCmp/>
    </Provider>;

const App = enhance(component);

ReactDOM.render(<App/>, document.getElementById('app'));
