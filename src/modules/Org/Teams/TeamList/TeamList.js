import React, {Component} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';

import * as OrgService from "../../OrgService";
import * as UserService from "../../../User/UserService";

import PageView from "../../../Common/PageView/PageView";
import DataTable from "../../../Common/DataTable/DataTable";
import InputDialog from "../../../Common/InputDialog/InputDialog";

import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SecurityIcon from "@material-ui/icons/Security";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const styles = (theme) => ({
    userRow: {
        // borderBottom: 'solid 1px #808a9b',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)'
        }
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
});

const initialState = {
    dialog: null,
    teams: []
};

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = {
            ...initialState,
            orgId: props.match.params.orgId
        };

        this.getTeams();
    }

    getTeams() {
        return OrgService.getTeams(this.state.orgId).then(teams => {
            this.setState({ teams });
        });
    }

    createTeam({ name, color, icon }) {
        return OrgService.createTeam(this.state.orgId, { name, color, icon }).then(() => this.getTeams());
    }

    openDialog(name) {
        return (evt) => this.setState({ dialog: name });
    }

    closeDialog() {
        return (evt) => this.setState({ dialog: null });
    }

    render() {
        const {classes} = this.props;
        return (<>
            <PageView
                heading={"Teams"}
                backLink={`/orgs/${this.props.match.params.orgId}/`}
                subHeading={"Teams are a way to organize the structure of your organization."}
                nest={(<>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SecurityIcon />}
                        style={{color:'#eee',marginRight:'10px'}}
                        onClick={this.openDialog('createTeam-0')}
                    >
                        Create Team
                    </Button>
                </>)}
            >
                <>

                    <Paper className={classes.paper}>
                        <List dense={true}>
                            { this.state.teams.map((team) => (
                                <ListItem key={team.id} button component={RouterLink} to={`/orgs/${this.props.match.params.orgId}/teams/${team.id}`} className={classes.userRow}>
                                    <ListItemText primary={team.name} secondary={`${team.users.length} Team Member${(team.users.length !== 1) ? "s" : ""}`}/>
                                </ListItem>
                            )) }
                        </List>
                    </Paper>

                </>
            </PageView>


            <InputDialog open={this.state.dialog === "createTeam-0"} title={"Enter Team Name"} onClose={(value)=>{
                this.createTeam({ name: value });
                this.setState({ dialog: null });
            }}/>

        </>);
    }

}
export default withStyles(styles)(withRouter(TeamList));
