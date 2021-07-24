import { movieApi, tvApi } from 'api';
import React from 'react';
import SearchPresenter from './SearchPresenter';

export default class SearchContainer extends React.Component {
  state = {
    searchTerm: null,
    movieResults: null,
    tvResults: null,
    loading: false,
    error: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm(searchTerm);
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ searchTerm: value });
  };

  async searchByTerm() {
    const { searchTerm } = this.state;
    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { searchTerm, movieResults, tvResults, error, loading } = this.state;
    return (
      <SearchPresenter
        searchTerm={searchTerm}
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
