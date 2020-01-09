import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

// import RoleList from "./Roles/RoleList/RoleList"
import UserList from "./Users/UserList/UserList"
import TeamList from "./Teams/TeamList/TeamList";
import TeamView from "./Teams/TeamView/TeamView";
import RoleList from "./Roles/RoleList/RoleList";
import RoleView from "./Roles/RoleView/RoleView";

class OrgRouter extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/orgs/:orgId" component={UserList}/>
                <Route exact path="/orgs/:orgId/users" component={UserList}/>
                <Route exact path="/orgs/:orgId/teams" component={TeamList}/>
                <Route exact path="/orgs/:orgId/teams/:teamId" component={TeamView}/>
                <Route exact path="/orgs/:orgId/roles" component={RoleList}/>
                <Route exact path="/orgs/:orgId/roles/:roleId" component={RoleView}/>
            </Switch>
        )
    }

}
export default withRouter(connect(state => state, {})(OrgRouter));
