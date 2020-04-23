import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link as RouterLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Link from "@material-ui/core/Link";


const styles = (theme) => ({
    root: {
        marginBottom: '20px'
    },
    verticalAlign: {
        margin: 'auto 5px'
    },
    backLink: {
        fontSize: '18px',
        marginLeft: '-10px'
    },
    heading: {
        fontWeight: 600,
    },
    subheading: {
        color: '#c9c9c9',
    },
    nest: {
    },
    icon: {
        width: '45px',
        height: '45px',
        display: 'inline-block',
        // background: '#808a9b',
        borderRadius: '100px',
        padding: '5px'
    },
    img: {
        width: '35px',
        height: '35px',
    }
});

class PageView extends Component {
    render() {
        const {classes} = this.props;
        return (<>
            <Grid item xs={12} sm container className={classes.root}>
                { this.props.backLink && (
                    <Grid item className={classes.verticalAlign}>
                        <Link to={this.props.backLink} component={RouterLink} className={classes.backLink}><i className="fa fa-chevron-left m-r-10"/></Link>
                    </Grid>
                )}
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.heading}>{ this.props.heading }</Typography>
                        { this.props.subHeading && (
                            <Typography variant="caption" gutterBottom className={classes.subheading}>
                                { this.props.subHeading }
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                { this.props.nest && (
                    <Grid item className={classes.nest}>
                        { this.props.nest }
                    </Grid>
                )}
            </Grid>
            { this.props.body || this.props.children }
            </>);
    }
}

export default withStyles(styles)(PageView);
