import React, {Component} from 'react';
import { isDev } from "../../../config";
import authService from "../../../services/auth/index.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";

class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.successRedirect = this.successRedirect.bind(this);
        this.state = {
            login: {}
        };
    }

    async login({ email, password }) {
        const valid = await authService.login({ email, password });
        if (valid) this.successRedirect();
        // todo: error handling
    }

    successRedirect() {
        console.log("successRedirect");
        this.props.history.push('/welcome');
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState({ login: { ...this.state.login, ...formData} });
    }

    render() {
        if (this.props.open && authService.getAccessToken()) {
            this.successRedirect();
        }
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Login:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        name="email"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    { isDev && (
                        <Button onClick={()=>{this.login({ email: 'barton@squadops.gg', password: 'Testing' })}} color="primary">
                            Barton Login
                        </Button>
                    ) }
                    <Button onClick={()=>{this.login({ ...this.state.login })}} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}
export default withRouter(LoginDialog);
