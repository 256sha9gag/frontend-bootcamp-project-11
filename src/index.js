import './scss/styles.scss';

const app = () => {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const inputDiv = document.createElement('div');
  inputDiv.classList.add('mb-3');
  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = 'Ссылка RSS';
  const input = document.createElement('input');
  input.id = 'url-input';
  form.appendChild(label);
  form.appendChild(input);
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить';
  container.classList.add('container-fluid', 'd-flex', 'p-5', 'bg-dark');
  container.appendChild(form);
  container.appendChild(button);
  document.body.appendChild(container);
};

app();
