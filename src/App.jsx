import React, { Component } from 'react';
import Header from 'Components/Header/Header';
import Grid from 'Components/Grid/Grid';
import { mergeIdArrays } from 'Utils/merge';
import './App.css';

const defaultState = {
  loading: true,
  imageIds: [0,1,2,3,4,5,6,7],
  selectedIds: [],
  clickCount: {
    '0': 0, '1': 0, '2': 0, '3': 0,
    '4': 0, '5': 0, '6': 0, '7': 0,
  }
};

class App extends Component {
  state = defaultState

  updateSelectedIds = (multiSelect) => {
    this.setState({ selectedIds: multiSelect });
  }

  addSelectedId = (e) => {
    const { selectedIds } = this.state;
    const newIds = [...selectedIds, parseInt(e.currentTarget.value)];
    this.setState({ selectedIds: newIds });
  }

  render() {
    const { imageIds, selectedIds, } = this.state;

    return (
      <main id="app">
        <Header />
        <Grid
          imageIds={mergeIdArrays(selectedIds, imageIds)}
          updateSelectedIds={this.updateSelectedIds}
        />
      </main>
    );
  }
}

export default App;
