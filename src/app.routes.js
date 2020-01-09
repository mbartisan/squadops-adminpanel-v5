import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {Route, Switch, Redirect, withRouter, Link} from 'react-router-dom';
import { connect } from "react-redux";

import * as config from "./config";

import { getAuth, getURLOrgId, clearAuth, goToLogin } from "./services/AuthService";

import { setUserState, clearUserState} from './modules/UserState/UserStateActions';
import * as userStateService from './modules/UserState/UserStateService';

import OrgRouter from "./modules/Org/OrgRouter"

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PageView from "./modules/Common/PageView/PageView";
import OrgListDialog from "./modules/UserState/OrgListDialog/OrgListDialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import {DialogContent} from "@material-ui/core";
import MainContainer from "./layouts/MainContainer";

if (config.GOOGLE_ANALYTICS_ID != null) ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);

const AUTHENTICATED_REFRESH_RATE = 5 * 60 * 1000; // After this amount of time, we'll recheck the authentication on this components next render (page change)

class AppRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastAuthenticated: Date.now(),
            showSteam64Dialog: false
        };
        this.authenticate = this.authenticate.bind(this);
        props.history.listen(location => ReactGA.pageview(location.pathname));
        ReactGA.pageview(props.location.pathname);
    }

    componentDidMount() {
        this.authenticate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const oldOrgId = prevProps.location.pathname.split("/")[1];
        // let newOrgId = this.props.location.pathname.split("/")[1];
        // if (oldOrgId != newOrgId) {
        //     this.authenticate();
        // }
        if (Date.now() > this.state.lastAuthenticated + AUTHENTICATED_REFRESH_RATE) {
            this.setState(() => {
                this.authenticate();
            });
        }
    }

    authenticate() {
        const { accessToken, userId, orgId } = this.getSavedAuthData();
        console.log("Authenticate | ", accessToken, userId, orgId);

        if (accessToken == null || accessToken === "") return clearAuth();
        if (userId == null || userId === "" || isNaN(userId)) return clearAuth();

        // userStateService.getLogin().then((login) => {
        //     console.log("Authenticate call done", login);
        //
        //     if (login == null) {
        //         console.log("login denyAuthentication",login);
        //         return this.denyAuthentication();
        //     }
        //
        //     const { user, org, role } = login;
        //
        //     if (user == null || user.id == null || isNaN(user.id)) {
        //         console.log("user denyAuthentication",user, org, role);
        //         this.denyAuthentication();
        //         return;
        //     }
        //     ReactGA.set({ userId: user.id });
        //
        //     if (org == null) {
        //         this.props.setUserState({ user, org, role });
        //         return;
        //     }
        //     ReactGA.set({ orgId: org.id });
        //
        //     if (role == null) {
        //         console.log("role denyAuthentication",user, org, role);
        //         this.denyAuthentication();
        //         return;
        //     }
        //
        //     this.approveAuthentication(user, org, role);
        //     return;
        // });
    }

    approveAuthentication(user, org, role) {
        this.setState({ lastAuthenticated: Date.now() });
        this.props.setUserState({ user, org, role });
        this.props.history.push('/orgs/' + org.id);
    }

    denyAuthentication() {
        clearAuth();
        this.setState({ lastAuthenticated: Date.now() });
        // this.props.clearUserState();
    }

    getSavedAuthData() {
        const {userId,accessToken} = getAuth();
        const orgId = getURLOrgId();
        return { accessToken, userId, orgId };
    }

    render () {
        console.log("locaiton path: " , this.props.location.pathname);

        if (this.props.location.pathname === "/login") {
            goToLogin()
        }

        if (this.props.location.pathname === "/logout") {
            clearAuth()
        }

        // if (this.props.userState.org == null && this.props.userState.user != null) {
        //     const {orgs} = this.props.userState.user;
        //
        //     const orgId = this.props.location.pathname.split("/")[2];
        //     if (orgId != null && orgId !== "" && !isNaN(orgId)) {
        //         return <>Loading...</>;
        //     }
        //
        //     if (orgs == null || orgs.length === 0) {
        //         return (<Dialog open>
        //             <DialogTitle>Welcome to squadops.gg!</DialogTitle>
        //             <Divider />
        //             <DialogContent>
        //                 Foo
        //             </DialogContent>
        //         </Dialog>);
        //     }
        //
        //     if (orgs.length === 1) {
        //         console.log("org.length is 1, redirect to /:orgId")
        //         return (<Redirect to={'/orgs/'+orgs[0].id}/>);
        //     }
        //
        //     return (<Redirect to={'/orgs'}/>);
        // }

        console.log("app.routes render")

        return (<>
            <Switch>
                <OrgRouter/>

                {/*<Route path="/orgs/:orgId">*/}
                {/*</Route>*/}

            </Switch>
            {/*{ this.props.userState.user != null && this.props.userState.user.steam64 == null && (<>*/}
            {/*    <div style={{*/}
            {/*        position:'fixed',*/}
            {/*        bottom:'0',*/}
            {/*        left:'0',*/}
            {/*        right:'0',*/}
            {/*        width:'100%',*/}
            {/*        height:'48px',*/}
            {/*        background: '#05080d',*/}
            {/*        zIndex: 10000,*/}
            {/*        padding: '15px',*/}
            {/*        borderTop: 'solid 1px #912b2b'*/}
            {/*    }}>*/}
            {/*        <span style={{color:'#ff9422',fontWeight:700}}>Warning!</span> Your steam 64 id is not set. Some admin permissions may not work in-game. <span style={{color:'#ff5555',cursor:'pointer',textDecoration:'underline'}} onClick={()=>this.setState({ showSteam64Dialog: true })}>Click here to set your steam 64 id.</span>*/}
            {/*    </div>*/}
            {/*    <Steam64Dialog open={this.state.showSteam64Dialog} onClose={(steam) => { userStateService.setSteam64(steam.id).then(()=>this.authenticate()); this.setState({ showSteam64Dialog: false }); }}/>*/}
            {/*</>) }*/}
        </>)
    }

}

export default withRouter(connect((state) => ({ userState: state.UserState }), { setUserState, clearUserState })(AppRouter));
