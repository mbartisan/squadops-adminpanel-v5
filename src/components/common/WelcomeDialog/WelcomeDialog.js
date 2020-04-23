import React, {Component} from 'react';
import {Link} from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import {DialogContent} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const initialState = {};

class WelcomeDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.listFilter = this.listFilter.bind(this);
    }

    listFilter() {
        if (this.props.filter) return this.props.filter;
        return () => true;
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Welcome to Squad Ops, { this.props.authUser.name }!</DialogTitle>
                <Divider />
                <DialogContent>
                    <p style={{marginBottom:'20px'}}>
                        If you are needing to join an organization, send your account identity code (below) to your org's administrator. They will need to use this code to add you to their organization account.
                    </p>
                    <b>Your user identity: </b>
                    <Paper style={{padding:'1px',margin:'10px',background:'#05080d',borderRadius:'10px'}}>
                        <pre style={{textAlign:'center',fontSize:'16px'}}>{this.props.authUser.identity}</pre>
                    </Paper>
                    <Divider style={{marginTop:'20px'}}/>
                    { this.props.authUser.orgs.length > 0 && (
                       <>
                           <p style={{marginBottom:'10px'}}>
                               Select Organization
                           </p>
                           <List>
                               {this.props.authUser.orgs.map(org => (
                                   <ListItem button component={Link} key={org.id} to={`/orgs/${org.id}`} style={{background:'#252933',borderRadius:'10px',boxShadow:'1px 1px 3px #151515',margin:'6px',padding:'4px 15px'}}>
                                       <ListItemText primary={org.name} secondary={org.role.name}/>
                                   </ListItem>
                               ))}
                           </List>
                       </>
                    ) }
                </DialogContent>
            </Dialog>
        );
    }

}
export default WelcomeDialog;
