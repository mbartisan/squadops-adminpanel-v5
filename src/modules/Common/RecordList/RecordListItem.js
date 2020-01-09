import React from "react";

class RecordListItem extends React.Component {
    render() {
        const Item = this.props.itemComponent(this.props.children, this.props.itemComponentArgs);
        let newProps = Object.assign({}, this.props);
        delete newProps.itemComponent;
        delete newProps.itemComponentArgs;
        return (
            <div className={"row"} {...newProps}>
                { Item }
            </div>
        )
    }
}

export default RecordListItem;
