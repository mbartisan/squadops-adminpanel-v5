import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import PageView from "../../../layouts/PageView";
import {DataTable} from "../../../../components/core";

import {
    Edit as EditIcon,
    DeviceHub as CreateClusterIcon,
    ChevronRight as ViewClusterIcon
} from "@material-ui/icons";

import apiService from "../../../../services/api";
import {getDateString} from "../../../../util";

const initialState = {
    templates: [],
    selectedEventId: null,
    dialog: null,
};

class ListTemplates extends Component {

    constructor(props) {
        super(props);
        this.getRegistrationTemplates = this.getRegistrationTemplates.bind(this);
        this.state = {
            ...initialState
        };
    }

    componentDidMount() {
        this.getRegistrationTemplates();
    }

    async getRegistrationTemplates(query = {}) {
        query = { orgId: this.props.routeOrg.id, ...query };
        const templates = await apiService.v5.registrationTemplates.list({ params: query });
        this.setState({ templates });
    }

    openDialog(id) {
        this.setState({ dialog: id });
    }

    closeDialog() {
        this.setState({ dialog: null });
    }

    render() {

        const tableHead = [
            { id: 'id', label: "Id" },
            { id: 'name', label: "Name" },
            { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created', formatter: (value) => getDateString(new Date(value * 1000))},
            { id: 'updatedAt', numeric: true, disablePadding: false, label: 'Last Updated', formatter: (value) => getDateString(new Date(value * 1000))},
        ];

        const tableActions = [
            { label: 'Create Template', icon: (<CreateClusterIcon/>), onClick: (event) => { this.props.history.push(`/orgs/${this.props.routeOrg.id}/registration-templates/create-template`) } },
        ];

        const rowActions = [
            { label: 'View Template', icon: (<ViewClusterIcon/>), onClick: (event, template) => { this.props.history.push(`/orgs/${this.props.routeOrg.id}/registration-templates/${template.id}`) } },
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
        ];

        return (
            <PageView heading="Registration Templates">
                <DataTable
                    title="Registration Templates"
                    head={tableHead}
                    rows={this.state.templates}
                    tableActions={tableActions}
                    rowActions={rowActions}
                    filters={filters}
                    defaultSort="createdAt"
                    selectable={false}
                />
            </PageView>
        )
    }

}
export default withRouter(ListTemplates);
