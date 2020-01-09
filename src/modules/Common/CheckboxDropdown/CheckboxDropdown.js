import React, {Component} from 'react';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const initialState = {
    dropdownAnchor: null,
    checked: []
};

export class CheckboxDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.setDropdownAnchor = this.setDropdownAnchor.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.options !== this.props.options) this.state.checked = this.props.options.filter(opt => opt.checked);
    }

    setDropdownAnchor(anchor) {
        this.setState({ dropdownAnchor: anchor });
    }

    handleToggle(val) {
        const checked = [...this.state.checked ];
        if (checked.includes(val)) {
            checked.splice(checked.indexOf(val), 1);
            this.handleChange("remove", val);
        }
        else {
            checked.push(val);
            this.handleChange("add", val);
        }
        this.setState({ checked });
    }

    handleChange(type, val) {
        if (this.props.onChange) this.props.onChange(type, val);
    }

    handleClose() {
        this.setDropdownAnchor(null);
        if (this.props.onClose) this.props.onClose(this.state.checked);
    }

    render() {

        return (<>
            <Button variant="contained" onClick={(ele)=>this.setDropdownAnchor(ele.currentTarget)} style={{
                backgroundColor: '#12161e',
                '&:hover': {
                    backgroundColor: '#151a23',
                }}}>
                <span style={{marginLeft:'10px',marginRight:'10px',color:'#eee'}}>{ this.props.label }</span>
                <ArrowDropDownIcon style={{color:'#ae3b3b'}}/>
            </Button>

            <Menu
                anchorEl={this.state.dropdownAnchor}
                keepMounted
                open={Boolean(this.state.dropdownAnchor)}
                onClose={this.handleClose}
            >
                { this.props.options && this.props.options.map((opt,idx) => {
                    return (
                        <ListItem key={idx} dense button onClick={() => this.handleToggle(opt) }>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={this.state.checked.includes(opt)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={opt.label} secondary={opt.subLabel} />
                        </ListItem>
                    )
                })}

            </Menu>
        </>)
    }
}
export default CheckboxDropdown;
