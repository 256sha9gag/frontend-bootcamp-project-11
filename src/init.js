import i18n from 'i18next';
import handleAppChanges from './handler.js';
import state from './model.js';
import watchedState from './view.js';
import resources from './locales/index.js';

const app = (i18next) => {
  state.i18nInstance = i18next;
  const defaultLanguage = 'ru';
  watchedState.lng = defaultLanguage;
  state.state = 'filling';
  handleAppChanges();
};

export default () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance
    .init({
      lng: 'ru',
      debug: false,
      resources,
    })
    .then(() => {})
    .then(() => app(i18nInstance))
    .catch((e) => { throw new Error('Error init i18nInstance', e); });
};
