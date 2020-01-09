import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

import {logout,selectOrg} from "../modules/UserState/UserStateActions";
import {sendAlert,clearAlert,clearAllAlerts} from "../modules/Common/Alerts/AlertsActions";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import {SnackbarContent} from "@material-ui/core";
import {clearAuth} from "../services/AuthService";

const drawerWidth = 240;
const styles = (theme) => {
    // console.log(theme);
    return ({
    root: {
        // flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#0b1119', //0b1119 0b1c24
        borderBottom: 'solid 1px ' + theme.palette.primary.dark
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        paddingTop: '60px',
        borderRight: 'solid 1px ' + theme.palette.primary.dark
    },
    subHeader: {
        fontWeight: 700,
        lineHeight: '20px',
        marginTop: '20px',
        color: theme.palette.light
    },
    content: {
        flexGrow: 1,
        padding: '0 20px'
    },
    listItem: {
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    listItemTextRoot:{
        marginTop: '2px',
        marginBottom: '2px',
        color: '#eee'
    },
    listItemTextInset: {
        paddingLeft: '15px'
    },
    listItemTextPrimary: {
        fontSize: '0.8rem'
    },
    orgSelectorMenuItem: {
        width: '240px'
    },
    userMenuLabel: {
        textTransform: 'none'
    },
    grow: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    alert: {
        backgroundColor: theme.palette.gray.light,
        color: '#efefef',
        borderRadius: '3px'
    }

})};

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.openOrgSelector = this.openOrgSelector.bind(this);
        this.closeOrgSelector = this.closeOrgSelector.bind(this);
        this.openUserMenu = this.openUserMenu.bind(this);
        this.closeUserMenu = this.closeUserMenu.bind(this);
        this.state = {
            orgSelectorAnchor: null,
            userMenuAnchor: null
        }
    }

    componentDidMount() {
    }

    openOrgSelector(e) {
        this.setState({ orgSelectorAnchor: e.currentTarget });
    }

    closeOrgSelector() {
        this.setState({ orgSelectorAnchor: null });
    }

    openUserMenu(e) {
        this.setState({ userMenuAnchor: e.currentTarget });
    }

    closeUserMenu() {
        this.setState({ userMenuAnchor: null });
    }

    selectOrg(orgId) {
        this.props.history.push('/' + orgId);
    }

    logout() {
        clearAuth();
        // this.props.logout();
        // this.props.history.push("/login");
    }

    render() {
        const { classes, userState } = this.props;
        console.log(this.props.match.params);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <span className={"logo-font logo-color"} style={{fontSize:"32px",fontWeight:700}}>awn<span style={{fontFamily:'arial',lineHeight:'32px',fontSize:'26px'}}>.</span><span style={{lineHeight:'32px',fontSize:'26px'}}>gg</span></span>
                        <div className={classes.grow}/>

                        {/*{ this.props.userState.isLoggedIn ? (<>*/}
                        {/*    <Button className={classes.userMenuLabel} onClick={()=>alert(this.props.userState.user.identity)}>*/}
                        {/*        View Identity*/}
                        {/*    </Button>*/}
                        {/*    <Button className={classes.userMenuLabel} onClick={this.openUserMenu}>*/}
                        {/*        <i className={"fa fa-user m-r-15"}/> {this.props.userState.user.name}*/}
                        {/*    </Button>*/}
                        {/*</>) : (<>*/}

                        {/*</>)*/}
                        {/*}*/}

                        <Menu
                            anchorEl={this.state.userMenuAnchor}
                            keepMounted
                            open={Boolean(this.state.userMenuAnchor)}
                            onClose={this.closeUserMenu}
                        >
                            <MenuItem onClick={this.closeUserMenu}>Profile</MenuItem>
                            <MenuItem onClick={() => { this.logout();this.closeUserMenu();}}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{paper:classes.drawerPaper}}
                >

                    {/*{ this.props.userState.isLoggedIn && this.props.userState.orgSelected && (<>*/}
                    {/*    <div className={classes.toolbar}/>*/}

                    {/*    <List component="nav">*/}
                    {/*        <ListItem button onClick={this.openOrgSelector} className={classes.listItem}>*/}
                    {/*            <ListItemText primary={userState.org.name} secondary={(userState.org.ownerId === userState.user.id) ? "Org Owner" : userState.role.name} />*/}
                    {/*            <ListItemSecondaryAction>*/}
                    {/*                <i className={"fa fa-caret-down"}/>*/}
                    {/*            </ListItemSecondaryAction>*/}
                    {/*        </ListItem>*/}
                    {/*    </List>*/}

                    {/*    <Menu*/}
                    {/*        anchorEl={this.state.orgSelectorAnchor}*/}
                    {/*        keepMounted*/}
                    {/*        open={Boolean(this.state.orgSelectorAnchor)}*/}
                    {/*        onClose={this.closeOrgSelector}*/}
                    {/*    >*/}
                    {/*        {this.props.userState.user.id && this.props.userState.user.orgs.map((org, index) => (=*/}
                    {/*            <MenuItem*/}
                    {/*                className={classes.orgSelectorMenuItem}*/}
                    {/*                key={org.id}*/}
                    {/*                onClick={() => {this.selectOrg(org.id);this.closeOrgSelector()}}*/}
                    {/*            >*/}
                    {/*                {org.name}*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Menu>*/}

                    {/*    <Divider />*/}

                    {/*    </>)*/}
                    {/*}*/}

                    <List component={"nav"} subheader={<ListSubheader component={"div"} className={classes.subHeader}>Org</ListSubheader>}>
                        <ListItem button component={Link} to={`/orgs/${this.props.match.params.orgId}/users`} className={classes.listItem}>
                            <ListItemText primary={"Users"} classes={{root:classes.listItemTextRoot,primary:classes.listItemTextPrimary, inset:classes.listItemTextInset}} inset/>
                        </ListItem>
                        <ListItem button component={Link} to={`/orgs/${this.props.match.params.orgId}/teams`} className={classes.listItem}>
                            <ListItemText primary={"Teams"} classes={{root:classes.listItemTextRoot,primary:classes.listItemTextPrimary, inset:classes.listItemTextInset}} inset/>
                        </ListItem>
                        <ListItem button component={Link} to={`/orgs/${this.props.match.params.orgId}/roles`} className={classes.listItem}>
                            <ListItemText primary={"Roles"} classes={{root:classes.listItemTextRoot,primary:classes.listItemTextPrimary, inset:classes.listItemTextInset}} inset/>
                        </ListItem>
                    </List>

                    <Divider />
                </Drawer>


                <main className={classes.content}>
                    <div className={classes.toolbar} style={{marginBottom:'15px'}}/>
                    { this.props.children }
                </main>

                {/*{ this.props.alerts && this.props.alerts.map((alert,idx) => (*/}
                {/*    <Snackbar*/}
                {/*        key={idx}*/}
                {/*        className={classes.alert}*/}
                {/*        anchorOrigin={{*/}
                {/*            vertical: 'bottom',*/}
                {/*            horizontal: 'left',*/}
                {/*        }}*/}
                {/*        open={true}*/}
                {/*        autoHideDuration={4000}*/}
                {/*        onClose={() => this.props.clearAlert(idx)}*/}
                {/*        ContentProps={{*/}
                {/*            'aria-describedby': 'message-id',*/}
                {/*        }}*/}
                {/*        action={alert.actions}*/}
                {/*    >*/}
                {/*        <SnackbarContent message={alert.message} className={classes.alert}/>*/}
                {/*    </Snackbar>*/}

                {/*))}*/}

            </div>
        )
    }
}

export default withStyles(styles)(withRouter(MainContainer));
