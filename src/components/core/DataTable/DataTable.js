import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";

// input props: rows - arr of the data objs
// input props: head - see below:
/*
const head = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];
 */
// input props: title - Table title name
// input props: defaultSort - Default head id to sort by, default value is the first property (not column)
// input props: defaultSortInverted - Invert the sort order for the default sorted field
// input props: selectable - Enables checkbox selection on each row
// input props: rowsPerPage - Default number of rows per page
// input props: rowActions - Actions for each row, see below:
// { label: 'Some Action', icon: (<SomeIcon/>), onClick: (event, row) => {} }
// input props: tableActions - Actions for the entire table, see below:
// { label: 'Some Action', icon: (<SomeIcon/>), onClick: (event) => {} }


const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const actionButtonGenerator = (action, row) => {
    const style = {
        opacity: '0.6',
        "&:hover": {
            opacity: '1'
        }
    };
    if (action.component) return action.component;
    if (action.conditional && action.conditional() === false) return  null;
    if (action.label) {
        return (
            <Tooltip title={action.label} placement={"bottom"}>
                <IconButton onClick={(e) => action.onClick(e, row)} style={style}>{ action.icon }</IconButton>
            </Tooltip>
        )
    }
    return <IconButton onClick={(e) => action.onClick(e, row)} style={style}>{ action.icon }</IconButton>
};


const EnhancedTableHead = (props) => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {props.selectable === true && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                            />
                        </TableCell>
                )}

                {props.head && props.head.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {
                                orderBy === headCell.id ?
                                    (<span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>)
                                    :
                                    null
                            }
                        </TableSortLabel>
                    </TableCell>
                ))}

                {props.rowActions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
        </TableHead>
    );
};

// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex'
    },
    title: {
        flex: '0 0 auto',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, title, subTitle, onFilter, filters } = props;
    const tableActions = props.tableActions || [];
    const [filterDropdownAnchor, setFilterDropdownAnchor] = React.useState(null);
    const [filterOptionDropdownAnchor, setFilterOptionDropdownAnchor] = React.useState(null);
    const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(null);
    const [filterValue, setFilterValue] = React.useState(null);
    const [searchFilterRefreshInterval, setSearchFilterRefreshInterval] = React.useState(null);

    function clearFilter() {
        setSelectedFilterIndex(null);
        setFilterValue(null);
        onFilter(null, null);
    }

    function selectFilterOption(event, filterIndex) {
        setFilterDropdownAnchor(null);
        setFilterOptionDropdownAnchor(event.currentTarget);
        clearFilter();
        setSelectedFilterIndex(filterIndex);
    }

    function searchFilter(event) {
        if (searchFilterRefreshInterval != null) clearTimeout(searchFilterRefreshInterval);
        const value = event.target.value;
        setFilterValue(value);
        setSearchFilterRefreshInterval(setTimeout(() => {
            onFilter(value, filters[selectedFilterIndex]);
            setSearchFilterRefreshInterval(null);
        }, 500));
    }

    function optionFilter(value) {
        onFilter(value, filters[selectedFilterIndex]);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.actions}style={{marginRight:'10px'}}>
                {
                    props.tableActions
                        .filter((action) => action.position != null && action.position === 'left')
                        .map((action, idx) => React.cloneElement(actionButtonGenerator(action), {key: idx}))
                }
            </div>
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (<>
                    <Typography variant="h6" id="tableTitle">
                        { title }
                    </Typography>
                    { subTitle && (<Typography color="inherit" variant="caption">
                        { subTitle }
                    </Typography>) }
                </>)}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete"><IconButton aria-label="delete"><DeleteIcon /></IconButton></Tooltip>
                ) : (
                    props.tableActions
                        .filter((action) => action.position == null || action.position === 'right')
                        .map((action,idx) => React.cloneElement(actionButtonGenerator(action), { key: idx }))
                )}
                { filters && <Tooltip title={"Filter"} placement={"bottom"}><IconButton onClick={(event) => setFilterDropdownAnchor(event.currentTarget)} className={classes.actionButton}><FilterListIcon/></IconButton></Tooltip>}
            </div>
            <Menu
                anchorEl={filterDropdownAnchor}
                keepMounted
                open={Boolean(filterDropdownAnchor)}
                onClose={()=>{
                    setFilterDropdownAnchor(null);
                    if (!filterValue || filterValue === "") clearFilter();
                }}
            >
                <li>
                    <Typography
                        color="textSecondary"
                        display="block"
                        variant="caption"
                        style={{minWidth:'260px'}}
                    >
                        Filter table by
                    </Typography>
                </li>
                <Divider component="li" />
                { filters && filters.map((filter, idx) => {
                    const components = [];
                    const filterTypeVerb ={
                        "search": "contains",
                        "option": "is"
                    };
                    if (idx !== 0) components.push(<Divider component="li" />);
                    components.push(<MenuItem
                        onClick={(event)=>{selectFilterOption(event,idx)}}
                        key={idx}
                        style={{color: (idx === selectedFilterIndex) ? '#ff5555' : 'inherit' }}
                    >{ filter.label }{ idx === selectedFilterIndex && <Typography variant="subtitle1" style={{fontSize:'12px',margin:'0px 0 -3px 4px'}}> {filterTypeVerb[filter.type]} "{filterValue}"</Typography> }</MenuItem>);
                    return components;
                })}
            </Menu>

            <Menu
                anchorEl={filterOptionDropdownAnchor}
                keepMounted
                open={Boolean(filterOptionDropdownAnchor)}
                onClose={()=>{
                    setFilterOptionDropdownAnchor(null)
                    if (!filterValue || filterValue === "") clearFilter();
                }}
            >
                {  filters && filters[selectedFilterIndex] && filters[selectedFilterIndex].type === "search" && (
                    <li style={{padding:'3px 15px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={filters[selectedFilterIndex].label}
                            value={filterValue || ""}
                            onChange={searchFilter}
                            fullWidth
                            style={{margin:'2px'}}
                        />
                    </li>
                )}
                { filters && filters[selectedFilterIndex] && filters[selectedFilterIndex].type === "option" && (<li style={{padding:'3px 15px'}}> { filters[selectedFilterIndex].label } </li>) }
                { filters && filters[selectedFilterIndex] && filters[selectedFilterIndex].type === "option" && filters[selectedFilterIndex].options.map((opt,idx) => <MenuItem onClick={()=> {optionFilter(opt.value)}} key={idx}>{ opt.label }</MenuItem>) }

            </Menu>


        </Toolbar>
    );
};

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));

export default function EnhancedTable(props) {
    const classes = useStyles();
    const key = props.keyProp || (props.head && props.head[0].id);
    const [order, setOrder] = React.useState((props.defaultSortInverted) ? 'asc' : 'desc');
    const [orderBy, setOrderBy] = React.useState(props.defaultSort || key);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(props.dense);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 5);
    const [filter, setFilter] = React.useState(() => () => true);

    const isSelected = name => selected.indexOf(name) !== -1;
    const filteredRows = (props.rows || []).filter(filter);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
    const currentRows = stableSort(filteredRows, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    function handleFilter(value, filter) {
        if (filter == null || filter.filter == null) return setFilter(()=>()=>true);
        setFilter(() => filter.filter(value));
    }

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (props.selectable === false) return;
        if (event.target.checked) {
            const newSelecteds = (props.rows || []).map(n => n[0]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name) {
        if (props.selectable === false) return;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function handleChangeDense(event) {
        setDense(event.target.checked);
    }

    return (
        <Paper className={classes.paper}>
            <EnhancedTableToolbar
                title={props.title}
                subTitle={props.subTitle}
                numSelected={selected.length}
                tableActions={props.tableActions || []}
                filters={props.filters}
                onFilter={handleFilter}
            />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        head={props.head}
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={filteredRows.length}
                        rowActions={props.rowActions || []}
                    />
                    <TableBody>
                        {currentRows.map((row, index) => {
                                const isItemSelected = isSelected(row[key]);
                                let style = (props.rowStyle != null && typeof props.rowStyle === "function")  ? props.rowStyle(row, index) : props.rowStyle;
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row[key])}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index + "-" + Object.keys(row)[0]}
                                        selected={isItemSelected}
                                        style={style}
                                    >
                                        {props.selectable === true && (
                                            <TableCell padding="checkbox"><Checkbox checked={isItemSelected} /></TableCell>
                                        )}
                                        {
                                            // For array of key value objects
                                            props.head.map(({id,formatter,subLabel,numeric}, idx) => {
                                                // return (
                                                //     (idx === 0) ?
                                                //         <TableCell key={idx + "-" + id} component="th" scope="row">
                                                //             {row[id]}
                                                //         </TableCell>
                                                //         :
                                                //         <TableCell key={idx + "-" + id} align="right">
                                                //             {row[id]}
                                                //         </TableCell>
                                                // );
                                                return (
                                                    <TableCell key={idx + "-" + id} align={(numeric == null || numeric === false) ? "left" : "right"}>
                                                        { (formatter == null) ? row[id] : formatter(row[id]) }
                                                        { (subLabel == null) ? null : (<><br/>{ subLabel(row) }</>) }
                                                    </TableCell>
                                                );
                                            })


                                            // For simple non key value array
                                            // row.map((val, idx) => {
                                            //     return (
                                            //         (idx === 0) ?
                                            //             <TableCell key={index + "-" + idx} component="th" scope="row" padding="none">
                                            //                 {val}
                                            //             </TableCell>
                                            //             :
                                            //             <TableCell key={index + "-" + idx}  align="right">
                                            //                 {val}
                                            //             </TableCell>
                                            //
                                            //     );
                                            // })

                                        }

                                        { props.rowActions && (
                                            <TableCell padding="checkbox">
                                                <div style={{display:"flex"}}>
                                                    { props.rowActions.map((action,idx) => React.cloneElement(actionButtonGenerator(action, row), { key: idx })) }
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
