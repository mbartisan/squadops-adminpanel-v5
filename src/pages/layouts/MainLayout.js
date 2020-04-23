import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppSideBar from "./components/AppSideBar/AppSideBar";
import AppTopBar from "./components/AppTopBar/AppTopBar";
import {withRouter} from 'react-router-dom'
const styles = (theme) => {
    return ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: '0 20px'
    },
    toolbar: theme.mixins.toolbar,
    alert: {
        backgroundColor: theme.palette.gray.light,
        color: '#efefef',
        borderRadius: '3px'
    }

})};

class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSteam64Dialog: false
        };
    }

    render() {
        console.log("MainLayout: ", this.props);
        const { classes, routeOrg, authUser } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />

                <AppTopBar authUser={authUser}/>
                <AppSideBar authUser={authUser} routeOrg={routeOrg}/>

                <main className={classes.content}>
                    <div className={classes.toolbar} style={{marginBottom:'15px'}}/>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(MainLayout));
