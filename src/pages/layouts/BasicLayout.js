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

class BasicLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, authUser, routeOrg, showTopBar, showSideBar } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />

                { showTopBar && <AppTopBar authUser={authUser}/> }
                { showSideBar && <AppSideBar authUser={authUser} routeOrg={routeOrg} /> }

                <main className={classes.content}>
                    <div className={classes.toolbar} style={{marginBottom:'15px'}}/>
                    {/* Below copies the props and state from this to all children */}
                    {/*{ React.Children.map(this.props.children, child => React.cloneElement(child, { ...this.props, ...this.state })) }*/}
                    { this.props.children }
                </main>

            </div>
        )
    }
}

export default withStyles(styles)(withRouter(BasicLayout));
