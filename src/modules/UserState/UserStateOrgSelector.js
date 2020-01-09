import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import {selectOrg} from './UserStateActions';

import PageView from '../Common/PageView/PageView';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";

const styles = (theme) => ({
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(2),
        cursor: 'pointer'
    },
    grid: {
        margin: '0 auto'
    }
});

class ApOrgSelector extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }


    selectOrgForId(orgId) {

        localStorage.setItem("awn_auth_org_id", orgId);
        this.props.history.push('/' + orgId);
        // this.props.selectOrg(orgId)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        const formData = type === "checkbox" ? { [name]: checked } : { [name]: value };
        // this.setState({ ...formData });
        if (formData.orgId != null && formData.orgId !== 0) {
            this.selectOrgForId(formData.orgId);
        }
    }

    render() {
        const { userState, classes } = this.props;
        return (
            <PageView heading="Select an Organization">
                {
                    userState.user.id && userState.user.orgs.map(org => (
                        <Grid item xs={12} sm={6} key={org.id} className={classes.grid}>
                            <Paper className={classes.paper} onClick={() => {this.selectOrgForId(org.id)}}>({ org.id }) { org.name }</Paper>
                        </Grid>
                    ))
                }
            </PageView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.UserState
    }
};
export default withStyles(styles)(withRouter((connect(mapStateToProps, { selectOrg })(ApOrgSelector))));
