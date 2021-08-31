import { movieApi, tvApi } from 'api';
import React from 'react';
import DetailPresenter from './DetailPresenter';

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = this.props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: /^\/movie\//.test(pathname),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
      location: { pathname },
    } = this.props;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return push('/');

    const { isMovie } = this.state;
    try {
      if (isMovie) {
        const { data: result } = await movieApi.detail(parsedId);
        this.setState({ result });
      } else {
        const { data: result } = await tvApi.detail(parsedId);
        const {
          data: { imdb_id },
        } = await tvApi.externalIds(parsedId);
        result.imdb_id = imdb_id;
        const {
          data: { results },
        } = await tvApi.videos(parsedId);
        result.videos = { results };
        this.setState({ result });
      }
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
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
