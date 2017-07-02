import React from 'react';
import { Link } from 'react-router-dom'

const DatasetPreview = props => {
  const dataset = props.dataset;
  var linkTo = "/datasetdetail/" + dataset.title;

  return (
    <div>
      <h1>{dataset.title}</h1>
      <p>Creator: {dataset.creator_name}</p>
      <p>Issued: {dataset.issued}</p>
      <p><i>{dataset.resources[0].description}</i></p>
    </div>
  );
}

export default DatasetPreview;