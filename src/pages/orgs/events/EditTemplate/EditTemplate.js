import React, {Component} from 'react';

import PageView from "../../../layouts/PageView";
import RegistrationSections from "../../../../components/events/RegistrationSections/RegistrationSections";

import apiService from "../../../../services/api";
import {withStyles} from "@material-ui/core/styles";


const styles = (theme) => ({
    card: {
        width: '100%'
    },
    content: {
        minWidth: '260px'
    },
    resultList: {
        width:'100%',
        maxHeight:'200px',
        padding:'10px 0',
        overflowY:'auto',
        overflowX:'hidden'
    },
    resultRow: {
        cursor: 'pointer',
        padding: '0 20px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.14)'
        }
    },
});

class EditTemplate extends Component {

    constructor(props) {
        super(props);
        this.getTemplate = this.getTemplate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            template: {
                name: "",
                template: []
            },
        };

    }

    componentDidMount() {
        if (this.props.templateId) this.getTemplate(this.props.templateId);
    }

    async getTemplate(id) {
        const template = await apiService.v5.events.registrationTemplates.retrieve(id);
        this.setState({ template });
    }

    handleChange(sections) {
        const template = { ...this.state.template, template: sections };
        this.setState({ template });
    }

    render() {
        const {classes} = this.props;
        return (
            <PageView
                heading={`Edit Template: ${this.state.template.name}`}
            >

                <RegistrationSections
                    routeOrg={this.props.routeOrg}
                    sections={this.state.template.template}
                    onChange={this.handleChange}
                />

            </PageView>
        )
    }

}
export default withStyles(styles)(EditTemplate);
