import * as yup from 'yup';
import state from './model.js';

const validation = (url) => {
  yup.setLocale({
    mixed: { required: 'required', notOneOf: 'exist' },
    string: {
      url: 'invalidURL',
    },
  });

  const schema = yup.string().required().url().notOneOf(state.links);

  return schema.validate(url).catch((e) => {
    state.errors = e.errors;
  });
};

export default validation;
