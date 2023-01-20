import * as yup from 'yup';
import state from './model.js';

const schema = yup.string().required().url();

const validation = (url) => {
  if (state.links.includes(url)) {
    state.errors = 'exist';
  }
  return schema.validate(url)
    .catch(() => {
      state.errors = 'invalidURL';
    });
};

export default validation;
