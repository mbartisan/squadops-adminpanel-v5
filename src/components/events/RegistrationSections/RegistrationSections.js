import React, {Component} from 'react';

import InputDialog from "../../core/InputDialog/InputDialog";
import SortableList from "../../core/SortableList/SortableList";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {DragHandle as DraghandleIcon} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import apiService from "../../../services/api";
import ListItem from "@material-ui/core/ListItem";
import AsyncSelectDialog from "../../core/AsyncSelectDialog/AsyncSelectDialog";
import {getDateString} from "../../../util";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";

const SortableComponent = ({ item: section, index, onChange }) => {

    const [registrationLimit, setRegistrationLimit] = React.useState(section.registrationLimit);
    const [useWaitlist, setUseWaitlist] = React.useState(section.useWaitlist);

    const handleRegistrationLimitChange = (evt) => {
        const { value } = evt.target;
        let registrationLimit = parseInt(value);
        if (isNaN(registrationLimit) || registrationLimit < 0) registrationLimit = 1;
        setRegistrationLimit(registrationLimit);
        if (onChange) onChange({ ...section, registrationLimit, useWaitlist }, index)
    };

    const handleUseWaitlistChange = (evt) => {
        const { checked } = evt.target;
        const useWaitlist = checked ? 1 : 0;
        setUseWaitlist(useWaitlist);
        if (onChange) onChange({ ...section, registrationLimit, useWaitlist }, index)
    };

    return (
        <Card style={{marginTop:'10px'}}>
            <CardContent style={{padding:'5px 15px'}}>
                <Grid container spacing={1}>
                    <Grid item style={{width:'40px',marginTop:'10px'}}>
                        <DraghandleIcon />
                    </Grid>
                    <Grid item xs={5} style={{marginTop:'10px'}}>
                        { section.name }
                    </Grid>
                    <Grid item xs>
                        <TextField
                            label="Registration Limit"
                            variant="outlined"
                            margin="dense"
                            size="small"
                            style={{margin:'0',marginTop:'5px'}}
                            inputProps={{style:{padding:'5px'}}}
                            onChange={handleRegistrationLimitChange}
                            value={registrationLimit}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormControlLabel
                            control={<Switch checked={useWaitlist === 1} onChange={handleUseWaitlistChange} name="useWaitlist" />}
                            label="Use Waitlist"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const AsyncSelectListItemComponent = ({ data: template, onClose }) => {
    return (
        <ListItem button onClick={() => onClose(template)} key={template.id}>
            <ListItemText primary={template.name} secondary={"Last Modified " + getDateString(new Date(((template.updatedAt && template.updatedAt > 0) ? template.updatedAt : template.createdAt) * 1000)) } />
        </ListItem>
    )
};

class RegistrationSections extends Component {

    constructor(props) {
        super(props);
        this.setSections = this.setSections.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSortableItemComponentChange = this.handleSortableItemComponentChange.bind(this);
        this.state = {
            sections: [],
            dialog: null
        };
        if (props.sections) this.state.sections = props.sections;
    }

    handleSort(sortedSections) {
        this.setSections(sortedSections.map((section, idx) => ({ ...section, sort: idx })));
    }

    handleSortableItemComponentChange(updatedSection, index) {
        this.setSections(this.state.sections.map((section, idx) => (idx === index) ? updatedSection : section));
    }

    setSections(sections, otherProps = {}) {
        if (this.props.onChange) this.props.onChange(sections);
        this.setState({ sections, ...otherProps });
    }

    render() {
        return (<>
            <Card>
                <CardContent>
                    <Typography variant="subtitle1">
                        Registration Sections
                    </Typography>
                    <Divider />

                    <Grid container spacing={1} justify="space-between" style={{marginTop:'15px'}} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={()=>this.setState({ dialog: 'create-section' })}
                                style={{ marginRight: '10px', padding: '6px 25px' }}
                            >
                                Create Section
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={()=>this.setState({ dialog: 'load-template' })}
                                style={{ marginRight: '10px', padding: '6px 25px' }}
                            >
                                Load Template
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={()=>this.setState({ dialog: 'save-template' })}
                                style={{ marginRight: '10px', padding: '6px 25px' }}
                                disabled={!this.state.sections || this.state.sections.length === 0}
                            >
                                Save Template
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <SortableList
                items={this.state.sections.sort((a, b) => a.sort - b.sort)}
                onSort={this.handleSort}
                ItemComponent={SortableComponent}
                ItemComponentProps={{ onChange: this.handleSortableItemComponentChange }}
            />

            <InputDialog open={this.state.dialog === 'create-section'} onClose={(name) => {
                if (!name) return this.setState({ dialog: null });
                this.setSections([ ...this.state.sections, { name, registrationLimit: 10, useWaitlist: 0 } ], { dialog: null })
            }} label="Section Name" title="Create Section"/>

            <AsyncSelectDialog
                open={this.state.dialog === 'load-template'}
                title="Select Template"
                loadData={() => apiService.v5.registrationTemplates.list({ orgId: this.props.routeOrg.id })}
                ListItemComponent={AsyncSelectListItemComponent}
                onClose={({ id }) => {
                    this.setSections([], { dialog: null });
                    if (id) {
                        apiService.v5.registrationTemplates.retrieve(id).then(template => {
                            this.setSections(template.template);
                        })
                    }
                }}
            />

            <Dialog onClose={() => this.setState({ dialog: null })} open={this.state.dialog === 'save-template'}>
                <DialogTitle>Save Template:</DialogTitle>
                <List style={{minWidth:'220px'}}>
                    <ListItem button onClick={()=>this.setState({ dialog: 'create-template' })} >
                        <ListItemText primary="Create New Template" />
                    </ListItem>
                    <ListItem button onClick={()=>this.setState({ dialog: 'overwrite-template' })} >
                        <ListItemText primary="Overwrite Existing Template" />
                    </ListItem>
                </List>
            </Dialog>

            <InputDialog open={this.state.dialog === 'create-template'} onClose={(name) => {
                if (!name || this.state.sections.length === 0) return this.setState({ dialog: null });
                const orgId = this.props.routeOrg.id;
                const template = this.state.sections.map((section, idx) => {
                    return {
                        sort: idx,
                        name: section.name,
                        registrationLimit: section.registrationLimit,
                        useWaitlist: section.useWaitlist,
                    }
                });
                apiService.v5.registrationTemplates.create({ orgId, name, template }).then(() => alert("Template saved."));
                return this.setState({ dialog: null });
            }} label="Template Name" title="Create new Template"/>

            <AsyncSelectDialog
                open={this.state.dialog === 'overwrite-template'}
                title="Overwrite Template"
                loadData={() => apiService.v5.registrationTemplates.list({ orgId: this.props.routeOrg.id })}
                ListItemComponent={AsyncSelectListItemComponent}
                onClose={({ id }) => {
                    this.setState({ dialog: null });
                    if (id) {
                        apiService.v5.registrationTemplates.update(id, { template: this.state.sections }).then(() => alert("Template saved."));
                    }
                }}
            />
        </>)
    }

}
export default RegistrationSections;
