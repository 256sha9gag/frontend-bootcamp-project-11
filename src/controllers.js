import validation from './validation.js';
import watchedState from './view.js';
import state from './model.js';
import load from './loader.js';
import parse from './parser.js';
import loadUpdate from './update-loader.js';

export default () => {
  const form = document.querySelector('form');
  const changeLanguage = document.querySelectorAll('[data-lang="lang"]');
  loadUpdate();

  changeLanguage.forEach((button) => {
    button.addEventListener('click', (e) => {
      watchedState.lng = e.target.id;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.errors = null;
    state.status = null;
    watchedState.state = 'processing';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validation(url)
      .then(() => {
        if (state.errors !== null) {
          watchedState.state = 'failed';
        } else {
          state.links.push(url.toString());
          load(url)
            .then((data) => parse(data, url.toString()))
            .then((parsed) => {
              if (!parsed) {
                state.errors = 'invalidRSS';
                watchedState.state = 'failed';
              } else {
                state.feeds.push(parsed);
                console.log(parsed);
                state.status = 'success';
                watchedState.state = 'processed';
              }
            });
        }
      });
  });
};
