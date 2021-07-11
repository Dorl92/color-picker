import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    state = {
        stage: "form",
        newPaletteName: ""
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    };
    showEmojiPicker = () => {
        this.setState({ stage: "emoji" })
    }
    saveNewPalette = (emoji) => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.saveNewPalette(newPalette);
        this.setState({ stage: "" })
    }
    render() {
        const { stage, newPaletteName } = this.state;
        const { hideForm } = this.props
        return (
            <div>
                <Dialog open={stage === "emoji"} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title" style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}>Choose Your Emoji</DialogTitle>
                    <Picker
                        onSelect={this.saveNewPalette}
                        title='Pick your emoji' />
                </Dialog>
                <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}>Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}>
                                Please enter a name for your new beautiful palette. Make sure it's
                                unique!
                            </DialogContentText>
                            <TextValidator
                                style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}
                                label="Palette Name"
                                onChange={this.handleChange}
                                name="newPaletteName"
                                fullWidth
                                margin='normal'
                                variant='filled'
                                value={newPaletteName}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['This field is required', 'Palette name already used!']} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={hideForm}
                                color="primary" style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}>Cancel</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit" style={{ fontFamily: "Inconsolata", fontSize: "0.9rem" }}>Save palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
