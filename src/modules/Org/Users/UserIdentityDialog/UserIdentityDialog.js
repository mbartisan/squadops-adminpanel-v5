import React, {Component} from 'react';
import { connect } from 'react-redux';

import { checkUserIdentity } from "../../OrgActions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class UserIdentityDialog extends Component {

    constructor(props) {
        super(props);
        this.validateIdentity = this.validateIdentity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            addUserIdentity: null
        }
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState({ ...formData });
    }

    validateIdentity(identity) {
        if (identity.length !== 32) return { valid: false, message: "This is not a user identity." };
        if (identity === "fe7ac5b9dbfa32a2fe75de655be14a7c") return { valid: false, message: "This is the sample user identity. You need the identity of the user you are trying to add." };
        if (identity === this.props.userState.user.identity && this.props.allowSelf === false) return { valid: false, message: "This is your user identity. You need the identity of the user you are trying to add." };
        if (this.props.userForIdentity == null || identity !== this.props.userForIdentity.identity) {
            this.props.checkUserIdentity(identity);
            return { valid: false, message: "Searching for user..." };
        }
        return { valid: true, message: "Identity found! Found: " + this.props.userForIdentity.name };
    }

    render() {
        const identityState = (this.state.addUserIdentity !== null) ? this.validateIdentity(this.state.addUserIdentity) : null;
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onClose(null)}>                
                <DialogTitle>Enter User Identity Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A user's "identity" code is a long string of random characters that looks similar to:
                        fe7ac5b9dbfa32a2fe75de655be14a7c<br/>
                        <br/>
                        The only way to obtain this identity code is from the user you wish to add. They will need
                        to create an account on awn.gg if they do not have one already. After they login to their
                        account, they should navigate to the admin panel. In the top right corner they will have a
                        "Show Identity" button next to their username.
                    </DialogContentText>
                    <TextField
                        error={identityState != null && identityState.valid === false}
                        autoFocus
                        margin="dense"
                        label="User Identity"
                        name="addUserIdentity"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    { identityState != null && (<p> { identityState.message }</p>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onClose(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{this.props.onClose(this.props.userForIdentity);}} color="primary" disabled={identityState == null || identityState.valid === false}>
                        Select { (this.props.userForIdentity && this.props.userForIdentity.name) || "User" }
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        open: ownProps.open,
        close: ownProps.onClose,
        allowSelf: (ownProps.allowSelf === true) || false,
        userState: state.UserState,
        userForIdentity: state.Org.userForIdentity
    };
};
export default connect(mapStateToProps, { checkUserIdentity })(UserIdentityDialog);
