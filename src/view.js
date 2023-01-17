import onChange from 'on-change';
import state from './model.js';

const renderValidation = (obj, isValid) => {
  const { i18nInstance, status } = obj;
  const errorParag = document.querySelector('.feedback');
  const input = document.querySelector('[name="url"]');
  errorParag.textContent = i18nInstance.t(`status.${status}`);
  if (isValid) {
    input.value = '';
    errorParag.classList.remove('text-danger');
    errorParag.classList.add('text-success');
    input.classList.remove('is-invalid');
    input.focus();
  } else {
    errorParag.classList.remove('text-success');
    errorParag.classList.add('text-danger');
    input.classList.add('is-invalid');
  }
};

const renderTemp = (obj) => {
  const { i18nInstance, isValid } = obj;
  const title = document.querySelector('.display-3');
  title.textContent = i18nInstance.t('title');
  const description = document.querySelector('.lead');
  description.textContent = i18nInstance.t('description');
  const examples = document.querySelector('.text-muted');
  examples.innerHTML = i18nInstance.t('examples');
  const inputContent = document.querySelector('[for="url-input"]');
  inputContent.textContent = i18nInstance.t('inputContent');
  const buttonAdd = document.querySelector('[aria-label="add"]');
  buttonAdd.textContent = i18nInstance.t('button.add');
  const buttonLangPreActive = document.querySelector('.btn-primary');
  const buttonLangActive = document.querySelector('.btn-outline-primary');
  buttonLangPreActive.classList.remove('btn-primary');
  buttonLangPreActive.classList.add('btn-outline-primary');
  buttonLangActive.classList.remove('btn-outline-primary');
  buttonLangActive.classList.add('btn-primary');

  if (isValid !== null) {
    renderValidation(state, isValid);
  }
};

export default onChange(state, (path, value) => {
  switch (path) {
    case 'lng': state.i18nInstance.changeLanguage(value)
      .then(() => renderTemp(state));
      break;
    case 'isValid': renderValidation(state, value);
      break;
    default:
      break;
  }
});
