import React, {Component} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';

import * as OrgService from "../../OrgService";
import * as UserService from "../../../User/UserService";

import PageView from "../../../Common/PageView/PageView";
import DataTable from "../../../Common/DataTable/DataTable";
import InputDialog from "../../../Common/InputDialog/InputDialog";
import UserListDialog from "../../Users/UserListDialog/UserListDialog";

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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {RemoveCircleOutline} from "@material-ui/icons";
import UserRoleChips from "../../components/UserRoleChips/UserRoleChips";

const styles = (theme) => ({
    root: {
    },
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
    verticalAlign: {
        margin: 'auto 5px'
    },
    icon: {
        width: '45px',
        height: '45px',
        display: 'inline-block',
        // background: '#808a9b',
        borderRadius: '100px',
        padding: '5px'
    },
    img: {
        width: '35px',
        height: '35px',
    },
    userActionButton: {
    },
    removeUser: {
        marginLeft: '35px',
        color: theme.palette.primary.main
    }
});

const initialState = {
    dialog: null,
    team: {},
    allRoles: [],
    users: [],
    selectedUser: {}
};

class TeamView extends Component {

    constructor(props) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = {
            ...initialState,
            orgId: props.match.params.orgId,
            teamId: props.match.params.teamId,
        };

        this.getTeam();
        this.getRoles();
        this.getUsers();
    }

    getTeam() {
        return OrgService.getTeam(this.state.orgId, this.state.teamId).then(([team]) => {
            this.setState({ team });
        });
    }

    getRoles() {
        return OrgService.getRoles(this.state.orgId).then((allRoles) => {
            this.setState({ allRoles });
        });
    }

    getUsers() {
        return OrgService.getTeamUsers(this.state.orgId, this.state.teamId).then(users => {
            this.setState({ users });
        });
    }

    addUser({ userId, isLeader }) {
        return OrgService.createTeamUser(this.state.orgId, this.state.teamId, { userId, isLeader }).then(() => this.getUsers());
    }

    openDialog(name) {
        return (evt) => this.setState({ dialog: name });
    }

    closeDialog() {
        return (evt) => this.setState({ dialog: null });
    }

    renderUserActions(user) {
        const {classes,userState} = this.props;
        return (
            <>
                <Tooltip title="Roles">
                    <IconButton
                        className={classes.userActionButton}
                        onClick={() => {
                            this.setState({ dialog: 'removeUser-0', selectedUser: user });
                        } }>
                        <SecurityIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Member">
                    <IconButton
                        className={classes.removeUser}
                        onClick={() => {
                            this.setState({ dialog: 'removeUser-0', selectedUser: user });
                        } }>
                        <RemoveCircleOutline />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    render() {
        const {classes} = this.props;
        return (<>
            <PageView
                heading={"Team: " + this.state.team.name}
                backLink={`/orgs/${this.props.match.params.orgId}/teams`}
                subHeading={(<small>{ this.state.users.length } Member{ ( this.state.users.length !== 1) ? "s": "" }</small>)}
                nest={(<>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('addTeamUser-0')}
                    >
                        Add Team Member
                    </Button>
                </>)}
            >
                <>
                    <Paper className={classes.paper}>
                        <List dense={true}>
                            { this.state.users.map((user) => (
                                <ListItem key={user.id} className={classes.userRow}>
                                    <ListItemText primary={`${(user.isTeamLeader) ? <SecurityIcon /> : ""}${user.name}`} secondary={<UserRoleChips orgId={this.props.match.params.orgId} user={user}/>} />
                                    { this.renderUserActions(user) }
                                </ListItem>
                            )) }
                        </List>
                    </Paper>

                </>
            </PageView>

            <UserListDialog
                orgId={this.state.orgId}
                open={this.state.dialog === "addTeamUser-0"}
                onClose={(user)=>{
                    if (user) this.addUser({ userId: user.id });
                    this.setState({ dialog: null });
                }}
                filter={(user)=>this.state.users.findIndex(u=>u.id===user.id)===-1}
            />

        </>);
    }

}
export default withStyles(styles)(withRouter(TeamView));
