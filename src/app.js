import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './navigation';
import Store from './store';

export default class App extends React.Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
