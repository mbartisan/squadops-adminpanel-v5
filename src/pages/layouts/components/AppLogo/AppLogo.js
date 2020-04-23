import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
const styles = (theme) => {
    return ({
        root: {
            fontWeight: 700,
            fontFamily: theme.typography.logo,
            color: theme.palette.logo
        },
        period: {
            fontFamily: 'arial'
        }
    })
};

class AppLogo extends Component {
    render() {
        const classes = this.props.classes;
        let size = this.props.size || 24;
        return (
            <span className={classes.root} style={{fontSize:`${size}px`}}>
                Squad Ops
            </span>
        )
    }
}
export default withStyles(styles)(AppLogo);
