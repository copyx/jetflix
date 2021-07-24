import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchPresenter = ({
  searchTerm,
  movieResult,
  tvResult,
  loading,
  error,
  handleSubmit,
}) => null;

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  movieResult: PropTypes.array,
  tvResult: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchPresenter;
