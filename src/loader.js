import axios from 'axios';
import watchedState from './view.js';
import state from './model.js';

const getProxy = (url) => {
  const proxyURL = 'https://allorigins.hexlet.app';
  const proxy = new URL('get', proxyURL);
  proxy.searchParams.append('disableCache', true);
  proxy.searchParams.append('url', url);
  return proxy.href;
};

export default (url) => axios.get(getProxy(url))
  .then((response) => response.data.contents)
  .catch(() => {
    state.errors = 'errorNetwork';
    watchedState.state = 'failed';
  });
