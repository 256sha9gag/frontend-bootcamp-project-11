import validation from './validation.js';
import watchedState from './view.js';
import state from './model.js';
import load from './loader.js';
import parse from './parser.js';
import loadUpdate from './update-loader.js';

export default () => {
  const form = document.querySelector('form');
  const changeLanguage = document.querySelectorAll('[data-lang="lang"]');
  const listPosts = document.querySelector('[data-ul="posts"]');
  const body = document.querySelector('body');
  loadUpdate();

  body.addEventListener('click', (e) => {
    const data = e.target;
    if (data.dataset.bsDismiss === 'modal' || data.id === 'modal') {
      watchedState.modalId = null;
    }
  });

  changeLanguage.forEach((button) => {
    button.addEventListener('click', (e) => {
      watchedState.lng = e.target.id;
    });
  });

  listPosts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;

    if (!state.pressedLinkId.includes(id)) {
      watchedState.pressedLinkId.push(id);
    }

    if (e.target.type === 'button') {
      watchedState.modalId = id;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.errors = null;
    watchedState.state = 'processing';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validation(url, state.links)
      .then(() => load(url))
      .then((data) => parse(data, url.toString()))
      .then((dataParsed) => {
        if (!dataParsed) {
          state.errors = 'invalidRSS';
          watchedState.state = 'failed';
        } else {
          const [feed, posts] = dataParsed;
          state.links.push(url.toString());
          state.feeds.push(feed);
          state.posts = [...posts, ...state.posts];
          watchedState.state = 'processed';
        }
      })
      .catch((err) => {
        state.errors = err.errors.join();
        watchedState.state = 'failed';
      });
  });
};
