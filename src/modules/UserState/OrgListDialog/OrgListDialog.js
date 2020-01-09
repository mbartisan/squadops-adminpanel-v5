import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

class OrgListDialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Select Organization:</DialogTitle>
                <List style={{minWidth:'420px'}}>
                    {this.props.orgs.filter(this.props.filter).map(org => (
                        <ListItem button component={Link} key={org.id} to={`/${org.id}`}>
                            <ListItemText primary={org.name} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }

}
const mapStateToProps = (state, ownProps) => {
    console.log("Org/Users/UserListDialog", state, ownProps);
    return {
        open: ownProps.open || true,
        filter: ownProps.filter || function () { return true },
        orgs: state.UserState.user.orgs || []
    };
};
export default connect(mapStateToProps)(OrgListDialog);
