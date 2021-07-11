import React, { Component } from 'react';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShowing: false
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);

    }
    showForm() {
        this.setState({ isFormShowing: true })
    }
    hideForm() {
        this.setState({ isFormShowing: false })
    }
    render() {
        const { open, classes, palettes } = this.props;
        return (
            <div classes={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <EditIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap style={{fontFamily: "Inconsolata", fontSize: "1.5rem"}}>
                            Create A Palette
                    </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button variant='contained' color='secondary' className={classes.button} style={{fontFamily: "Inconsolata", fontSize: "0.9rem"}}>
                                Go Back
                            </Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button} style={{fontFamily: "Inconsolata", fontSize: "0.9rem"}}>
                            Save
                            </Button>
                    </div>
                </AppBar>
                {this.state.isFormShowing && (<PaletteMetaForm palettes={palettes} saveNewPalette={this.props.saveNewPalette} hideForm={this.hideForm} />)}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);