import i18n from 'i18next';
import controllers from './controllers.js';
import state from './model.js';
import watchedState from './view.js';
import resources from './locales/index.js';

const app = (i18next) => {
  state.i18nInstance = i18next;
  const defaultLanguage = 'ru';
  watchedState.lng = defaultLanguage;
  state.state = 'filling';
  controllers();
};

export default () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance
    .init({
      lng: 'ru',
      debug: false,
      resources,
    })
    .then((t) => { t('key'); })
    .catch((e) => { throw new Error('Error init i18nInstance', e); });
  return app(i18nInstance);
};
