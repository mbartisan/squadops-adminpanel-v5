import React, {Component} from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";

const initialState = {
    data: null
};
class AsyncSelectDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.open !== this.props.open) {
            if (this.props.open === true && this.props.loadData) this.props.loadData().then(data => this.setState({ data }));
            if (this.props.open === false) this.setState({ data: null });
        }
    }

    // todo: sortData
    // todo: filterData

    render() {
        const ListItemComponent = this.props.ListItemComponent;
        return (
            <Dialog onClose={() => this.props.onClose(null)} open={this.props.open}>
                <DialogTitle>{this.props.title}:</DialogTitle>
                { !this.state.data && <>Loading...</> }
                { this.state.data && (
                    <List style={{minWidth:'220px'}}>
                        {this.state.data.map((data,idx) => <ListItemComponent data={data} key={idx} onClose={this.props.onClose}/>)}
                    </List>
                ) }
            </Dialog>
        )
    }

}

export default AsyncSelectDialog;
