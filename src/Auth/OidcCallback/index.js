import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { OIDC_TOKEN_ROUTE, AFTER_LOGIN_ROUTE_KEY } from '../../constants';

const OidcCallback = (envConfig) => {
  const history = useHistory();

  useEffect(() => {
    const { protocol, host, search } = window.location;
    const url = `${protocol}//${host}/${OIDC_TOKEN_ROUTE}${search}`;

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const { access_token, expires_in } = data;

        if (access_token) {
          const expires = new Date(new Date().getTime() + expires_in * 1000);
          Cookies.set(envConfig.MCM_COOKIE_NAME, access_token, { expires });
          console.log('cookie is set');
        } else {
          console.error(data.error);
        }

        const path = sessionStorage.getItem(AFTER_LOGIN_ROUTE_KEY) || '/';
        history.push(path);
      })
      .catch((err) => {
        console.error('Error exchanging authorization code:', err);
        history.push('/');
      })
      .finally(() => { sessionStorage.removeItem(AFTER_LOGIN_ROUTE_KEY); });
  }, [history]);

  return (
    <div>
      <p>Processing OIDC login callback...</p>
    </div>
  );
};

export default OidcCallback;
