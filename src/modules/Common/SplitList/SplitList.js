import React, {Component} from 'react';
import {connect} from "react-redux";

// import "./SplitList.scss";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    list: {
        // minWidth: '20%'
    },
    view: {
        background: '#191e27',
        padding: '5px 10px'
    },
    listItem: {
        paddingTop: '2px',
        paddingBottom: '2px'
    },
    listItemTextRoot:{
        marginTop: '2px',
        marginBottom: '2px',
    },
    listItemTextInset: {
        paddingLeft: '15px'
    },
    listItemTextPrimary: {
        fontSize: '0.8rem'
    }
});

class SplitList extends Component {

    constructor(props) {
        super(props);
        this.setSelected = this.setSelected.bind(this);
        this.state = { selected: this.props.list[0] };
    }

    setSelected(item) {
        this.setState({ selected: item });
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item className={classes.list} sm={3}>
                                <List component="nav">
                                    { this.props.list.map((item,idx) => {
                                        return (
                                            <ListItem button onClick={() => this.setSelected(item) } className={classes.listItem} key={idx}>
                                                <ListItemText primary={item.label} classes={{root:classes.listItemTextRoot,primary:classes.listItemTextPrimary, inset:classes.listItemTextInset}} inset/>
                                            </ListItem>
                                        );
                                    }) }
                                </List>
                            </Grid>
                            <Grid item className={classes.view} sm={9}>
                                { this.props.view(this.state.selected) }
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        list: ownProps.list,
        view: ownProps.view
    }
};

export default withStyles(styles)(connect(mapStateToProps, {})(SplitList));
