import validation from './validation.js';

const controller = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validation({ website: url });
  });
};

export default () => {
  controller();
};
