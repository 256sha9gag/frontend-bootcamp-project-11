import _ from 'lodash';

export default (data, url) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const error = doc.querySelector('parsererror');

  if (error !== null) {
    return null;
  }

  const feedTitle = doc.querySelector('channel > title').textContent;
  const feedDescription = doc.querySelector('channel > description').textContent;
  const idFeed = _.uniqueId();
  const items = doc.querySelectorAll('item');
  const feed = {
    title: feedTitle,
    description: feedDescription,
    link: url,
    idFeed,
  };
  const posts = [];
  items.forEach((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const itemLink = item.querySelector('link').textContent;
    const idItem = _.uniqueId();
    posts.push({
      title: itemTitle,
      description: itemDescription,
      link: itemLink,
      id: idItem,
    });
  });
  return [feed, posts];
};
