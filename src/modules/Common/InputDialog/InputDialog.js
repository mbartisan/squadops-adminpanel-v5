import React, {Component} from 'react';
import { connect } from 'react-redux';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class InputDialog extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null
        }
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState({ ...formData });
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onClose(null)}>                
                { this.props.title && <DialogTitle>{ this.props.title }</DialogTitle> }
                <DialogContent>
                    { this.props.body && <DialogContentText>{ this.props.body }</DialogContentText> }
                    { this.props.children }
                    <TextField
                        autoFocus
                        margin="dense"
                        label={this.props.label || ""}
                        name="value"
                        onChange={this.handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onClose(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{this.props.onClose(this.state.value);}} color="primary">
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
        label: ownProps.label
    };
};
export default connect(mapStateToProps, {})(InputDialog);
