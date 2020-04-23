import React, {Component} from 'react';

import DateFnsUtils from "@date-io/date-fns";
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class EventViewDates extends Component {

    constructor(props) {
        super(props);
        this.handleQuickDateChange = this.handleQuickDateChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.state = {
            eventData: {
                startAt: null,
                endAt: null,
                registrationStartAt: null,
                registrationEndAt: null,
            },
            startAtDate: new Date(),
            endAtDate: new Date(),
            registrationStartAtDate: new Date(),
            registrationEndAtDate: new Date(),
            activeTab: 0
        };

        this.state.eventData = Object.keys(this.state.eventData).reduce((acc, key) => {
            acc[key] = (props.event && props.event[key]) ? props.event[key] : this.state.eventData[key];
            return acc;
        }, {});

        this.state.startAtDate = new Date(this.state.eventData.startAt * 1000 || null);
        this.state.endAtDate = new Date(this.state.eventData.endAt * 1000 || null);
        this.state.registrationStartAtDate = new Date(this.state.eventData.registrationStartAt * 1000 || null);
        this.state.registrationEndAtDate = new Date(this.state.eventData.registrationEndAt * 1000 || null);
    }

    componentDidMount() {
        if (this.props.onChange) this.props.onChange(this.state.eventData); // pass defaults to parent component
    }

    componentWillUnmount() {
    }

    handleQuickDateChange(propName) {
        return (minutes) => {
            const date = new Date(Date.now() + (minutes * 60 * 1000));
            this.handleDatePickerChange(propName)(date);
        };
    }

    handleDatePickerChange(propName) {
        return (date) => {
            const eventData = { ...this.state.eventData, [propName]: parseInt((date.getTime() / 1000).toFixed(0)) };
            this.setEventData(eventData, { [propName + 'Date']: date });
        }
    }

    setEventData(eventData, otherProps) {
        eventData = { ...this.state.eventData, ...eventData };
        this.setState({ eventData, ...otherProps });
        if (this.props.onChange) this.props.onChange(eventData);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Tabs
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(evt, val)=>{this.setState({ activeTab: val })}}
                        style={{marginTop: '-15px',marginBottom:'15px'}}
                    >
                        <Tab label="Squad Ops Preset" />
                        <Tab label="Custom Dates" />
                    </Tabs>
                    <Typography variant="subtitle1">
                        Event Dates
                    </Typography>


                    <div style={{margin: '10px'}}>
                        <Typography variant="subtitle1">
                            Event Start:
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker value={this.state.startAtDate} onChange={this.handleDatePickerChange('startAt')} style={{marginLeft: '20px'}} />
                            </MuiPickersUtilsProvider>
                        </Typography>
                    </div>

                    { this.state.activeTab === 0 && (
                        <>
                            <Divider style={{marginTop: '10px',marginBottom: '10px'}}/>
                            <Button onClick={() => {
                                const hours = 1;
                                const endAt = parseInt((this.state.startAtDate.getTime() / 1000 + (hours * 60 * 60)).toFixed());
                                const endAtDate = new Date(endAt * 1000);
                                const registrationStartAt = parseInt((Date.now() / 1000).toFixed());
                                const registrationStartAtDate = new Date(registrationStartAt * 1000);
                                const registrationEndAt = parseInt((this.state.startAtDate.getTime() / 1000 + (0.5 * 60 * 60)).toFixed());
                                const registrationEndAtDate = new Date(registrationEndAt * 1000);
                                this.setEventData({ endAt, registrationStartAt, registrationEndAt }, { endAtDate, registrationStartAtDate, registrationEndAtDate });
                            }} color="primary">
                                SOTT
                            </Button>
                            <Button onClick={() => {
                                const hours = 3;
                                const endAt = parseInt((this.state.startAtDate.getTime() / 1000 + (hours * 60 * 60)).toFixed());
                                const endAtDate = new Date(endAt * 1000);
                                const registrationStartAt = parseInt((Date.now() / 1000).toFixed());
                                const registrationStartAtDate = new Date(registrationStartAt * 1000);
                                const registrationEndAt = parseInt((this.state.startAtDate.getTime() / 1000 + (0.5 * 60 * 60)).toFixed());
                                const registrationEndAtDate = new Date(registrationEndAt * 1000);
                                this.setEventData({ endAt, registrationStartAt, registrationEndAt }, { endAtDate, registrationStartAtDate, registrationEndAtDate });
                            }} color="primary">
                                Operation
                            </Button>
                            <Button onClick={() => {
                                const hours = 2;
                                const endAt = parseInt((this.state.startAtDate.getTime() / 1000 + (hours * 60 * 60)).toFixed());
                                const endAtDate = new Date(endAt * 1000);
                                const registrationStartAt = parseInt((Date.now() / 1000).toFixed());
                                const registrationStartAtDate = new Date(registrationStartAt * 1000);
                                const registrationEndAt = parseInt((this.state.startAtDate.getTime() / 1000 + (0.5 * 60 * 60)).toFixed());
                                const registrationEndAtDate = new Date(registrationEndAt * 1000);
                                this.setEventData({ endAt, registrationStartAt, registrationEndAt }, { endAtDate, registrationStartAtDate, registrationEndAtDate });
                            }} color="primary">
                                Fire Fight
                            </Button>
                            <Button onClick={() => {
                                const hours = 3;
                                const endAt = parseInt((this.state.startAtDate.getTime() / 1000 + (hours * 60 * 60)).toFixed());
                                const endAtDate = new Date(endAt * 1000);
                                const registrationStartAt = parseInt((Date.now() / 1000).toFixed());
                                const registrationStartAtDate = new Date(registrationStartAt * 1000);
                                const registrationEndAt = parseInt((this.state.startAtDate.getTime() / 1000 + (0.5 * 60 * 60)).toFixed());
                                const registrationEndAtDate = new Date(registrationEndAt * 1000);
                                this.setEventData({ endAt, registrationStartAt, registrationEndAt }, { endAtDate, registrationStartAtDate, registrationEndAtDate });
                            }} color="primary">
                                MARS
                            </Button>
                        </>
                    )}

                    { this.state.activeTab === 1 && (
                        <>
                            <div style={{margin: '10px'}}>
                                <Typography variant="subtitle1">
                                    Event End:
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker value={this.state.endAtDate} onChange={this.handleDatePickerChange('endAt')} style={{marginLeft: '20px'}} />
                                    </MuiPickersUtilsProvider>
                                </Typography>

                                <Button onClick={()=>{this.handleDatePickerChange('endAt')(new Date(this.state.startAtDate.getTime() + (30 * 60 * 1000)))}} color="primary">
                                    30 Minutes from Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('endAt')(new Date(this.state.startAtDate.getTime() + (60 * 60 * 1000)))}} color="primary">
                                    1 Hour from Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('endAt')(new Date(this.state.startAtDate.getTime() + (3 * 60 * 60 * 1000)))}} color="primary">
                                    3 Hours from Event Start
                                </Button>
                            </div>
                            <Divider />

                            <div style={{margin: '10px'}}>
                                <Typography variant="subtitle1">
                                    Registrations Start At:
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker value={this.state.registrationStartAtDate} onChange={this.handleDatePickerChange('registrationStartAt')} style={{marginLeft: '20px'}} />
                                    </MuiPickersUtilsProvider>
                                </Typography>

                                <Button onClick={()=>{this.handleDatePickerChange('registrationStartAt')(new Date())}} color="primary">
                                    Now
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationStartAt')(new Date(this.state.startAtDate.getTime() - (24 * 60 * 60 * 1000)))}} color="primary">
                                    24 Hours before Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationStartAt')(new Date(this.state.startAtDate.getTime() - (48 * 60 * 60 * 1000)))}} color="primary">
                                    48 Hours before Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationStartAt')(new Date(this.state.startAtDate.getTime() - (72 * 60 * 60 * 1000)))}} color="primary">
                                    72 Hours before Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationStartAt')(new Date(this.state.startAtDate.getTime() - (7 *24 * 60 * 60 * 1000)))}} color="primary">
                                    1 Week before Event Start
                                </Button>
                            </div>
                            <Divider />


                            <div style={{margin: '10px'}}>
                                <Typography variant="subtitle1">
                                    Registrations End At:
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker value={this.state.registrationEndAtDate} onChange={this.handleDatePickerChange('registrationEndAt')} style={{marginLeft: '20px'}} />
                                    </MuiPickersUtilsProvider>
                                </Typography>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationEndAt')(new Date(this.state.endAtDate.getTime()))}} color="primary">
                                    Event End
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationEndAt')(new Date(this.state.startAtDate.getTime()))}} color="primary">
                                    Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationEndAt')(new Date(this.state.startAtDate.getTime() - (30 * 60 * 1000)))}} color="primary">
                                    30 Minutes before Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationEndAt')(new Date(this.state.startAtDate.getTime() - (60 * 60 * 1000)))}} color="primary">
                                    1 Hour before Event Start
                                </Button>
                                <Button onClick={()=>{this.handleDatePickerChange('registrationEndAt')(new Date(this.state.startAtDate.getTime() - (4 * 60 * 60 * 1000)))}} color="primary">
                                    4 Hours before Event Start
                                </Button>
                            </div>
                        </>
                    )}

                </CardContent>
            </Card>
        )
    }

}
export default EventViewDates;
