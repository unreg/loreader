import React, {Component} from 'react';

import ConversationScreen from '../screens/conversation/container';
import LastTopics from '../screens/last_topics/container';


const screens = {
  conversation: ConversationScreen,
  last_topics: LastTopics,
}


export const routes = Object.keys(screens)
  .map(id => ({ id, item: screens[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = props => <Comp {...props} />;

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});
