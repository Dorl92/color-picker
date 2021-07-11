import React, { Component } from 'react';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import Palette from './Palette';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = window.localStorage.getItem("palettes");
    this.state = {
      palettes: JSON.parse(savedPalettes) || seedColors
    }
    this.findPalette = this.findPalette.bind(this);
    this.saveNewPalette = this.saveNewPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  deletePalette(id) {
    this.setState({ palettes: this.state.palettes.filter(palette => palette.id !== id) },
      this.syncLocalStorage)

  }
  findPalette(id) {
    return this.state.palettes.find(palette => (palette.id === id));
  }
  saveNewPalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage)
  }
  syncLocalStorage() {
    if (this.state.palettes.length <= 0) {
      window.localStorage.clear();
    } else {
      window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))

    }
  };
  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="Page">
            <Switch location={location}>
              <Route exact path="/palette/new" render={(routePros) => <Page><NewPaletteForm saveNewPalette={this.saveNewPalette} palettes={this.state.palettes} {...routePros} /></Page>} />
              <Route exact path="/" render={(routePros) => <Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routePros} /></Page>} />
              <Route exact path="/palette/:id" render={(routePros) => <Page><Palette palette={generatePalette(this.findPalette(routePros.match.params.id))} /></Page>} />
              <Route exact path="/palette/:paletteId/:colorId" render={(routePros) => <Page><SingleColorPalette palette={generatePalette(this.findPalette(routePros.match.params.paletteId))} {...routePros} /></Page>} />
              <Route render={(routePros) => <Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routePros} /></Page>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />

    );
  }
}

export default App;
