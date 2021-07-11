import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import DraggableColorList from "./DarggableColorList";
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    state = {
        open: true,
        colors: seedColors[0].colors
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor) => {
        this.setState({ colors: [...this.state.colors, newColor] });
    };
    saveNewPalette = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.saveNewPalette(newPalette);
        this.props.history.push('/');
    };
    removeColorBox = colorName => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    };
    clearPalette = () => {
        this.setState({ colors: [] })
    };
    addRandomColor = () => {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
            console.log(randomColor)
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = this.state.colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleDrawerOpen={this.handleDrawerOpen}
                    saveNewPalette={this.saveNewPalette}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom style={{fontFamily: "Inconsolata", fontSize: "2.2rem"}}>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="secondary"
                                style={{fontFamily: "Inconsolata", fontSize: "0.9rem"}}
                                onClick={this.clearPalette}>CLEAR PALETTE</Button>
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                onClick={this.addRandomColor}
                                style={{fontFamily: "Inconsolata", fontSize: "0.9rem"}}
                                disabled={isPaletteFull}>
                                RANDOM PALETTE
                            </Button>
                        </div>
                        <ColorPickerForm
                            isPaletteFull={isPaletteFull}
                            colors={colors}
                            addNewColor={this.addNewColor} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColorBox={this.removeColorBox}
                        axis='xy'
                        distance={20}
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);