import React from 'react';
import { imgSrc } from 'Utils/imgSrc';
import './Image.css';

const Image = ({ imgId, onClick, position, selected }) => (
  <button
    className="img-btn"
    value={imgId}
    onClick={onClick}
  >
    { position ? <div className="position">{position}</div> : '' }
    <img className={`grid-img ${selected}`} src={`${imgSrc}${imgId}`} />
  </button>
);

export default Image;
