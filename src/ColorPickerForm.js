import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: "",
        }
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(color => color.color !== this.state.currentColor)
        );
    }
    addNewColor = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }
    updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
    }
    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    };

    render() {
        const { currentColor, newColorName } = this.state;
        const { isPaletteFull, classes } = this.props;
        return (
            <div className={classes.root}>
                <ChromePicker
                    className={classes.colorPicker}
                    onChangeComplete={this.updateCurrentColor}
                    color={currentColor} />
                <ValidatorForm onSubmit={this.addNewColor} instantValidate={false} ref="form">
                    <TextValidator
                        className={classes.colorNameInput}
                        label="Color Name"
                        onChange={this.handleChange}
                        name="newColorName"
                        variant='filled'
                        margin='normal'
                        value={newColorName}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name must be unique', 'Color already used!']} />
                    <Button
                        className={classes.addColorButton}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: isPaletteFull ? "gray" : currentColor }}
                        type="submit"
                        disabled={isPaletteFull}>
                        {isPaletteFull ? "Palette Full" : "ADD COLOR"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);