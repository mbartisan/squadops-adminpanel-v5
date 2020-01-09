import React, {Component} from 'react';
import { connect } from 'react-redux';
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

const styles = (theme) => ({
});

const initialState = {
    dialog: null,
    users: [],
    roles: [],
    teams: [],
    createUser: {}
};

class UserList extends Component {

    constructor(props) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        console.log(props);
        this.state = {
            ...initialState,
            orgId: props.match.params.orgId
        };

        this.getUsers();
        this.getRoles();
        this.getTeams();
    }

    getUsers() {
        return OrgService.getUsers(this.state.orgId).then(users => {
            console.log("Got users: ", users);
            this.setState({ users });
        });
    }

    getRoles() {
        return OrgService.getRoles(this.state.orgId).then(roles => {
            this.setState({ roles });
        });
    }

    getTeams() {
        return OrgService.getTeams(this.state.orgId).then(teams => {
            this.setState({ teams });
        });
    }

    createUser({ name, email }) {
        return UserService.createUser({ name, email });
    }

    addUser({ userId }) {
        return OrgService.createUser(this.state.orgId, { userId }).then(() => this.getUsers());
    }

    createTeam({ name, color, icon }) {
        return OrgService.createTeam(this.state.orgId, { name, color, icon }).then(() => this.getTeams());
    }

    createRole({ name }) {
        return OrgService.createRole(this.state.orgId, { name }).then(() => this.getRoles());
    }

    openDialog(name) {
        return (evt) => this.setState({ dialog: name });
    }

    closeDialog() {
        return (evt) => this.setState({ dialog: null });
    }

    render() {
        return (<>
            <PageView
                heading={"Users"}
                backLink={`/orgs/${this.props.match.params.orgId}/`}
                subHeading={(<small>{ this.state.users.length } User{ ( this.state.users.length !== 1) ? "s": "" }</small>)}
                nest={(<>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('createUser-0')}
                    >
                        Create User
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('addUser-0')}
                    >
                        Add User
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('createTeam-0')}
                    >
                        Create Team
                    </Button>
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

                    <Box component="div">
                        <DataTable
                            style={{marginTop:'10px'}}
                            title={"Org Users"}
                            dense={true}
                            keyProp={"userId"}
                            head={[
                                { id: 'name', numeric: false, disablePadding: true, label: 'Name',
                                    subLabel: (row) => <i><small>Identity: {row.identity}</small></i> },
                                { id: 'id', numeric: true, disablePadding: false, label: 'id' },
                                { id: 'addedAt', numeric: true, disablePadding: false, label: 'Added On', formatter: (value) => {
                                        const d = new Date(value * 1000);
                                        return d.toISOString();
                                    } }
                            ]}
                            rows={this.state.users}
                            rowStyle={null}
                            defaultSort={"createdAt"}
                            defaultSortInverted={false}
                            selectable={false}
                            rowsPerPage={5}
                            rowActions={[
                                { label: "Remove User", icon: (<ChevronRightIcon/>), onClick: (e, row) => this.openDialog('removeUser') },
                                { label: "Select User", icon: (<ChevronRightIcon/>), onClick: (e, row) => this.openDialog('removeUser') },
                            ]}
                            tableActions={[
                                // { label: "Rename List", icon: (<EditIcon/>), onClick: () => this.openEditLabelDialog() },
                            ]}
                            filters={[
                                {
                                    label: 'Teams', type: "option",
                                    options: this.state.teams.map(team => ({ label: team.name, value: team.id })),
                                    filter: (value) => (row) => (!value) ? true : row.teams.includes(value)
                                },
                                {
                                    label: 'Roles', type: "option",
                                    options: this.state.roles.map(roles => ({ label: roles.name, value: roles.id })),
                                    filter: (value) => (row) => row.roles.includes(value)
                                },
                                {
                                    label: 'Name', type: "search",
                                    filter: (value) => (row) => (!value) ? true : row.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                                },
                            ]}
                        />
                    </Box>
                </>
            </PageView>

            <InputDialog open={this.state.dialog === "createUser-0"} title={"Create New User: Enter Name"} onClose={(value)=>this.setState((state) => ({ createUser: { ...state.createUser, name: value }, dialog: 'createUser-1' }))}/>
            <InputDialog open={this.state.dialog === "createUser-1"} title={"Create New User: Enter Email"} onClose={(value)=>{
                this.createUser({ ...this.state.createUser, email: value }).then(user => alert("Created " + user.id + ": " + user.name));
                this.setState({ createUser: {}, dialog: null });
            }}/>

            <InputDialog open={this.state.dialog === "addUser-0"} title={"Add Org User: Enter UserId"} onClose={(value)=>{
                this.addUser({ userId: value });
                this.setState({ dialog: null });
            }}/>

            <InputDialog open={this.state.dialog === "createTeam-0"} title={"Create New Team: Enter Name"} onClose={(value)=>{
                this.createTeam({ name: value }).then(team => alert("Created " + team.id + ": " + team.name));
                this.setState({ dialog: null });
            }}/>

            <InputDialog open={this.state.dialog === "createRole-0"} title={"Create New Role: Enter Name"} onClose={(value)=>{
                this.createRole({ name: value }).then(role => alert("Created " + role.id + ": " + role.name));
                this.setState({ dialog: null });
            }}/>

        </>);
    }

}
export default withStyles(styles)(withRouter(UserList));
