import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AppNav extends Component {

    render() {
        const { UserState } = this.props;
        if (!UserState.isLoggedIn) return (<nav/>);
        const navItems = [
            {
                title: 'Game Servers',
                children: [
                    { title: "Servers", link: '/game-servers' },
                    { title: "Admin Lists", link: '/game-servers/admin-lists' },
                    { title: "Ban Lists", link: '/game-servers/ban-lists' },
                ]
            }, {
                title: 'Dedicated Boxes',
                children: [
                    { title: "Boxes", link: '/dedicated-boxes' }
                ]
            }, {
                title: 'Organization',
                children: [
                    { title: 'Users', link: '/organization/users' },
                    { title: 'Roles', link: '/organization/roles' },
                    { title: 'Manage', link: '/organization/manage' }
                ]
            }
        ];

        const getNavItem = (n) => (n.link) ? (<Link to={n.link}>{ n.title }</Link>) : ( n.title );
        return (
            <nav>
                <h4 style={{width: "100%"}}>Org Selector Here</h4>
                { navItems.map(p => {
                    return (
                        <h4 key={p.title} className={"heading"}>
                            { getNavItem(p) }
                            { p.children && <ul> { p.children.map(c => (<li key={c.title}> { getNavItem(c) } </li>)) } </ul> }
                        </h4>
                    )
                }) }
                <div className={"anchor"}>
                    <h4>Have questions? Need help?</h4>
                    <a className={"button btn-sm text-center"} href={"https://discord.gg/eDCgu5s"} target={"_blank"}>Support Discord</a>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        UserState: state.UserState
    }
};
export default connect(mapStateToProps)(AppNav);
