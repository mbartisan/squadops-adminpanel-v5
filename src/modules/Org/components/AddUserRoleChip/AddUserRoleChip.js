import React, {Component} from 'react';

import * as OrgService from "../../OrgService";

import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const initialState = {
    dropdownAnchor: null
};

class AddUserRoleChip extends Component {

    constructor(props) {
        super(props);
        this.addRole = this.addRole.bind(this);
        this.state = {
            ...initialState
        };

        if (props.user == null) throw new Error("AddUserRoleChip needs to have the user passed as a property.");
        if (props.roles == null) throw new Error("AddUserRoleChip needs to have the roles passed as a property.");
    }

    addRole(role) {
        if (role == null) return;
        OrgService.createRoleUser(role.orgId, role.id, { userId: this.props.user.id });
        this.props.user.roles.push(role.id);
        this.props.onSelectRole(role);
    }

    render() {
        // const role = this.state.roles.find(r => r.id === this.props.roleId);

        const availableRoles = this.props.roles.filter(r => !this.props.user.roles.includes(r.id));
        return (<>

            <Chip variant="outlined" size="small" label={" + "} onClick={(ele)=>this.setState({ dropdownAnchor: ele.currentTarget })}/>


            <Menu
                anchorEl={this.state.dropdownAnchor}
                keepMounted
                open={Boolean(this.state.dropdownAnchor)}
                onClose={() => {
                    this.addRole(null);
                    this.setState({ dropdownAnchor: null });
                }}
            >
                { availableRoles.map(role => {
                    return (
                        <ListItem key={role.id} dense button onClick={() => {
                            this.addRole(role);
                            this.setState({ dropdownAnchor: null });
                        }}>
                            {/*<ListItemIcon>*/}
                            {/*    <Checkbox*/}
                            {/*        edge="start"*/}
                            {/*        checked={this.state.checked.includes(opt)}*/}
                            {/*        tabIndex={-1}*/}
                            {/*        disableRipple*/}
                            {/*    />*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText primary={role.name} />
                        </ListItem>
                    )
                })}
                { availableRoles.length === 0 && (<ListItem dense>No available roles.</ListItem>)}

            </Menu>

            </>)
    }

}
export default AddUserRoleChip;
