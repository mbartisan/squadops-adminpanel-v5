import React from "react";
import { sortable } from './lib/sortablejs';

// Docs: https://github.com/danielstocks/react-sortable

export const SortableListItem = ({ item, index, ItemComponent, ItemComponentProps, ...props }) => {
    return (
        <div className={"Sortable-Item"}  {...props}>
            <ItemComponent item={item} index={index} {...ItemComponentProps} />
        </div>
    )
};
export default sortable(SortableListItem);
