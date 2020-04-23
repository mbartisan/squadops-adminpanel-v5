import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';

import {PageView} from "../../../components/core";
import {DataTable} from "../../../components/core";
import {UserDialog} from "../../../components/accounts";

import {
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Tooltip,
    withStyles
} from "@material-ui/core";

import {
    Edit as EditIcon,
    PersonAdd as PersonAddIcon
} from "@material-ui/icons";

import apiService from "../../../services/api";
import {getDateString} from "../../../util";

class UserList extends Component {

    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this);
        this.state = {
            users: [],
            selectedUserId: null,
            dialog: null
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers(query) {
        apiService.v5.accounts.users.list(query).then(users => {
            this.setState({ users });
        });
    }

    openDialog(id) {
        this.setState({ dialog: id });
    }

    closeDialog() {
        this.setState({ dialog: null });
    }

    render() {
        if (this.props.routeOrg.type !== "awn") return <Redirect to="/" />;

        const tableHead = [
            { id: 'id', label: "Id" },
            { id: 'name', label: "Name" },
            { id: 'email', label: "Email" },
            { id: 'identity', label: "Identity" },
            { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created', formatter: (value) => getDateString(new Date(value))},
        ];

        const tableActions = [
            { label: 'Create User', icon: (<PersonAddIcon/>), onClick: (event, user) => { this.setState({ dialog: 'edit-user', selectedUserId: user.id }) } },
        ];

        const rowActions = [
            { label: 'Edit User', icon: (<EditIcon/>), onClick: (event, user) => { this.setState({ dialog: 'edit-user', selectedUserId: user.id }) } },
        ];

        const filters = [
            {
                label: 'Name',
                type: "search",
                filter: (value) => {
                    if (value == null || value === "") return () => true;
                    return (record) => record.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }
            },
            {
                label: 'Email',
                type: "search",
                filter: (value) => {
                    if (value == null || value === "") return () => true;
                    return (record) => record.email.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }
            },
            {
                label: 'Identity',
                type: "search",
                filter: (value) => {
                    if (value == null || value === "") return () => true;
                    return (record) => record.identity.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }
            },
        ];

        return (
            <PageView heading="Users">
                <DataTable
                    title="Users"
                    head={tableHead}
                    rows={this.state.users}
                    tableActions={tableActions}
                    rowActions={rowActions}
                    filters={filters}
                    defaultSort="createdAt"
                    selectable={false}
                />
                <UserDialog open={this.state.dialog === 'create-user'} userId={null} onClose={(user)=>{this.closeDialog();this.getUsers();}}/>
                <UserDialog open={this.state.dialog === 'edit-user'} userId={this.state.selectedUserId} onClose={(user)=>{this.closeDialog();this.getUsers();}}/>
            </PageView>
        )
    }

}
export default UserList;
