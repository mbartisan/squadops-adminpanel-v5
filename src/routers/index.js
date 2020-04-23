import React, {Component} from 'react';
import OrgsRouter from "./orgs/index.js";
import {Route,Switch,Redirect} from "react-router-dom";
import BasicLayout from "../pages/layouts/BasicLayout";
import WelcomeDialog from "../components/common/WelcomeDialog/WelcomeDialog";

class AuthRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <>
                <Switch>
                    <Redirect exact from="/" to="/welcome"/>
                    <Redirect exact from="/orgs" to="/welcome"/>
                    <Route exact path="/welcome" render={()=><BasicLayout showTopBar={true}><WelcomeDialog {...this.props} {...this.state} open={true}/></BasicLayout>}/>
                </Switch>
                <Route path="/orgs/:orgId" render={(props)=><OrgsRouter {...this.props} {...this.state} {...props} />} />
            </>
        )
    }

}

export default AuthRouter;
