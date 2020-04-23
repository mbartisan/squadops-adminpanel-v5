import React, {Component} from 'react';

import PageView from "../../../layouts/PageView";
import EditEventMainInfo from "./EditEventMainInfo";
import EditEventDates from "./EditEventDates";
import RegistrationSections from "../../../../components/events/RegistrationSections/RegistrationSections";

import apiService from "../../../../services/api";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Stepper from "../../../../components/common/Stepper/Stepper";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";


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

class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.getEvent = this.getEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            event: {
                name: "",
                startAt: parseInt((Date.now() / 1000).toFixed()),
                endAt: parseInt((Date.now() / 1000).toFixed()),
                registrationStartAt: parseInt((Date.now() / 1000).toFixed()),
                registrationEndAt: parseInt((Date.now() / 1000).toFixed()),
                body: null,
                isPublished: 0,
                registrationSections: []
            },
            steps: [],
            activeStep: 0
        };

        this.state.steps.push({ label: 'Event Details', render: (props) => { console.log("Render main info", props); return <EditEventMainInfo onChange={this.handleChange} event={this.state.event} {...props} /> } });
        this.state.steps.push({ label: 'Event Dates', render: (props) => <EditEventDates onChange={this.handleChange} event={this.state.event} {...props} /> });
        this.state.steps.push({ label: 'Registration Sections', render: (props) => <RegistrationSections
                routeOrg={this.props.routeOrg}
                sections={this.state.event.registrationSections}
                onChange={(sections) => this.handleChange({ registrationSections: sections })}
                {...props}
            />
        });

    }

    componentDidMount() {
        if (this.props.eventId) this.getEvent(this.props.eventId);
    }

    async getEvent(id) {
        const event = await apiService.v5.events.retrieve(id);
        this.setState({ event });
    }

    handleChange(eventData) {
        const event = { ...this.state.event, ...eventData };
        this.setState({ event });
    }

    handleNext() {
        let step = this.state.activeStep + 1;
        if (step > this.state.steps.length) step = this.state.steps.length;
        this.setState({ activeStep: step });
    }

    handleBack() {
        let step = this.state.activeStep - 1;
        if (step < 0) step = 0;
        this.setState({ activeStep: step });
    }

    async createEvent(event) {
        if (event.id) await apiService.v5.events.update(event.id, { ...event });
        else await apiService.v5.events.create({ orgId: this.props.routeOrg.id, ...event });

        const str = (event.isPublished === 1) ? "Published" : "Saved (Draft)";
        console.log(str);
        alert(str);
        this.props.history.push(`/orgs/${this.props.routeOrg.id}/`)
    }

    render() {
        const {classes} = this.props;
        return (
            <PageView
                heading={`Edit Event: ${this.state.event.name}`}
            >

                <Stepper activeStep={this.state.activeStep} steps={this.state.steps} />
                { this.state.steps[this.state.activeStep] && this.state.steps[this.state.activeStep].render({ event: this.state.event }) }


                { this.state.activeStep === this.state.steps.length && (
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">
                                { this.state.event.name }
                            </Typography>
                            <Typography>
                                Event Starts At: { (new Date(this.state.event.startAt * 1000)).toISOString() }
                            </Typography>
                            <Typography>
                                Event Duration (Hours): { ((this.state.event.endAt - this.state.event.startAt) / 60 / 60).toFixed(2) }
                            </Typography>
                            <Typography>
                                Registrations Open At: { (new Date(this.state.event.registrationStartAt * 1000)).toISOString() }
                            </Typography>
                            <Typography>
                                Registrations Open For (Days): { ((this.state.event.registrationEndAt - this.state.event.registrationStartAt) / 60 / 60 / 24).toFixed(2) }
                            </Typography>
                        </CardContent>
                    </Card>
                ) }


                <div style={{ marginTop: '15px', background: '#11151e', borderRadius: '7px', width: 'fit-content', padding: '10px' }}>
                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className={classes.button} style={{ marginRight: '10px', padding: '6px 25px' }}>
                        Back
                    </Button>
                    { this.state.activeStep < this.state.steps.length && (
                        <Button
                            variant="contained"
                            color="default"
                            onClick={this.handleNext}
                            className={classes.button}
                            style={{ marginRight: '10px', padding: '6px 25px' }}
                        >
                            Next
                        </Button>
                    ) }
                    { this.state.activeStep === this.state.steps.length && (
                        <Button
                            variant="contained"
                            color="default"
                            onClick={()=>this.createEvent({ ...this.state.event, isPublished: 0 })}
                            className={classes.button}
                            style={{ marginRight: '10px', padding: '6px 25px' }}
                        >
                            Save as Draft
                        </Button>
                    ) }
                    { this.state.activeStep === this.state.steps.length && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={()=>this.createEvent({ ...this.state.event, isPublished: 1 })}
                            className={classes.button}
                            style={{ marginRight: '10px', padding: '6px 25px' }}
                        >
                            Publish
                        </Button>
                    ) }
                </div>

            </PageView>
        )
    }

}
export default withStyles(styles)(EditEvent);
