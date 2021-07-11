import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(format) {
        this.setState({ format });
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        console.log(this.props.palette)
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                key={color.id}
                name={color.name}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    showSlider
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter
                    name={paletteName}
                    emoji={emoji}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
