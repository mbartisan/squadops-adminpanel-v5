import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import apiService from "../../services/api";
import MainLayout from "../../pages/layouts/MainLayout";
import {AWN_ORG_ID} from "../../config";
import ListEvents from "../../pages/orgs/events/ListEvents/ListEvents";
import EditEvent from "../../pages/orgs/events/EditEvent/EditEvent";
import ListTemplates from "../../pages/orgs/events/ListTemplates/ListTemplates";

class OrgsRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routeOrg: null
        };
        this.updateCurrentOrg = this.updateCurrentOrg.bind(this);
        props.history.listen(location => this.updateCurrentOrg());
    }

    getOrgId() {
        return this.props.match.params.orgId;
    }

    componentDidMount() {
        this.updateCurrentOrg();
    }

    async updateCurrentOrg() {
        if (this.state.routeOrg && this.state.routeOrg.id == this.getOrgId()) return;
        if (this.state.routeOrg && !this.getOrgId()) return this.setState({ routeOrg: null });
        console.warn("*** updateCurrentOrg: ", this.state.routeOrg, this.getOrgId());
        const org = await apiService.v5.orgs.retrieve(this.getOrgId());
        org.type = (AWN_ORG_ID == org.id) ? 'awn' : 'org';
        this.setState({ routeOrg: org });
    }

    render () {
        if (!this.state.routeOrg) return <MainLayout>Loading... <br/>(if this takes longer than 10 seconds refresh the page)</MainLayout>;
        console.log("OrgsRouter", this.props);
        return (
            <MainLayout {...this.props} {...this.state}>

                <Switch>
                    <Redirect exact from="/orgs/:orgId" to="/orgs/:orgId/events"/>
                    {/*<Route exact path="/orgs/:orgId/users" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                    {/*<Route exact path="/orgs/:orgId/roles" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                    {/*<Route exact path="/orgs/:orgId/teams" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                    {/*<Route exact path="/orgs/:orgId/tags" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                    <Route exact path="/orgs/:orgId/events" render={(props)=><ListEvents {...this.props} {...this.state} {...props} />} />
                    <Route exact path="/orgs/:orgId/events/create-event" render={(props)=><EditEvent eventId={null}{...this.props} {...this.state} {...props} />} />
                    <Route exact path="/orgs/:orgId/events/:eventId" render={(props)=><EditEvent eventId={props.match.params.eventId} {...this.props} {...this.state} {...props} />} />
                    <Route exact path="/orgs/:orgId/registration-templates" render={(props)=><ListTemplates {...this.props} {...this.state} {...props} />} />
                    {/*<Route exact path="/orgs/:orgId/registration-templates/create-template" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                    {/*<Route exact path="/orgs/:orgId/registration-templates/:templateId" render={(props)=><EventList {...this.props} {...this.state} {...props} />} />*/}
                </Switch>

                {/*<Route path="/orgs/:orgId/users" render={(props)=><OrgAccountsRouter {...this.props} {...this.state} {...props} />} />*/}
                {/*<Route path="/orgs/:orgId/teams" render={(props)=><OrgAccountsRouter {...this.props} {...this.state} {...props} />} />*/}
                {/*<Route path="/orgs/:orgId/roles" render={(props)=><OrgAccountsRouter {...this.props} {...this.state} {...props} />} />*/}
                {/*<Route path="/orgs/:orgId/tags" render={(props)=><OrgAccountsRouter {...this.props} {...this.state} {...props} />} />*/}


            </MainLayout>
        )
    }

}

export default withRouter(OrgsRouter);
