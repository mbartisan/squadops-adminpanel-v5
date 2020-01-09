import React, {Component} from 'react';
import { connect } from 'react-redux';

class RequirePermission extends Component {

    constructor(props) {
        super(props);
        this.hasPermission = this.hasPermission.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
    }

    checkPermission(permission) {
        const {userState} = this.props;
        if (userState == null || userState.role == null || userState.role === {}) return false;
        if (permission == null || permission.length === 0) return false;
        if (userState.role.permissionGroups == null || userState.role.permissionGroups.length === 0) return false;
        const group = userState.role.permissionGroups.find(g => g.group === permission.split(".")[0]);
        if (group == null || group.permissions == null || group.permissions.length === 0) return false;
        const perm = group.permissions.find(p => p.key === permission.split(".")[1]);
        if (perm == null) return false;
        return parseInt(perm.value) === 1;
    }

    hasPermission() {
        const {userState} = this.props;
        if (userState == null || userState.org == null || userState.org === {}) return false;
        if (userState.user == null || userState.user === {}) return false;
        if (userState.org.ownerId === userState.user.id) return true;
        if (userState.isAWNStaff === true) return true;
        const permChecks = this.props.permission.map(p => this.checkPermission(p));
        if (this.props.requireAll === true) return !permChecks.some(val => val === false);
        return permChecks.some(val => val === true);
    }

    render() {
        if (this.hasPermission()) return this.props.children;
        return null;
    }

}

const mapStateToProps = (state, ownProps) => {
    let permission = ownProps.permission;
    if (!Array.isArray(permission)) permission = [permission];
    return {
        permission,
        requireAll: ownProps.requireAll || false,
        userState: state.UserState
    };
};

export default connect(mapStateToProps)(RequirePermission);
