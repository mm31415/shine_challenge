import React, { Component } from 'react';
import Image from 'Components/Image/Image';
import GridItem from './GridItem';
import './Grid.css';

const defaultState = {
  multiSelect: [],
};

class Grid extends Component {
  state = defaultState

  updateTempSelected = (e) => {
    const { multiSelect } = this.state;
    const id = parseInt(e.currentTarget.value);
    const existingIdx = multiSelect.indexOf(id);
    debugger
    let newIds;

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

  gridItemRender(imageId) {
    const { multiSelect } = this.state;
    const selectedIdx = multiSelect.indexOf(imageId);

    return (
      <GridItem>
        <Image
          imgId={imageId}
          onClick={this.updateTempSelected}
          position={selectedIdx >= 0 ? selectedIdx + 1 : undefined}
          selected={
            selectedIdx >= 0
            ? 'selected' : ''
          }
        />
      </GridItem>
    );
  };

  createGridItems() {
    const { imageIds } = this.props;
    const gridItems = [];
    let i = 0;

    while (i < imageIds.length) {
      gridItems.push(
        <li className="paired-items" key={imageIds[i]}>
          { this.gridItemRender(imageIds[i]) }
          { this.gridItemRender(imageIds[++i]) }
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
    console.log(this.props.imageIds);
    console.log(this.state.multiSelect);

    return (
      <section>
        <ul className="grid">
          { this.createGridItems() }
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
