import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';

import {PageView} from "../../../components/core";
import {DataTable,DisplayDialog} from "../../../components/core";
import {OrgDialog} from "../../../components/accounts";

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
    PersonAdd as PersonAddIcon,
    Person as PersonIcon
} from "@material-ui/icons";

import apiService from "../../../services/api";
import {getDateString} from "../../../util";

const initialState = {
    orgs: [],
    selectedOrgId: null,
    dialog: null,
    owner: null
};

class OrgList extends Component {

    constructor(props) {
        super(props);
        this.getOrgs = this.getOrgs.bind(this);
        this.state = {...initialState};
    }

    componentDidMount() {
        this.getOrgs();
    }

    async getOrgs(query) {
        const orgs = await apiService.v5.accounts.orgs.list({ params: query });
        this.setState({ orgs });
    }

    openDialog(id) {
        this.setState({ dialog: id });
    }

    closeDialog() {
        this.setState({ dialog: null });
    }

    async loadOwner(ownerId) {
        const owner = await apiService.v5.accounts.users.retrieve(ownerId);
        this.setState({ owner });
    }

    render() {
        if (this.props.routeOrg.type !== "awn") return <Redirect to="/" />;

        const tableHead = [
            { id: 'id', label: "Id" },
            { id: 'name', label: "Name" },
            { id: 'identity', label: "Identity" },
            { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created', formatter: (value) => getDateString(new Date(value))},
        ];

        const tableActions = [
            { label: 'Create Org', icon: (<PersonAddIcon/>), onClick: (event) => { this.setState({ dialog: 'edit-org', selectedOrgId: null }) } },
        ];

        const rowActions = [
            { label: 'View Owner', icon: (<PersonIcon/>), onClick: (event, org) => { this.loadOwner(org.ownerId); this.setState({ dialog: 'view-owner', owner: null }) } },
            { label: 'Edit Org', icon: (<EditIcon/>), onClick: (event, org) => { this.setState({ dialog: 'edit-org', selectedOrgId: org.id }) } },
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
                label: 'Owner Name',
                type: "search",
                filter: (value) => {
                    if (value == null || value === "") return () => true;
                    return (record) => record.owner.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }
            },
        ];

        return (
            <PageView heading="Orgs">
                <DataTable
                    title="Orgs"
                    head={tableHead}
                    rows={this.state.orgs}
                    tableActions={tableActions}
                    rowActions={rowActions}
                    filters={filters}
                    defaultSort="createdAt"
                    selectable={false}
                />
                <OrgDialog open={this.state.dialog === 'edit-org'} orgId={this.state.selectedOrgId} onClose={(org)=>{this.closeDialog();this.getOrgs();}}/>
                <DisplayDialog open={this.state.dialog === 'view-owner'} title="Owner" onClose={()=>this.setState({ dialog: null })}>
                    { this.state.owner && (
                        <>
                            Name: <code>{ this.state.owner.name }</code><br/>
                            Email: <code>{ this.state.owner.email }</code><br/>
                            Identity: <code>{ this.state.owner.identity }</code>
                        </>
                    ) }
                </DisplayDialog>
            </PageView>
        )
    }

}
export default OrgList;
