import onChange from 'on-change';
import _ from 'lodash';
import state from './model.js';

const elements = {
  body: document.querySelector('body'),
  modal: document.querySelector('.modal'),
  modalTitle: document.querySelector('.modal-title'),
  modalBody: document.querySelector('.modal-body'),
  readAll: document.querySelector('[data-type="button-readAll"]'),
  close: document.querySelector('[data-type="button-close"]'),
  p: document.querySelector('.feedback'),
  input: document.querySelector('[name="url"]'),
  add: document.querySelector('[aria-label="add"]'),
  title: document.querySelector('.display-3'),
  description: document.querySelector('.lead'),
  examples: document.querySelector('[data-type="examples"]'),
  inputContent: document.querySelector('[for="url-input"]'),
  ruLang: document.querySelector('#ru'),
  enLang: document.querySelector('#en'),
  titlePosts: document.querySelector('[data-title="posts"]'),
  titleFeeds: document.querySelector('[data-title="feeds"]'),
  listPosts: document.querySelector('[data-ul="posts"]'),
  listFeeds: document.querySelector('[data-ul="feeds"]'),
  footer: document.querySelector('[data-footer="footer"]'),
};

const renderModal = (translation, id) => {
  const div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  console.log(id);

  if (id) {
    elements.body.classList.add('modal-open');
    elements.body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
    elements.modal.classList.add('show');
    elements.modal.setAttribute('style', 'display: block;');
    const post = state.posts.find((p) => p.id === id);
    console.log(post);
    elements.modalTitle.textContent = post.title;
    elements.modalBody.textContent = post.description;
    elements.readAll.textContent = translation('button.read');
    elements.readAll.setAttribute('href', post.link);
    elements.close.textContent = translation('button.close');
    elements.body.appendChild(div);
  } else {
    elements.body.classList.remove('modal-open');
    elements.body.removeAttribute('style');
    elements.modal.classList.remove('show');
    elements.modal.removeAttribute('style');
    elements.body.removeChild(elements.body.lastChild);
  }
};

const renderPosts = (translation) => {
  elements.listPosts.innerHTML = '';
  elements.titlePosts.textContent = translation('posts');
  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', `${post.link}`);
    a.dataset.idFeed = post.idFeed;
    a.dataset.id = post.id;
    if (state.pressedLinkId.includes(post.id)) {
      a.classList.add('fw-normal', 'link-secondary');
    } else {
      a.classList.add('fw-bold');
    }
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.dataset.type = 'a';
    a.textContent = post.title;
    const buttonView = document.createElement('button');
    buttonView.setAttribute('type', 'button');
    buttonView.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonView.dataset.id = post.id;
    buttonView.dataset.idFeed = post.idFeed;
    buttonView.dataset.type = 'button';
    buttonView.dataset.bsToggle = 'modal';
    buttonView.dataset.bsTarget = '#modal';
    buttonView.textContent = translation('button.view');
    li.appendChild(a);
    li.appendChild(buttonView);
    elements.listPosts.appendChild(li);
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

const renderState = (translation) => {
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
  elements.footer.textContent = translation('footer');
  elements.ruLang.classList.remove('btn-outline-primary', 'btn-primary');
  elements.enLang.classList.remove('btn-outline-primary', 'btn-primary');
  if (state.lng === 'ru') {
    elements.ruLang.classList.add('btn-primary');
    elements.enLang.classList.add('btn-outline-primary');
  } else {
    elements.enLang.classList.add('btn-primary');
    elements.ruLang.classList.add('btn-outline-primary');
  }
  elements.input.focus();

  if (!_.isEmpty(state.state)) {
    renderState(translation);
  }
  if (!_.isEmpty(state.feeds)) {
    renderPosts(translation);
    renderFeeds(translation);
  }
};

export default onChange(state, (path, value) => {
  switch (path) {
    case 'lng':
      state.i18nInstance.changeLanguage(value)
        .then(() => renderTemp(state.i18nInstance.t));
      break;
    case 'state':
      renderState(state.i18nInstance.t);
      break;
    case 'pressedLinkId':
    case 'posts':
      renderPosts(state.i18nInstance.t);
      break;
    case 'modalId':
      renderModal(state.i18nInstance.t, state.modalId);
      break;
    default:
      break;
  }
});
