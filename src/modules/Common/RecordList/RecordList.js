import React, {Component} from 'react';
import {connect} from "react-redux";

import RecordListItem from './RecordListItem'


export class RecordList extends Component {

    render() {
        return (
            <div className={"row"}>
                {
                    this.props.items.map((item, idx) => {
                        return (
                            <RecordListItem
                                key={idx}
                                items={this.props.items}
                                itemComponent={this.props.itemComponent}
                                itemComponentArgs={this.props.itemComponentArgs}
                            >
                                {item}
                            </RecordListItem>
                        );
                    })
                }
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        items: ownProps.items,
        itemComponent: ownProps.itemComponent,
        itemComponentArgs: ownProps.itemComponentArgs || {},
        maxHeight: ownProps.maxHeight
    }
};

export default connect(mapStateToProps, {})(RecordList)
