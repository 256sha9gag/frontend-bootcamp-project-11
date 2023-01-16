import onChange from 'on-change';
import state from './model.js';

const renderValidation = (content, value) => {
  const errorParag = document.querySelector('.feedback');
  const input = document.querySelector('[name="url"]');
  errorParag.textContent = content;
  if (value) {
    errorParag.classList.remove('text-danger');
    errorParag.classList.add('text-success');
    input.classList.remove('is-invalid');
  } else {
    errorParag.classList.remove('text-success');
    errorParag.classList.add('text-danger');
    input.classList.add('is-invalid');
  }
};

export default onChange(state, (path, value) => {
  if (value) {
    renderValidation(state.status, value);
  } else {
    renderValidation(state.error, value);
  }
});
