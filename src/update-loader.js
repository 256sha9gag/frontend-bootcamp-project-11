import _ from 'lodash';
import state from './model.js';
import load from './loader.js';
import parse from './parser.js';

const period = 5000;

const checkUpdates = () => {
  console.log('wow');
  state.feeds.forEach((feed) => {
    load(feed.link)
      .then((data) => parse(data))
      .then((parsed) => {
        const diff = _.differenceBy(feed.posts, parsed.posts, 'title');
        if (!_.isEmpty(diff)) {
          console.log(diff);
        }
      });
  });
};

const loadUpdate = () => {
  checkUpdates();
  setTimeout(() => loadUpdate(), period);
};

export default loadUpdate;
