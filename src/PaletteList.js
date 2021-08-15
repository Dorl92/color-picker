import React, { Component } from 'react';
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            deletingId: ""
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    openDialog(id) {
        this.setState({ openDialog: true, deletingId: id })
    }
    closeDialog() {
        this.setState({ openDialog: false, deletingId: "" })
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    deletePalette(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    render() {
        const { palettes, classes } = this.props;
        const { openDialog } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Colors Picker</h1>
                        <Link to="/palette/new">Create palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} timeout={300} classNames="fade">
                                <MiniPalette key={palette.id} id={palette.id} {...palette} openDialog={this.openDialog} goToPalette={this.goToPalette} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDialog} onClose={this.closeDialog}>
                    <DialogTitle>Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.deletePalette}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[500] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[500] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);