import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from "react-router";

import injectTapEventPlugin from 'react-tap-event-plugin';
import { store, history } from './create_store';

import TestForm from './components/tests/form';
import DashboardLayout from "../test/components/layouts/dashboard";
import BaseLayout from "../test/components/layouts/base";

window.onload = function () {
  injectTapEventPlugin();
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route name="base" path="/" component={BaseLayout}>
          <Route name="dashboard" path='' component={DashboardLayout}>
            <IndexRoute name="tests" component={TestForm} />

            <Route name='edit_test' path='test/:id' component={TestForm} />

          </Route>
        </Route>
      </Router>
    </Provider>,
  document.getElementById('content')
  );

};
