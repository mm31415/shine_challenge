import React, { Component } from 'react';
import Image from 'Components/Image/Image';
import Count from 'Components/Count/Count';
import GridItem from './GridItem';
import './Grid.css';

const defaultState = {
  multiSelect: [],
};

class Grid extends Component {
  state = defaultState

  updateTempSelected = (e) => {
    const { multiSelect } = this.state;
    const { updateClickCount } = this.props;
    const id = parseInt(e.currentTarget.value);
    const existingIdx = multiSelect.indexOf(id);
    let newIds;

    updateClickCount(id);

    if (existingIdx < 0) {
      newIds = [...multiSelect, id];
    } else {
      newIds = [
        ...multiSelect.slice(0, existingIdx),
        ...multiSelect.slice(existingIdx + 1)
      ];
    }

    this.setState({ multiSelect: newIds });
  }

  gridItemRender(image) {
    const { multiSelect, tempCount } = this.state;
    const { clickCount, images } = this.props;
    const selectedIdx = multiSelect.indexOf(image.id);

    return (
      <GridItem>
        <Image
          imgId={image.id}
          onClick={this.updateTempSelected}
          position={selectedIdx >= 0 ? selectedIdx + 1 : undefined}
          selected={
            selectedIdx >= 0
            ? 'selected' : ''
          }
        />
        <Count count={image.count} />
      </GridItem>
    );
  };

  createPairedItems() {
    const { images } = this.props;
    const gridItems = [];
    let i = 0;

    while (i < images.length) {
      gridItems.push(
        <li className="paired-items" key={images[i].id}>
          { this.gridItemRender(images[i]) }
          { this.gridItemRender(images[++i]) }
        </li>
      );

      i++;
    }

    return gridItems;
  };

  saveMultiSelect = () => {
    const { multiSelect } = this.state;
    const { updateSelectedIds } = this.props;

    this.setState(
      { multiSelect: [] },
      () => updateSelectedIds(multiSelect)
    );
  }

  render() {
    const { updateSelectedIds } = this.props;
    const { multiSelect } = this.state;

    return (
      <section className="grid-wrapper">
        <ul className="grid">
          { this.createPairedItems() }
        </ul>
        {
          multiSelect.length > 0
            ? (
              <button
                className="save-btn"
                onClick={this.saveMultiSelect}
              >
                {'Save/Update'}
              </button>
            ) : ''
        }
      </section>
    );
  }
};

export default Grid;
