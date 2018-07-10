import React, {Component} from 'react';

class Header extends Component {
  componentWillUpdate(nextProps) {
    console.log(nextProps)
  }
  render() {
    const {id, text, completed} = this.props;
    return (
      <p>test header</p>
    )
  }
}

export default Header;