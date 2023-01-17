import i18n from 'i18next';
import validation from './validation.js';
import state from './model.js';
import watchedState from './view.js';
import resources from './locales/index.js';

const controllers = () => {
  const form = document.querySelector('form');
  const changeLanguages = document.querySelectorAll('[data-lang="lang"]');

  changeLanguages.forEach((button) => {
    button.addEventListener('click', (e) => {
      watchedState.lng = e.target.id;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.focus();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validation({ website: url });
  });
};

const app = (i18next) => {
  state.i18nInstance = i18next;
  const defaultLanguage = 'ru';
  watchedState.lng = defaultLanguage;
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
    .catch((e) => { throw new Error('ошибка', e); });
  return app(i18nInstance);
};
