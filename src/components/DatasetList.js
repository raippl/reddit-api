import DatasetPreview from './DatasetPreview';
import React from 'react';

const DatasetList = props => {
  if (!props.datasets) {
    return (
      <div></div>
    );
  }

  if (props.datasets.length === 0) {
    return (
      <div>
        No dataset are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.datasets.map(dataset => {
          return (
            <DatasetPreview dataset={dataset} />
          );
        })
      }
    </div>
  );
};

export default DatasetList;
