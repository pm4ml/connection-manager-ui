/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { getIsAuthDisabled, getJwt, getExpiration, getLoggedUsername } from 'Auth/selectors';
import { logout } from 'Auth/actions';
import { getLoginUrl } from 'App/selectors';

const stateProps = state => ({
  isAuthDisabled: getIsAuthDisabled(state),
  jwt: getJwt(state),
  expiration: getExpiration(state),
  loginUrl: getLoginUrl(state),
  username: getLoggedUsername(state),
});

const actionProps = dispatch => ({
  onLogoutClick: () => dispatch(logout()),
});

function withAuth(Component, fnName) {
  class authHoc extends PureComponent {
    static isExpired(ts) {
      return new Date().getTime() > ts;
    }

    constructor(props) {
      super(props);

      this.redirectIfUnauthenticated = this.redirectIfUnauthenticated.bind(this);
      this.redirectIfExpired = this.redirectIfExpired.bind(this);
    }

    componentWillMount() {
      this.redirectIfUnauthenticated();
      this.redirectIfExpired();
    }
    componentDidMount() {
      if (!this.props.isAuthDisabled) {
        this.interval = setInterval(this.redirectIfExpired, 60000);
      }
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    componentDidUpdate(prevProps) {
      const isJwtChanged = prevProps.jwt !== this.props.jwt;
      const isAuthChanged = prevProps.isAuthDisabled !== this.props.isAuthDisabled;
      const isExpirationChanged = prevProps.expiration !== this.props.expiration;

      if (isJwtChanged || isAuthChanged || isExpirationChanged) {
        this.redirectIfUnauthenticated();
        this.redirectIfExpired();
      }
    }
    redirectIfUnauthenticated() {
      const { isAuthDisabled, jwt, loginUrl } = this.props;
      if (isAuthDisabled) {
        return;
      }
      if (!jwt) {
        window.location.assign(loginUrl);
        return;
      }
    }
    redirectIfExpired() {
      const { isAuthDisabled, expiration, loginUrl } = this.props;
      if (isAuthDisabled) {
        return;
      }
      if (authHoc.isExpired(expiration)) {
        window.location.assign(loginUrl);
        return;
      }
    }
    render() {
      if (!this.props.isAuthDisabled && !this.props.jwt) {
        return <Spinner center size="m" />;
      }
      return <Component {...this.props} />;
    }
  }

  return connect(
    stateProps,
    actionProps
  )(authHoc);
}
export { withAuth };
