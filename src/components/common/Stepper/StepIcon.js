import React from "react";
import {makeStyles} from "@material-ui/core";
import Check from "@material-ui/icons/Check";

const useStyledStepIconStyles = makeStyles({
    root: {
        color: 'red',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    inactive: {
        width: 25,
        height: 25,
        borderRadius: '50%',
        border: 'solid 2px #eaeaf0',
        color: '#eaeaf0',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '3px',
        paddingLeft: '1px'
    },
    active: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: 'solid 3px #dec32d',
        color: '#eaeaf0',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '2px',
        paddingLeft: '1px'
    },
    completed: {
        color: '#dec32d',
        zIndex: 1,
        fontSize: '25px',
        fontWeight: 'bold',
        borderRadius: '50%',
        border: 'solid 2px #eaeaf0',
        padding: '3px',
    },
});

export const StyledStepIcon = (props) => {
    const classes = useStyledStepIconStyles();
    const { active, completed, icon } = props;

    return (
        <div className={classes.root}>
            { !active && !completed && <div className={classes.inactive}>{ icon }</div> }
            { active && <div className={classes.active}>{ icon }</div> }
            { completed && <Check className={classes.completed} /> }
        </div>
    );
};
export default StyledStepIcon;
