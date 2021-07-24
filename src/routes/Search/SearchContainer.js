import { movieApi, tvApi } from 'api';
import React from 'react';
import SearchPresenter from './SearchPresenter';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchTerm: null,
      searchTerm: 'code',
      movieResult: null,
      tvResult: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm(searchTerm);
    }
  }

  async searchByTerm() {
    const { searchTerm } = this.state;
    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResult },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResult },
      } = await tvApi.search(searchTerm);
      this.setState({ movieResult, tvResult });
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
    const { searchTerm, movieResult, tvResult, error, loading } = this.state;
    return (
      <SearchPresenter
        searchTerm={searchTerm}
        movieResult={movieResult}
        tvResult={tvResult}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
