import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AppLogo from "../AppLogo/AppLogo.js";
import {logout} from "../../../../services/auth/index.js";
import {withRouter} from "react-router-dom";

const styles = (theme) => {
    return ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#0b1119', //0b1119 0b1c24
            borderBottom: 'solid 1px ' + theme.palette.primary.dark
        },
        userMenuLabel: {
            textTransform: 'none'
        },
        grow: {
            flexGrow: 1,
        },
    });
};

class AppTopBar extends Component {

    constructor(props) {
        super(props);
        this.openUserMenu = this.openUserMenu.bind(this);
        this.closeUserMenu = this.closeUserMenu.bind(this);
        this.state = {
            userMenuAnchor: null
        }
    }

    openUserMenu(e) {
        this.setState({ userMenuAnchor: e.currentTarget });
    }

    closeUserMenu() {
        this.setState({ userMenuAnchor: null });
    }

    render() {
        const { classes, authUser } = this.props;
        return (
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <AppLogo />
                    <div className={classes.grow}/>

                    { authUser && (<>
                        <Button className={classes.userMenuLabel} onClick={()=>alert(authUser.identity)}>
                            View Identity
                        </Button>
                        <Button className={classes.userMenuLabel} onClick={this.openUserMenu}>
                            <i className={"fa fa-user m-r-15"}/> {authUser.name}
                        </Button>
                    </>) }

                    <Menu
                        anchorEl={this.state.userMenuAnchor}
                        keepMounted
                        open={Boolean(this.state.userMenuAnchor)}
                        onClose={this.closeUserMenu}
                    >
                        {/*<MenuItem onClick={this.closeUserMenu}>Profile</MenuItem>*/}
                        <MenuItem onClick={() => {
                            this.props.history.push('/logout');
                            this.closeUserMenu();
                        }}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(withRouter(AppTopBar));
