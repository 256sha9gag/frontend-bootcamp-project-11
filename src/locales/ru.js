export default {
  translation: {
    title: 'RSS агрегатор',
    description: 'Добавляйте RSS-каналы и читайте в удобном формате! Автообновление раз в 5 секунд!',
    examples: 'Примеры: <br/>https://ru.hexlet.io/lessons.rss<br/>https://lenta.ru/rss/news<br/>http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
    inputContent: 'Ссылка RSS',
    button: {
      add: 'Добавить',
      view: 'Просмотр',
      read: 'Читать полностью',
      close: 'Закрыть',
    },
    posts: 'Посты',
    feeds: 'Фиды',
    errors: {
      required: 'Не должно быть пустым',
      exist: 'RSS уже существует',
      invalidURL: 'Ссылка должна быть валидным URL',
      invalidRSS: 'Ресурс не содержит валидный RSS',
      errorNetwork: 'Ошибка сети',
    },
    status: {
      success: 'RSS успешно загружен',
    },
    footer: 'Учебный проект, созданный Габриеляном Г.',
  },
};
