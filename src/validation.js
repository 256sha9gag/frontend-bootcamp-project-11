import * as yup from 'yup';
import watchedState from './view.js';
import state from './model.js';

const schema = yup.object().shape({
  website: yup.string().required().url(),
});

const validation = (web) => {
  if (state.feeds.includes(web.website)) {
    state.status = 'exist';
    watchedState.isValid = false;
  } else {
    schema.validate(web)
      .then((url) => state.feeds.push(url.website))
      .then(() => { state.status = 'success'; })
      .then(() => { watchedState.isValid = true; })
      .catch(() => {
        state.status = 'invalid';
        watchedState.isValid = false;
      });
  }
};

export default validation;
