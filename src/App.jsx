import React, { Component } from 'react';
import Header from 'Components/Header/Header';
import Grid from 'Components/Grid/Grid';
import { createImageObjArr, sortByClickCount } from 'Utils/imageUtil';
import * as LocalStorage from 'Utils/localStorage';
import './App.css';

const defaultIds = [0,1,2,3,4,5,6,7];

const defaulClickCount = {
  '0': 0, '1': 0, '2': 0, '3': 0,
  '4': 0, '5': 0, '6': 0, '7': 0,
};

const defaultState = {
  loading: true,
  imageIds: defaultIds,
  selectedIds: [],
  clickCount: defaulClickCount,
};

class App extends Component {
  state = defaultState

  componentDidMount() {
    const { imageIds, clickCount } = this.state;
    const slctIds = LocalStorage.getItem('selectedIds') || [];
    const clicks = LocalStorage.getItem('clickCount') || defaulClickCount;

    setTimeout(() => {
      this.setState({
        loading: false,
        imageIds: sortByClickCount(defaultIds.slice(0), clicks),
        selectedIds: slctIds,
        clickCount: clicks,
      });
    }, 1000);
  }

  updateSelectedIds = (multiSelect) => {
    const { imageIds, clickCount } = this.state;

    LocalStorage.setItem('selectedIds', multiSelect);

    this.setState({
      loading: true,
      selectedIds: multiSelect,
      imageIds: sortByClickCount(defaultIds.slice(0), clickCount)
    }, () => {
      setTimeout(() => this.setState({ loading: false }), 1000);
    });
  }

  updateClickCount = (value) => {
    const { clickCount } = this.state;
    const newCount = { [value]: clickCount[value] + 1 };
    const newCounts = Object.assign({}, clickCount, newCount);

    LocalStorage.setItem('clickCount', newCounts);

    this.setState({ clickCount: newCounts });
  }

  clearStorage = () => {
    LocalStorage.clearStorage(['selectedIds', 'clickCount']);

    this.setState({ loading: true }, () => {
      this.setState(Object.assign(defaultState), () => {
        setTimeout(() => this.setState({ loading: false }), 1000);
      })
    });
  }

  render() {
    const {
      loading, imageIds, selectedIds, clickCount, action,
    } = this.state;

    return (
      <main id="app">
        <Header />
        {
          loading
           ? <i className='fas fa-spinner fa-spin'></i>
           : (
             <React.Fragment>
                <Grid
                  images={createImageObjArr(selectedIds, imageIds, clickCount)}
                  updateSelectedIds={this.updateSelectedIds}
                  clickCount={clickCount}
                  updateClickCount={this.updateClickCount}
                />
                <button
                  className='reset-btn'
                  onClick={this.clearStorage}
                >
                  Reset
                </button>
              </React.Fragment>
            )
        }

      </main>
    );
  }
}

export default App;
