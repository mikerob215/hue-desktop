import * as React from 'react';
import {branch, compose, lifecycle, renderComponent, setDisplayName} from 'recompose';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {HubsActionCreators} from 'state/hubs/action-creators';
import {HubsState} from '../../state/hubs/reducer';
import {Link} from 'react-router-dom';

interface HubActionCreatorProps {
    fetchHubsRequested: Function;
}

const isHubsLoading = R.prop('isHubsLoading');

const enhance = compose(
    setDisplayName('HubsComponent'),
    connect(R.prop('Hubs'), {...HubsActionCreators}),
    lifecycle<HubActionCreatorProps, {}>({
        componentWillMount() {
            this.props.fetchHubsRequested();
        }
    }),
    branch(
        isHubsLoading, renderComponent(() => <div>Loading...</div>)
    )
);

const component: React.SFC<HubsState> = ({hubs}) => <div>
    <ul>
        {hubs.map(hub =>
            <li key={hub.id}><Link to={`/hubs/${hub.id}`}>{hub.id}</Link></li>)}
    </ul>
</div>;

export const Hubs: React.ComponentClass<any> = enhance(component);