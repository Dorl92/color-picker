import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
        this.changeFormat = this.changeFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    changeFormat(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.changeFormat(evt.target.value);
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() { 
        const { level, changeLevel, showSlider, classes } = this.props;
        const { format } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>colorspicker</Link>
                </div>
                {showSlider && <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.changeFormat} style={{ fontFamily: "Inconsolata", fontSize: "1rem" }}>
                        <MenuItem value='hex' style={{ fontFamily: "Inconsolata", fontSize: "1rem" }}>HEX- #ffffff</MenuItem>
                        <MenuItem value='rgb' style={{ fontFamily: "Inconsolata", fontSize: "1rem" }}>RGB- rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba' style={{ fontFamily: "Inconsolata", fontSize: "1rem" }}>RGBA- rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span style={{ fontFamily: "Inconsolata", fontSize: "1rem" }} id="message-id">Format changed to {format.toUpperCase()}</span>}
                    ContentProps={{ "aria-describedby": "message-id" }}
                    onClose={this.closeSnackbar}
                    action={
                        <IconButton
                            color="inherit"
                            onClick={this.closeSnackbar}
                            key="close"
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    }>
                </Snackbar>
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);