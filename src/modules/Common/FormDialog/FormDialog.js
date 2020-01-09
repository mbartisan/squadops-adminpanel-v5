import React, {Component} from 'react';
import { connect } from 'react-redux';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
    data: null
};

class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = initialState;
    }


    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState((state) => ({ data: { ...state.data, ...formData }}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.open === false && this.props.open === true) {
            const prevData = prevState.data || {};
            const defaultValues = {};
            this.props.fields.forEach(field => {
                defaultValues[field.name] = field.value;
                if (field.type === "select" && field.value === undefined) defaultValues[field.name] = field.options[0].value;
            });
            this.setState({ data: { ...defaultValues, ...prevData }});
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onClose(null)}>                
                { this.props.title && <DialogTitle>{ this.props.title }</DialogTitle> }
                <DialogContent>
                    { this.props.body && <DialogContentText>{ this.props.body }</DialogContentText> }
                    { this.props.children }
                    { this.props.fields.map(field => {
                        // field props:
                        // type - enum: text, select
                        // label
                        // name
                        // options - for type:select
                        // options.value
                        // options.label

                        if (field.type === 'text') {
                            return (
                                <TextField
                                    margin="dense"
                                    key={field.name}
                                    label={field.label || ""}
                                    name={field.name}
                                    defaultValue={this.state.data && this.state.data[field.name]}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            )
                        }

                        if (field.type === 'select') {
                            return (
                                <TextField
                                    select
                                    margin="dense"
                                    key={field.name}
                                    label={field.label || ""}
                                    name={field.name}
                                    value={this.state.data && this.state.data[field.name]}
                                    onChange={this.handleChange}
                                    fullWidth
                                >
                                    { field.options.map((opt,idx) => <MenuItem value={opt.value} key={idx}>{opt.label}</MenuItem>) }
                                </TextField>
                            )
                        }

                    })}

                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onClose(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{this.props.onClose(this.state.data);}} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        open: ownProps.open,
        onClose: ownProps.onClose,
        title: ownProps.title,
        body: ownProps.body,
        fields: ownProps.fields
    };
};
export default connect(mapStateToProps, {})(FormDialog);
