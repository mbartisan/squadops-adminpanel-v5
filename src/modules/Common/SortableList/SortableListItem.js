import React from "react";

import { sortable } from './lib/sortablejs';

class SortableListItem extends React.Component {
    render() {
        const Item = this.props.itemComponent(this.props.children, this.props["data-id"], this.props.itemComponentArgs);
        let newProps = Object.assign({}, this.props);
        delete newProps.itemComponent;
        delete newProps.itemComponentArgs;
        return (
            <div className={"Sortable-Item"} {...newProps}>
                { Item }
            </div>
        )
    }
}

export default sortable(SortableListItem);
