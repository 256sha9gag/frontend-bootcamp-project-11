import axios from 'axios';

const getProxy = (url) => {
  const proxyURL = 'https://allorigins.hexlet.app';
  const proxy = new URL('get', proxyURL);
  proxy.searchParams.append('disableCach', true);
  proxy.searchParams.append('url', url);
  return proxy.href;
};

export default (url) => axios.get(getProxy(url))
  .then((response) => response.data.contents);
