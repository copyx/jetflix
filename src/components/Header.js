import React from 'react';

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <a href="/">Movies</a>
        </li>
        <li>
          <a href="/tv">TV Shows</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
      </ul>
    </header>
  );
}
