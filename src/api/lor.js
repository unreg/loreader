import HTMLParser from 'fast-html-parser';

import { store } from '../store';
import { setConversationCommentsList, setConversationCommentsPages } from '../screens/conversation/actions';


const parseTracker = data => {
  const topics = {};

  data.split('<tr>')
    .slice(2)
    .map(item => '<tr>' + item.split('</tr>')[0]
      .split('\n').join('')
      .split('\r').join('')
      .split('</a></span>)').join('</a></span>') + '</td></tr>')
    .forEach((tr, i) => {
      cells = HTMLParser.parse(tr).querySelectorAll('td');

      if (cells.length === 4)  {
        // Группа
        const section = cells[0].querySelectorAll('a')[0];

        // Топик
        // Тэги
        const topic = cells[1].querySelectorAll('a')[0];
        const tags = topic.querySelectorAll('span')
          .map(item => item.childNodes[0].rawText);

        var title = cells[1].structuredText.split(' ');
        const index = title.reverse().indexOf('в');
        // Топик-стартер
        const starter = title.reverse().splice(title.length - index - 2)[0]
          .replace('(', '');
        // Название
        title = title
          .splice(tags.join(' ').split(' ').length, title.length - tags.length)
          .join(' ');

        const key = topic.attributes.href.split('/')[3].split('?')[0];
        const modified = parseInt(topic.attributes.href.split('lastmod=')[1], 10);

        var datetime = '';
        var datetime_text = '';
        cells[2].querySelectorAll('time')
          .forEach(item => {
            datetime = item.attributes.datetime;
            datetime_text = item.structuredText.trim();
          })

        topics[key] = {
          key, modified,
          starter: starter,
          href: topic.attributes.href,
          tags, title, datetime, datetime_text,
          comments: cells[3].structuredText.trim(),
          forum: section.childNodes[0].rawText
        }
      }
    });

    return Object.values(topics).sort((a, b) => b.modified - a.modified);
};

export const getTopicList = async () => {
  try {
    let response = await fetch(
      'https://www.linux.org.ru/tracker',
    );
    let responseText = await response.text();

    return parseTracker(responseText);
  } catch (error) {
    // console.error('getTopicsList', error);
    return [];
  }
};


const parseComments = data => {

  // all "html"-articles
  const articles = [];

  var article_start = data.indexOf('<article');
  var article_end = data.indexOf('</article') + 10;

  while (article_start !== -1) {
    articles.push(data.substring(article_start, article_end));
    data = data.substring(article_end);

    article_start = data.indexOf('<article');
    article_end = data.indexOf('</article') + 10;
  }

  return articles
    .map((html, i) => {
      const article = HTMLParser.parse(html, {pre: true}).querySelectorAll('article')[0];

      const key = article.attributes.id;

      const message = (key.indexOf('topic') === -1)
        &&  article.querySelectorAll('.msg_body')[0]
        ||  article.querySelectorAll('.msg_body')[0]
              .querySelectorAll('div')
              .filter(item => item.attributes.itemprop === 'articleBody')[0];

      let msg = '<div></div>';
      if (key.indexOf('topic') === -1) {
        let startContent = html.indexOf('<div class="msg_body');
        startContent = startContent + html.substring(startContent).indexOf('>') + 1;
        let endContent = startContent + html.substring(startContent).indexOf('<div class="sign');
        msg = html.substring(startContent, endContent);
      } else {
        let startContent = html.indexOf('<div itemprop="articleBody');
        startContent = startContent + html.substring(startContent).indexOf('>') + 1;
        let endContent = startContent + html.substring(startContent).indexOf('<footer>');
        msg = html.substring(startContent, endContent).trim();
        msg = msg.substring(0, msg.length - 6);
      }

      let header = null;
      if (key.indexOf('topic') === -1) {
        /*
        message.querySelectorAll('h1')
          .forEach(item => {
            header = item.structuredText;
          });
        */
      } else {
        article.querySelectorAll('h1')
          .forEach(item => {
            header = item.structuredText;
          });
      }

      let creator = {};
      article.querySelectorAll('a')
        .filter(item => item.attributes.itemprop === 'creator')
        .forEach(item => {
          creator = {
            user: item.structuredText,
            href: item.attributes.href,
          }
        });
      article.querySelectorAll('img')
        .filter(item => item.attributes.class === 'photo')
        .forEach(item => {
          creator.userpic = {
            src: item.attributes.src,
            width: item.attributes.width,
            height: item.attributes.height,
          };
        });

      article.querySelectorAll('span')
        .filter(item => item.attributes.class === 'stars')
        .forEach(item => {
          creator.stars = item.structuredText;
        });


      var datetime = null;
      if (key.indexOf('topic') === -1) {
        message.querySelectorAll('time')
          .filter(item => item.attributes.itemprop === 'commentTime')
          .forEach(item => {
            datetime = item.attributes.datetime;
          });
      } else {
        article.querySelectorAll('time')
          .filter(item => item.attributes.itemprop === 'dateCreated')
          .forEach(item => {
            datetime = item.attributes.datetime;
          });
      }

      let response = {};
      article.querySelectorAll('time')
        .filter(item => item.attributes.itemprop === 'false')
        .forEach(item => {
          response.datetime = item.attributes.datetime;
        });
      article.querySelectorAll('a')
        .filter(item => item.attributes['data-samepage'] === 'samePage')
        .forEach(item => {
          response.href = item.attributes.href;
        });
      article.querySelectorAll('.title')
        .filter(item => item.rawText)
        .forEach(item => {
          response.creator = item.rawText.split(' ')[4];
        });

      return {key, header, message: msg, creator, datetime, response};
    })
};

export const getCommentList = async (href) => {
  try {
    let response = await fetch(
      `https://www.linux.org.ru${href}`,
    );
    let responseText = await response.text();

    return await parseComments(responseText);
    // store.dispatch(setConversationCommentsList(parseComments(responseText)));
  } catch (error) {
    // console.error('getCommentsList', error);
    return [];
  }
};


export const getForumsList = async () => {
  try {
    let response = await fetch(
      'https://www.linux.org.ru/forum/',
    );
    let responseText = await response.text();

    // store.dispatch(setForumsList(parseForums(responseText)));
    return parseForums(responseText);
  } catch (error) {
    // console.error('getForumsList', error);
    return [];
  }
};

const parseForums = data => {
  data = data.substring(data.indexOf('</ul>') + 1)
  return HTMLParser.parse(data.substring(data.indexOf('<ul>'), data.indexOf('</ul>')))
    .querySelectorAll('li')
    .map((item, i) => {
      const f = {};
      item.querySelectorAll('a')
        .forEach(item => {
          f.title = item.rawText;
          f.key = item.rawText;
          f.href = item.attributes.href;
        })
      item.querySelectorAll('em')
        .forEach(item => {
          f.description = item.rawText;
        })
      f.now = item.structuredText.split('(сегодня ')[1].split(')')[0]

      return f;
    });
};


export const getLastTopics = async (forum) => {
  try {
    if (!forum) {
      return [];
    }
    let response = await fetch(
      `https://www.linux.org.ru${forum.href}`,
    );
    let responseText = await response.text();

    return parseLastTopics(responseText).map(item => {
      item.forum = forum.title;
      return item;
    });
  } catch (error) {
    // console.error('getLastTopics', error);
    return [];
  }
};


const parseLastTopics = data => {
  return HTMLParser.parse(data)
    .querySelectorAll('tr')
    .filter(item => {
      let res = true;

      // Заголовок
      if (item.querySelectorAll('th').length > 0) {
        res = false;
      }

      // Подвал
      if (item.querySelectorAll('form').length > 0) {
        res = false;
      }

      // Прикрепленная
      if (item.querySelectorAll('i').length > 0) {
        res = false;
      }

      return res;
    })
    .map((item, i) => {
      const f = {};

      item.querySelectorAll('a')
        .slice(0, 1)
        .forEach(item => {
          f.key = item.attributes.href.split('?')[0].split('/')[item.attributes.href.split('/').length - 1];
          f.href = item.attributes.href;

          f.tags = item.querySelectorAll('span').map(item => item.rawText);
          f.title = item.structuredText.trim()
            .substring(f.tags.join(' ').length + 1);
        })

      item.querySelectorAll('td')
        .filter(item => !item.attributes.class)
        .forEach(item => {
          const t = item.text.split('\n');
          f.starter = t[t.length - 2].trim().replace('(', '').replace(')', '');
        })

      item.querySelectorAll('time')
        .forEach(item => {
          f.datetime = item.attributes.datetime;
          f.datetime_text = item.structuredText.trim();
        })

      item.querySelectorAll('td')
        .filter(item => item.attributes.class === 'numbers')
        .forEach(item => {
          f.comments = item.rawText.trim();
        })

      return f;
    });
};


export const getTSInfo = async (href) => {
  try {
    let response = await fetch(
      `https://www.linux.org.ru${href}`,
    );
    let responseText = await response.text();

    return parseTSInfo(responseText)
  } catch (error) {
    // console.error('getForumsList', error);
    return [];
  }
};


const parseTSInfo = data => {
  const f = {
    avatar: ''
  }

  const parser = HTMLParser.parse(data);

  parser
    .querySelectorAll('meta')
    .filter(item => item.attributes.property === 'og:description')
    .forEach(item => {
      f.text = item.attributes.content.length > 75 && `${item.attributes.content.slice(0, 75)}...` || item.attributes.content
    })

  parser
    .querySelectorAll('.photo')
    .slice(0, 1)
    .forEach(item => {
      f.avatar = item.attributes.src;
    })

  return f;
};


const parseConversationPage = data => {
  const startNavigation = data.indexOf('<a class=\'page-number\'');
  if (startNavigation !== -1) {
    const endNavigation = data.substring(startNavigation).indexOf('</div>')
    return HTMLParser.parse('<div>' +
      data.substring(startNavigation, startNavigation + endNavigation + 6))
      .querySelectorAll('a')
      .filter(item => item.attributes.class === 'page-number' && !isNaN(item.rawText))
      .map(item => item.attributes.href);
  }

  return [];
};

export const getConversationPages = async ({key, href}) => {
  href = [href.split(key)[0], `${key}#comments`].join('');
  try {
    let response = await fetch(
      `https://www.linux.org.ru${href}`,
    );
    let responseText = await response.text();
    return [...[href], ...parseConversationPage(responseText)];
  } catch (error) {
    // console.error('getConversationPages', error);
    return [];
  }
};
