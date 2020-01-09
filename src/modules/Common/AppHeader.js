import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AppHeader extends Component {
    render() {
        const { UserState } = this.props;

        return (
            <header>
                <div className="logo">
                    <span>AWN</span>
                </div>
                <div className="content">
                    <div className="item">
                        <i className="fa fa-bell" />
                    </div>
                    <div className="item">
                        <i className="fa fa-question-circle" />
                    </div>
                    <div className="item user-info">
                        <span className="name">{ UserState.user && UserState.user.name }</span>
                        <a className="logout()"><i className="fa fa-sign-out-alt" /></a>
                    </div>
                </div>
            </header>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        UserState: state.UserState
    }
};
export default connect(mapStateToProps, {})(AppHeader);

