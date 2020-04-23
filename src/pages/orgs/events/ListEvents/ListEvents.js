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
import {getDateString,getTimeString} from "../../../../util";

const initialState = {
    events: [],
    selectedEventId: null,
    dialog: null,
};

class ListEvents extends Component {

    constructor(props) {
        super(props);
        this.getEvents = this.getEvents.bind(this);
        this.state = {
            ...initialState
        };
    }

    componentDidMount() {
        this.getEvents();
    }

    async getEvents(query = {}) {
        query = { orgId: this.props.routeOrg.id, ...query };
        const events = await apiService.v5.events.list({ params: query });
        this.setState({ events });
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
            { id: 'startAt', label: "Event Start", numeric: true, disablePadding: false, formatter: (value) => getDateString(new Date(value * 1000)), subLabel: (event) => getTimeString(new Date(event.startAt * 1000)) },
            { id: 'registrationStartAt', label: "Registration Start", numeric: true, disablePadding: false, formatter: (value) => getDateString(new Date(value * 1000)) },
            { id: 'isPublished', label: "Status", formatter: (isPublished) => (isPublished === 1) ? 'Published' : 'Draft' },
            { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created', formatter: (value) => getDateString(new Date(value * 1000))},
        ];

        const tableActions = [
            { label: 'Create Event', icon: (<CreateClusterIcon/>), onClick: (event) => { this.props.history.push(`/orgs/${this.props.routeOrg.id}/events/create-event`) } },
        ];

        const rowActions = [
            { label: 'Edit Event', icon: (<EditIcon/>), onClick: (event, cluster) => { this.setState({ dialog: 'edit-cluster', selectedClusterId: cluster.id }) } },
            { label: 'View Event', icon: (<ViewClusterIcon/>), onClick: (event, cluster) => { this.props.history.push(`/orgs/${this.props.routeOrg.id}/events/${cluster.id}`) } },
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
                label: 'Start Date',
                type: "search",
                filter: (value) => {
                    // todo: filter by date
                    if (value == null || value === "") return () => true;
                    return (record) => record.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                }
            },
        ];

        return (
            <PageView heading="Events">
                <DataTable
                    title="Events"
                    head={tableHead}
                    rows={this.state.events}
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
export default withRouter(ListEvents);
