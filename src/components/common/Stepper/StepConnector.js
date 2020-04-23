import {withStyles} from "@material-ui/core";
import StepConnector from "@material-ui/core/StepConnector";
export default withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 20px)',
        right: 'calc(50% + 20px)',
    },
    active: {
        '& $line': {
            borderColor: '#dec32d',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#dec32d',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector)
