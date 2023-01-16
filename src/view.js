import onChange from 'on-change';
import state from './model.js';

const pErrors = document.querySelector('.feedback');
const input = document.querySelector('[name="url"]');

const renderErrorsValidation = (error) => {
  pErrors.textContent = error;
  pErrors.classList.remove('text-success');
  pErrors.classList.add('text-danger');
  input.classList.add('is-invalid');
};

const renderSuccessValidation = (status) => {
  pErrors.textContent = status;
  pErrors.classList.remove('text-danger');
  pErrors.classList.add('text-success');
  input.classList.remove('is-invalid');
};

export default onChange(state, (path, value) => {
  if (!value) {
    renderErrorsValidation(state.error);
  } else {
    renderSuccessValidation(state.status);
  }
});
