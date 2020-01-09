import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../OrgService';

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

class UserListDialog extends Component {

    constructor(props) {
        super(props);
        this.loadUsers = this.loadUsers.bind(this);
        this.state = {
            users: []
        };
        this.lastDataRefresh = 0;
    }

    componentDidMount() {
        // this.loadUsers();
    }

    shouldLoadUsers() {
        const now = Date.now();
        const waitTime = 3 * 60 * 1000;
        return (this.lastDataRefresh + waitTime) < now;
    }

    loadUsers() {
        this.lastDataRefresh = Date.now();
        getUsers(this.props.orgId).then(users => {
            this.setState({ users });
        });
    }

    render() {
        if (this.props.open && this.shouldLoadUsers()) {
            this.loadUsers();
        }
        return (
            <Dialog onClose={() => this.props.onClose(null)} open={this.props.open}>
                <DialogTitle>Users:</DialogTitle>
                <List style={{minWidth:'220px'}}>
                    {this.state.users.filter(this.props.filter).map(user => (
                        <ListItem button onClick={() => this.props.onClose(user)} key={user.id}>
                            {/*<ListItemAvatar>*/}
                            {/*    <Avatar className={classes.avatar}>*/}
                            {/*        <PersonIcon />*/}
                            {/*    </Avatar>*/}
                            {/*</ListItemAvatar>*/}
                            <ListItemText primary={user.name} />
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
        orgId: ownProps.orgId,
        open: ownProps.open,
        onClose: ownProps.onClose,
        filter: ownProps.filter || function () { return true }
    };
};
export default connect(mapStateToProps)(UserListDialog);
