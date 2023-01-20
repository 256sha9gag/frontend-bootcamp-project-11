import onChange from 'on-change';
import _ from 'lodash';
import state from './model.js';

const elements = {
  p: document.querySelector('.feedback'),
  input: document.querySelector('[name="url"]'),
  add: document.querySelector('[aria-label="add"]'),
  title: document.querySelector('.display-3'),
  description: document.querySelector('.lead'),
  examples: document.querySelector('.text-muted'),
  inputContent: document.querySelector('[for="url-input"]'),
  previosLang: document.querySelector('.btn-primary'),
  activeLang: document.querySelector('.btn-outline-primary'),
  titlePosts: document.querySelector('[data-title="posts"]'),
  titleFeeds: document.querySelector('[data-title="feeds"]'),
  listPosts: document.querySelector('[data-ul="posts"]'),
  listFeeds: document.querySelector('[data-ul="feeds"]'),
};

const renderPosts = (translation) => {
  elements.listPosts.innerHTML = '';
  elements.titlePosts.textContent = translation('posts');
  state.feeds.forEach((feed) => {
    feed.posts.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.setAttribute('href', `${post.link}`);
      a.dataset.id = post.idItem;
      a.classList.add('fw-bold');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.title;
      const buttonView = document.createElement('button');
      buttonView.setAttribute('type', 'button');
      buttonView.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      buttonView.dataset.id = post.idItem;
      buttonView.dataset.bsToggle = 'modal';
      buttonView.dataset.bsTarget = '#modal';
      buttonView.textContent = translation('button.view');
      li.appendChild(a);
      li.appendChild(buttonView);
      elements.listPosts.appendChild(li);
    });
  });
};

const renderFeeds = (translation) => {
  elements.listFeeds.innerHTML = '';
  elements.titleFeeds.textContent = translation('feeds');
  state.feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    const p = document.createElement('p');
    p.classList.add('small', 'm-0', 'text-black-50');
    p.textContent = feed.description;
    li.appendChild(h3);
    li.appendChild(p);
    elements.listFeeds.appendChild(li);
  });
};

const render = (translation) => {
  switch (state.state) {
    case 'processing':
      elements.add.disabled = true;
      break;
    case 'failed':
      elements.p.textContent = translation(`errors.${state.errors}`);
      elements.p.classList.remove('text-success');
      elements.p.classList.add('text-danger');
      elements.input.classList.add('is-invalid');
      elements.add.disabled = false;
      elements.input.focus();
      break;
    case 'processed':
      elements.add.disabled = false;
      elements.input.value = '';
      elements.p.textContent = translation(`status.${state.status}`);
      elements.p.classList.remove('text-danger');
      elements.p.classList.add('text-success');
      elements.input.classList.remove('is-invalid');
      elements.input.focus();
      renderPosts(translation);
      renderFeeds(translation);
      break;
    default:
      break;
  }
};

const renderTemp = (translation) => {
  elements.title.textContent = translation('title');
  elements.description.textContent = translation('description');
  elements.examples.innerHTML = translation('examples');
  elements.inputContent.textContent = translation('inputContent');
  elements.add.textContent = translation('button.add');
  const previosLang = document.querySelector('.btn-primary');
  const activeLang = document.querySelector('.btn-outline-primary');
  previosLang.classList.remove('btn-primary');
  previosLang.classList.add('btn-outline-primary');
  activeLang.classList.remove('btn-outline-primary');
  activeLang.classList.add('btn-primary');
  elements.input.focus();

  if (!_.isEmpty(state.state)) {
    render(translation);
  }
  if (!_.isEmpty(state.feeds)) {
    renderPosts(translation);
    renderFeeds(translation);
  }
};

export default onChange(state, (path, value) => {
  switch (path) {
    case 'lng': state.i18nInstance.changeLanguage(value)
      .then(() => renderTemp(state.i18nInstance.t));
      break;
    case 'state': render(state.i18nInstance.t);
      break;
    default:
      break;
  }
});
