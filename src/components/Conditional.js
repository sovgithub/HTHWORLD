import { Component } from 'react';
import PropTypes from 'prop-types';

export class Try extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    condition: PropTypes.bool,
  };
}

export class Otherwise extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
}

export default class Conditional extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    for (let i = 0; i < children.length; i++) {
      const Child = children[i];

      const isTry = Child.type === Try;
      const isOtherwise = Child.type === Otherwise;

      if ((isTry && Child.props.condition) || isOtherwise) {
        return Child.props.children;
      }
    }

    return null;
  }
}
