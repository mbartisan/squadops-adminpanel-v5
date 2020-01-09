import React, {Component} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';

import * as OrgService from "../../OrgService";
import * as UserService from "../../../User/UserService";

import PageView from "../../../Common/PageView/PageView";
import DataTable from "../../../Common/DataTable/DataTable";
import InputDialog from "../../../Common/InputDialog/InputDialog";

import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SecurityIcon from "@material-ui/icons/Security";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
    userRow: {
        // borderBottom: 'solid 1px #808a9b',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)'
        }
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
});

const initialState = {
    dialog: null,
    roles: []
};

class RoleList extends Component {

    constructor(props) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = {
            ...initialState,
            orgId: props.match.params.orgId
        };

        this.getRoles();
    }

    getRoles() {
        return OrgService.getRoles(this.state.orgId).then(roles => {
            this.setState({ roles });
        });
    }

    createRole({ name, color }) {
        return OrgService.createRole(this.state.orgId, { name, color }).then(() => this.getRoles());
    }

    openDialog(name) {
        return (evt) => this.setState({ dialog: name });
    }

    closeDialog() {
        return (evt) => this.setState({ dialog: null });
    }

    render() {
        const {classes} = this.props;
        return (<>
            <PageView
                heading={"Roles"}
                backLink={`/orgs/${this.props.match.params.orgId}/`}
                subHeading={"Roles are a way to track attributes across your organization."}
                nest={(<>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('createRole-0')}
                    >
                        Create Role
                    </Button>
                </>)}
            >
                <>

                    <Paper className={classes.paper}>
                        <List dense={true}>
                            { this.state.roles.map((role) => (
                                <ListItem key={role.id} button component={RouterLink} to={`/orgs/${this.props.match.params.orgId}/roles/${role.id}`} className={classes.userRow}>
                                    <ListItemText primary={role.name} secondary={`${role.users.length} User${(role.users.length !== 1) ? "s" : ""}`}/>
                                </ListItem>
                            )) }
                        </List>
                    </Paper>

                </>
            </PageView>


            <InputDialog open={this.state.dialog === "createRole-0"} title={"Enter Role Name"} onClose={(value)=>{
                this.createRole({ name: value });
                this.setState({ dialog: null });
            }}/>

        </>);
    }

}
export default withStyles(styles)(withRouter(RoleList));
