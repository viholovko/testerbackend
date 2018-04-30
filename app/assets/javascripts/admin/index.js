import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from "react-router";

import BaseLayout from "./components/layouts/base";
import DashboardLayout from "./components/layouts/dashboard";
import injectTapEventPlugin from 'react-tap-event-plugin';
import LoginPage from "./components/pages/login";
import EmailSender from './components/pages/email_sender';
import { store, history } from './create_store';
import { check } from './services/sessions';

import Admins from './components/admins';
import Admin from './components/admins/show';
import AdminForm from './components/admins/form';

import Tests from './components/tests';
import Test from './components/tests/show';
import TestForm from './components/tests/form';

// import Emails from './components/emails';
// import Email from './components/emails/show';
// import EmailsForm from './components/emails/form';

window.onload = function () {
  injectTapEventPlugin();
  ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route name="base" path="/" component={BaseLayout}>
        <Route name="dashboard" path='' component={DashboardLayout} onEnter={check}>
          <IndexRoute name="admins" component={Admins} />
          <Route name='email_sender' path='email_sender' component={EmailSender} />

          <Route name='admins' path='admins' component={Admins} />
          <Route name='new_admin' path='admin/new' component={AdminForm} />
          <Route name='new_admin' path='admin/new' component={AdminForm} />
          <Route name='edit_admin' path='admin/:id/edit' component={AdminForm} />
          <Route name='show_admin' path='admin/:id' component={Admin} />

          <Route name='tests' path='tests' component={Tests} />
          <Route name='new_test' path='test/new' component={TestForm} />
          <Route name='new_test' path='test/new' component={TestForm} />
          <Route name='edit_test' path='test/:id/edit' component={TestForm} />
          <Route name='show_test' path='test/:id' component={Test} />

          {/*<Route name='emails' path='emails' component={Emails} />*/}
          {/*<Route name='show_email' path='email/:id' component={Email} />*/}
          {/*<Route name='edit_email' path='email/:id/edit' component={EmailsForm} />*/}
        </Route>
        <Route name="login" path='login' component={LoginPage} />
      </Route>
      <Route path="*" component={LoginPage} />
    </Router>
  </Provider>,
  document.getElementById('content')
  );

};
