import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import Home from 'routes/Home';
import TV from 'routes/TV';
import Search from 'routes/Search';
import Detail from 'routes/Detail';

export default function Router() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/tv/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
