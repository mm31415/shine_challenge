import React from 'react';
import './GridItem.css';

const GridItem = (props) => (
  <div className="grid-item">
    { props.children }
  </div>
);

export default GridItem;
