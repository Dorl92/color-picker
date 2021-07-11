import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex' };
        this._shades = this.gatherShades(this.props.palette, this.props.match.params.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colorIdFilterBy) {
        let shades = [];
        for (let key in palette.colors) {
            shades = shades.concat(
                palette.colors[key].filter(color => (
                    color.id === colorIdFilterBy
                )));
        }
        return shades.slice(1);
    }
    changeFormat(format) {
        this.setState({ format });
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const allColorShades = this._shades.map(colorShade => (
            <ColorBox
                key={colorShade.name}
                background={colorShade[format]}
                name={colorShade.name}
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar
                    changeFormat={this.changeFormat}
                    showSlider={false}
                />
                <div className={classes.colors}>
                    {allColorShades}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>go back</Link>
                    </div>
                </div>
                <PaletteFooter name={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);