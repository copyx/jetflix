import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'components/Loader';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: contain;
  border-radius: 5px;
  background-repeat: no-repeat;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  line-height: 20px;
`;

const Item = styled.span``;

const IMDbLink = styled.a`
  background-color: #e2b616;
  color: black;
  padding: 2px 5px;
  border-radius: 2px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
  margin-bottom: 20px;
`;

const TabContainer = styled.div``;

const TabMenuBox = styled.div``;

const TabMenuButton = styled.button``;

const TabContentBox = styled.div``;

const TabContentTitle = styled.h4`
  font-size: 28px;
  margin-top: 16px;
`;

const TabContentItemTitle = styled.h5`
  font-size: 18px;
  margin-top: 10px;
`;

const CompanyLogo = styled.img`
  width: 100%;
`;

const DetailPresenter = ({ result, error, loading }) => {
  const [tab, setTab] = useState('videos');
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Jetflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Jetflix</title>
      </Helmet>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : '/noPosterSmall.png'
            }
          />
          <Data>
            <Title>{result.title ? result.title : result.name}</Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{' '}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              {result.imdb_id && (
                <>
                  <Divider>•</Divider>
                  <IMDbLink
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target={'_blank'}
                  >
                    IMDb
                  </IMDbLink>
                </>
              )}
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <TabContainer>
              <TabMenuBox>
                <TabMenuButton onClick={() => setTab('videos')}>
                  Videos
                </TabMenuButton>
                <TabMenuButton onClick={() => setTab('companies & countries')}>
                  Production Companies & Countries
                </TabMenuButton>
                {result.seasons && (
                  <TabMenuButton onClick={() => setTab('seasons')}>
                    Seasons
                  </TabMenuButton>
                )}
              </TabMenuBox>
              <TabContentBox>
                {tab === 'videos' && (
                  <>
                    {result.videos &&
                      result.videos.results &&
                      result.videos.results.map((video) => (
                        <iframe
                          key={video.id}
                          src={`https://www.youtube.com/embed/${video.key}`}
                          frameBorder="0"
                          allow="encrypted-media; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                  </>
                )}
                {tab === 'companies & countries' && (
                  <>
                    <TabContentTitle>Production Companies</TabContentTitle>
                    {result.production_companies.map((company) => (
                      <div key={company.id}>
                        <TabContentItemTitle>
                          {company.name}
                        </TabContentItemTitle>
                        <CompanyLogo
                          src={
                            company.logo_path
                              ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                              : '/noPosterSmall.png'
                          }
                        />
                      </div>
                    ))}
                    <TabContentTitle>Production Countries</TabContentTitle>
                    {result.production_countries.map((country, index) => (
                      <div key={index}>
                        <TabContentItemTitle>
                          {country.name}
                        </TabContentItemTitle>
                      </div>
                    ))}
                  </>
                )}
                {tab === 'seasons' && (
                  <>
                    {result.seasons.map((season) => (
                      <div key={season.id}>
                        <TabContentItemTitle>{season.name}</TabContentItemTitle>
                        <CompanyLogo
                          src={
                            season.poster_path
                              ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                              : '/noPosterSmall.png'
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
              </TabContentBox>
            </TabContainer>
          </Data>
        </Content>
      </Container>
    </>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
