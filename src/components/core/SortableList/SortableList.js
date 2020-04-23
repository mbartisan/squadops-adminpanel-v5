import React from 'react';
import SortableListItem from './SortableListItem'

// Docs: https://github.com/danielstocks/react-sortable

export const SortableList = ({ items, onSort, ItemComponent, ItemComponentProps }) => {
    return items.map((item, idx) => {
        return <SortableListItem
            key={idx}
            sortId={idx}
            onSortItems={onSort}
            item={item}
            items={items}
            index={idx}
            ItemComponent={ItemComponent}
            ItemComponentProps={ItemComponentProps}
        />
    });
};
export default SortableList;

