import _ from 'lodash';
import watchedState from './view.js';
import state from './model.js';
import load from './loader.js';
import parse from './parser.js';

const period = 5000;

const checkUpdates = () => {
  if (!_.isEmpty(state.links)) {
    const arr = state.links.map((link) => load(link)
      .then((data) => {
        const [, posts] = parse(data);
        return posts;
      }));
    Promise.all(arr)
      .then((a) => a.flat())
      .then((newPosts) => {
        watchedState.posts = [
          ...(_.differenceWith(newPosts, state.posts, (obj, obj2) => obj.title === obj2.title)),
          ...state.posts,
        ];
      });
  }
};

const loadUpdate = () => {
  checkUpdates();
  setTimeout(() => loadUpdate(), period);
};

export default loadUpdate;
