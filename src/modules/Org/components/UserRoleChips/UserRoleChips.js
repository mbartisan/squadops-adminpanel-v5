import React, {Component} from 'react';

import * as OrgService from "../../OrgService";

import {withStyles} from "@material-ui/core";
import AddUserRoleChip from "../AddUserRoleChip/AddUserRoleChip";
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
    root: {
        // borderBottom: 'solid 1px #808a9b',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)'
        }
    },
});

const initialState = {
    roles: []
};

class UserRoleChips extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.getRoles();
    }

    getRoles() {
        return OrgService.getRoles(this.props.orgId).then((roles) => {
            this.setState({ roles });
        });
    }

    updateUser() {
        // OrgService.getUser(this.props.orgId, this.props.user.id).then(user => {
        //     console.log("Set user: ", user);
        //     this.props.user = user;
        // })
    }

    removeRole(role) {
        OrgService.deleteRoleUser(this.props.orgId, role.id, this.props.user.id);
        this.props.user.roles = this.props.user.roles.filter(r => r.id !== role.id);
    }

    render() {
        const {classes} = this.props;
        return (<>
            <AddUserRoleChip user={this.props.user} roles={this.state.roles} onSelectRole={(role)=>this.updateUser()}/>
            {
                this.props.user.roles.map(roleId => {
                    const role = this.state.roles.find(r => r.id === roleId);
                    if (role == null) return null;
                    return <Chip variant="outlined" size="small" label={role.name} onDelete={()=>{this.removeRole(role);this.updateUser();}}/>
                })
            }
        </>);
    }

}
export default withStyles(styles)(UserRoleChips);
