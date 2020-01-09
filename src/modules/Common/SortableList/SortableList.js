import React, {Component} from 'react';
import {connect} from "react-redux";

import SortableListItem from './SortableListItem'


export class SortableList extends Component {

    render() {
        return this.props.items.map((item, idx)=>(<SortableListItem key={idx} onSortItems={this.props.onSort} items={this.props.items} sortId={idx} itemComponent={this.props.itemComponent} itemComponentArgs={this.props.itemComponentArgs}>{item}</SortableListItem>));
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        items: ownProps.items,
        onSort: ownProps.onSort,
        itemComponent: ownProps.itemComponent,
        itemComponentArgs: ownProps.itemComponentArgs || {}
    }
};

export default connect(mapStateToProps, {})(SortableList)
