import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Section from 'components/Section';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 0 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => (
  <>
    <Helmet>
      <title>TV Shows | Jetflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rated">
            {topRated.map((tvShow) => (
              <Poster
                key={tvShow.id}
                id={tvShow.id}
                title={tvShow.name}
                imageUrl={tvShow.poster_path}
                rating={tvShow.vote_average}
                year={new Date(tvShow.first_air_date).getFullYear()}
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular">
            {popular.map((tvShow) => (
              <Poster
                key={tvShow.id}
                id={tvShow.id}
                title={tvShow.name}
                imageUrl={tvShow.poster_path}
                rating={tvShow.vote_average}
                year={new Date(tvShow.first_air_date).getFullYear()}
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map((tvShow) => (
              <Poster
                key={tvShow.id}
                id={tvShow.id}
                title={tvShow.name}
                imageUrl={tvShow.poster_path}
                rating={tvShow.vote_average}
                year={new Date(tvShow.first_air_date).getFullYear()}
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {error && <Message text={error} color="#e74c3c" />}
      </Container>
    )}
  </>
);

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
