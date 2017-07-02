import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  loadDatasets
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import DatasetPreview from '../components/DatasetPreview'

class Dataset extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    //dispatch(loadDatasets(selectedSubreddit))
  }


  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  handleLoadDatasetClick(e) {
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(loadDatasets(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, datasets, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
            <a href="#" onClick={this.handleLoadDatasetClick}>
              Load
            </a>
        </p>
        <div>
        {
        datasets.map(dataset => {
          return (
            <DatasetPreview dataset={dataset} />
          );
        })
        }
        </div> 
      </div>
    )
  }
}

Dataset.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  datasets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: datasets
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    datasets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Dataset)