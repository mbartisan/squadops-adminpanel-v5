import React, {Component} from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

class EventViewMainInfo extends Component {

    constructor(props) {
        super(props);
        this.applyEventData = this.applyEventData.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            eventData: {
                name: null,
                body: null
            },
            editorState: EditorState.createEmpty(),
        };
    }

    applyEventData() {
        const eventData = Object.keys(this.state.eventData).reduce((acc, key) => {
            acc[key] = (this.props.event && this.props.event[key]) ? this.props.event[key] : this.state.eventData[key];
            return acc;
        }, {});

        const contentState = ContentState.createFromBlockArray(htmlToDraft(eventData.body || "").contentBlocks);
        this.setState({
            eventData,
            editorState:  EditorState.createWithContent(contentState)
        });
        if (this.props.onChange) this.props.onChange(this.state.eventData); // pass defaults to parent component
    }

    componentDidMount() {
        this.applyEventData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.event || {}) !== JSON.stringify(this.props.event || {})) {
            this.applyEventData();
        }
    }

    handleEditorStateChange(editorState) {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const eventData = { ...this.state.eventData, body: html };
        this.setState({ editorState, eventData });
        if (this.props.onChange) this.props.onChange(eventData);
    }

    handleChange(evt) {
        const { name, value, type, checked } = evt.target;
        const eventData = { ...this.state.eventData, [name]: (type === "checkbox") ? checked : value };
        this.setState({ eventData });
        if (this.props.onChange) this.props.onChange(eventData);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="subtitle1">
                        Event Details
                    </Typography>
                    <div style={{margin: '10px'}}>
                        <TextField
                            margin="dense"
                            label="Event Name"
                            name="name"
                            variant="outlined"
                            value={this.state.eventData.name || ""}
                            onChange={this.handleChange}
                            fullWidth
                            style={{marginBottom:'15px'}}
                        />
                    </div>

                    <Divider />

                    <div style={{margin: '10px'}}>
                        <Typography variant="subtitle1" style={{marginBottom:'10px'}}>
                            Event Brief
                        </Typography>
                        <Editor
                            editorState={this.state.editorState}
                            editorStyle={{ background: '#fff', minHeight: '300px', color: '#000', padding: '10px' }}
                            onEditorStateChange={this.handleEditorStateChange}
                        />
                    </div>
                </CardContent>
            </Card>
        )
    }

}
export default EventViewMainInfo;
