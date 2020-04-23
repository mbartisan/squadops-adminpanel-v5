import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link,withRouter} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 240;
const styles = (theme) => {
    return ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            borderRight: 'solid 1px ' + theme.palette.primary.dark
        },
        subHeader: {
            fontWeight: 700,
            lineHeight: '20px',
            marginTop: '20px',
            color: theme.palette.light
        },
        listItem: {
            paddingTop: '2px',
            paddingBottom: '2px',
        },
        listItemTextRoot:{
            marginTop: '2px',
            marginBottom: '2px',
            color: '#eee'
        },
        listItemTextInset: {
            paddingLeft: '15px'
        },
        listItemTextPrimary: {
            fontSize: '0.8rem'
        },
        orgSelectorMenuItem: {
            width: '260px',
            padding: '0 15px'
        },
        toolbar: theme.mixins.toolbar,

    })
};
class AppSideBar extends Component {

    constructor(props) {
        super(props);
        this.openOrgSelector = this.openOrgSelector.bind(this);
        this.closeOrgSelector = this.closeOrgSelector.bind(this);
        this.state = {
            orgSelectorAnchor: null,
            isAWNStaff: true
        }
    }

    componentDidMount() {
    }

    openOrgSelector(e) {
        this.setState({ orgSelectorAnchor: e.currentTarget });
    }

    closeOrgSelector() {
        this.setState({ orgSelectorAnchor: null });
    }

    render() {
        const { classes, match, routeOrg, authUser } = this.props;
        const { orgId  } = match.params;
        const nav = {};

        console.log("AppSideBar ", this.props);


        if (orgId) {

            nav["Org"] = {
                "Users": `/orgs/${orgId}/users`,
                "Roles": `/orgs/${orgId}/roles`,
                "Teams": `/orgs/${orgId}/teams`,
                "Tags": `/orgs/${orgId}/tags`,
            };

            nav["Events"] = {
                "Events": `/orgs/${orgId}/events`,
                "Registration Templates": `/orgs/${orgId}/registration-templates`,
            };

        }

        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={true}
                classes={{paper:classes.drawerPaper}}
            >
                <div className={classes.toolbar}/>

                { routeOrg && authUser && (
                    <>
                        { authUser.orgs.filter(org => org.id === routeOrg.id).map(org => {
                            return (
                                <List component="nav" key={org.id}>
                                    <ListItem button onClick={this.openOrgSelector} className={classes.listItem}>
                                        <ListItemText primary={org.name} secondary={(org.ownerId === authUser.id) ? "Org Owner" : org.role.name} />
                                        <ListItemSecondaryAction>
                                            <i className={"fa fa-caret-down"}/>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            )
                        }) }

                        <Menu
                            anchorEl={this.state.orgSelectorAnchor}
                            keepMounted
                            open={Boolean(this.state.orgSelectorAnchor)}
                            onClose={this.closeOrgSelector}
                        >
                            {authUser.id && authUser.orgs.map((org, index) => {
                                const elements = [];
                                if (index !== 0) elements.push(<Divider component="li" />);
                                elements.push(
                                    <MenuItem
                                        className={classes.orgSelectorMenuItem}
                                        key={org.id}
                                        onClick={() => {
                                            this.props.history.push('/orgs/' + org.id);
                                            this.closeOrgSelector();
                                        }}
                                    ><ListItemText primary={org.name} secondary={(org.ownerId === authUser.id) ? "Org Owner" : org.role.name} /></MenuItem>
                                );
                                return elements;
                            })}
                        </Menu>
                    </>
                ) }


                <Divider />


                {
                    Object.keys(nav).map(heading => {
                        return (<List component={"nav"} subheader={(<ListSubheader component={"div"} className={classes.subHeader}>{ heading }</ListSubheader>)} key={heading}>{
                            Object.keys(nav[heading]).map(item => (
                                <ListItem button component={Link} to={nav[heading][item]} className={classes.listItem} key={item}>
                                    <ListItemText primary={item} classes={{root:classes.listItemTextRoot,primary:classes.listItemTextPrimary, inset:classes.listItemTextInset}} inset/>
                                </ListItem>
                            ))
                        }</List>)
                    })
                }

                <Divider />
            </Drawer>
        )
    }
}

export default withStyles(styles)(withRouter(AppSideBar));
