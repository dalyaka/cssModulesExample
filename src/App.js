import styles from './common/Checkbox.module.styl'

import React, { Component } from 'react';

import Checkbox from './common/Checkbox';

export default class App extends Component {
  render() {
    return (
      <Checkbox additionalClass={styles.additionalClass} />
    );
  }
}
