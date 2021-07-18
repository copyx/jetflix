import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from 'routes/Home';
import TV from 'routes/TV';
import Search from 'routes/Search';

export default function Router() {
  return (
    <HashRouter>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" exact component={Search} />
    </HashRouter>
  );
}
