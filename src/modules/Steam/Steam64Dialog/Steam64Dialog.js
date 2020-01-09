import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getProfiles } from "../SteamService";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Steam64Dialog extends Component {

    constructor(props) {
        super(props);
        this.validateId = this.validateId.bind(this);
        this.searchProfile = this.searchProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            profile: null,
            steam64: null,
            cache: {}
        }
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState({ ...formData });
    }

    validateId(id) {
        if (id == null) return { valid: false, message: ""};
        if (id.length !== 17 || !/^\d+$/.test(id) || !id.startsWith("765")) return { valid: false, message: "This is not a steam 64 id." };
        if (id === "76561197960287930") return { valid: false, message: "This is the example steam 64 id." };
        if (this.state.profile == null || id !== this.state.profile.id) {
            this.searchProfile(id);
            return { valid: false, message: "Searching for account..." };
        }
        return { valid: true, message: "Steam account found! Found: " + this.state.profile.name };
    }

    searchProfile(id) {
        if (Object.keys(this.state.cache).includes(id)) return (this.state.cache[id] == null) ? null : this.setState({ profile: this.state.cache[id] });
        getProfiles(id).then(([profile]) => {
            this.setState((state) => { return { profile, cache: { ...state.cache, [id]: profile } } });
        }).catch(e => this.setState({ profile: null }));
    }

    render() {
        const idState = (this.state.steam64 !== null) ? this.validateId(this.state.steam64) : null;
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onClose(null)}>
                <DialogTitle>Enter Steam 64 ID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The steam 64 id is a unique number used to identify a steam profile/account.<br/>
                        Example steam 64 id: 76561197960287930<br/>
                        <br/>
                        We recommend using <a href="https://steamid.io/" target="_blank">steamid.io</a> for finding steam 64 ids.
                    </DialogContentText>
                    <TextField
                        error={idState != null && idState.valid === false}
                        autoFocus
                        margin="dense"
                        label="Steam 64 ID"
                        name="steam64"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    { idState != null && (<p> { idState.message }</p>)}
                    { idState != null && idState.valid && <p>Steam Profile: <a href={this.state.profile.url} target="_blank">{ this.state.profile.id }</a></p>}
                    { idState != null && (<p><i><small>Note: The account name may be up to 30 days old. We recommend visiting the profile link above to confirm the steam account.</small></i></p>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.props.onClose(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{this.props.onClose(this.state.profile);}} color="primary" disabled={idState == null || idState.valid === false}>
                        Select { (this.state.profile && this.state.profile.name) || "Steam Account" }
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        open: ownProps.open,
        close: ownProps.onClose
    };
};
export default connect(mapStateToProps, {})(Steam64Dialog);
