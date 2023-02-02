import * as yup from 'yup';

const validation = (url, existingFeeds) => {
  yup.setLocale({
    mixed: { required: 'required', notOneOf: 'exist' },
    string: {
      url: 'invalidURL',
    },
  });

  const schema = yup.string().required().url().notOneOf(existingFeeds);

  return schema.validate(url).catch((e) => {
    throw new yup.ValidationError(e);
  });
};

export default validation;
