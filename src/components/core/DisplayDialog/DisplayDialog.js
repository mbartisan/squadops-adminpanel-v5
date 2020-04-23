import React, {Component} from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class DisplayDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onClose(null)}>                
                { this.props.title && <DialogTitle>{ this.props.title }</DialogTitle> }
                <DialogContent>
                    { this.props.body && <DialogContentText>{ this.props.body }</DialogContentText> }
                    { this.props.children }
                </DialogContent>
            </Dialog>
        )
    }

}

export default DisplayDialog;
