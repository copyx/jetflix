import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 4px solid
    ${({ selected }) => (selected ? '#3498db' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(function Header({ location: { pathname } }) {
  return (
    <StyledHeader>
      <List>
        <Item selected={pathname === '/'}>
          <StyledLink to="/">Movies</StyledLink>
        </Item>
        <Item selected={pathname === '/tv'}>
          <StyledLink to="/tv">TV Shows</StyledLink>
        </Item>
        <Item selected={pathname === '/search'}>
          <StyledLink to="/search">Search</StyledLink>
        </Item>
      </List>
    </StyledHeader>
  );
});