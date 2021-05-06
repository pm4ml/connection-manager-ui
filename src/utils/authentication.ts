import axios from 'axios';

export default async function getUserInfo(config: { apiBaseUrl: string }) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.apiBaseUrl}/userInfo`,
      validateStatus: (code) => (code > 199 && code < 300) || code === 401,
      withCredentials: true,
    });

    // if we get an unauthorised response status then redirect the browser to our backend login resource
    if (response.status === 401) {
      const redirectUrl = `${config.apiBaseUrl}/login?redirect=${window.location.href}`;
      window.location.href = redirectUrl;
      return false;
    }

    return response.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return undefined;
  }
}
