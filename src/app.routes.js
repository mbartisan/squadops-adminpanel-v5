import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {Route, Switch, Redirect, withRouter, Link} from 'react-router-dom';
import {getUserId,getAccessToken,logout} from "./services/auth";

import * as config from "./config";

import LoginDialog from "./components/common/LoginDialog/LoginDialog";
import apiService from "./services/api";

import AuthRouter from "./routers/index.js";
import BasicLayout from "./pages/layouts/BasicLayout";

if (config.GOOGLE_ANALYTICS_ID != null) ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);

const AUTHENTICATED_REFRESH_RATE = 5 * 60 * 1000; // idk if this is used in v5?.. // After this amount of time, we'll recheck the authentication on this components next render (page change)

class AppRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: null
        };
        this.updateAuthUser = this.updateAuthUser.bind(this);
        props.history.listen(location => ReactGA.pageview(location.pathname));
        ReactGA.pageview(props.location.pathname);
    }

    async updateAuthUser() {
        if (this.state.authUser && this.state.authUser.id == getUserId()) return;
        if (this.state.authUser && !getUserId()) return this.setState({ authUser: null });
        console.warn("*** updateCurrentUser", this.state.authUser, getUserId());
        const user = await apiService.v5.users.me.retrieve();
        const orgs = await apiService.v5.users.orgs.list(user.id);
        user.orgs = orgs;
        this.setState({ authUser: user });
    }

    render () {
        console.log("app.routes render")
        console.log("app.routes props: " , this.props);
        console.log("app.routes locaiton path: " , this.props.location.pathname);

        this.updateAuthUser();

        return (<>
            <Switch>
                <Route exact path="/login" render={()=><BasicLayout showTopBar={true}><LoginDialog open={true}/></BasicLayout>}/>
                <Route exact path="/logout" render={() => {
                    logout().then(()=>this.props.history.push('/login'));
                    return <BasicLayout showTopBar={true}></BasicLayout>;
                }}/>
                { !getAccessToken() && <Redirect to="/login"/> }
                { !this.state.authUser && <BasicLayout><>Loading...</></BasicLayout>}
                { this.state.authUser && <AuthRouter authUser={this.state.authUser}/> }
            </Switch>
        </>)
    }

}

export default withRouter(AppRouter);
