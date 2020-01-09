import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import { login } from './UserStateActions';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column'
    },
    resetPassword: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    submit: {
        textTransform: 'none',
        backgroundColor: '#783535',
        color: '#d2d2d2',
        '&:hover': {
            backgroundColor: '#974444',
        },
    }
});

class APLogin extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login(e) {
        const { login, password } = this.state;
        this.props.login({ login, password });
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        this.setState({ ...formData });
    }

    render() {
        const { classes, userState } = this.props;
        return (
            <Container maxWidth="xs">
                <Card className={classes.paper}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom align="center">
                            Sign In
                        </Typography>
                        <TextField
                            label="Username / Email"
                            name="login"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="filled"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            onChange={this.handleChange}
                            margin="normal"
                            type="password"
                            variant="filled"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        <Grid container className={"m-b-5"}>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}
                                    fullWidth
                                    onClick={this.login}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs className={classes.resetPassword}>
                                <Link href="#" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
                <Card className={classes.paper}>
                    <CardContent>
                        Need help with something?<br/><a href="https://awn.gg/discord" target="_blank">Contact Support in our Discord</a>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.UserState
    }
};
export default withStyles(styles)(withRouter(connect(mapStateToProps, { login })(APLogin)));
