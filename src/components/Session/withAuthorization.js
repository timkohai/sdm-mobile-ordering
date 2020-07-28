import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      let currentUrl = window.location.href.split('').slice(window.location.href.length-7).join('');
      let visitingAccount = currentUrl === "account" ? true : false;

      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          // demo version validation
          // if user uid is the one of the demo and url is account
          if(authUser.uid === process.env.REACT_APP_DEMO_UID && visitingAccount) {
            this.props.history.push(ROUTES.HOME);
          }

          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
