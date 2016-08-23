import React from 'react';

import './Checkbox.styl';
import styles from './Checkbox.module.styl';

import classnames from 'classnames';

export default class Checkbox extends React.Component {
  static PropTypes = {
    additionalClass: React.PropTypes.string
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: true,
    }
  }

  checkboxClickHandler = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    const className = classnames('example-of-checkbox', styles.checkbox, {
      [styles.checked]: this.state.checked,
      [this.props.additionalClass]: this.props.additionalClass,
    });
    return <div className={className} onClick={this.checkboxClickHandler}></div>
  }
}
