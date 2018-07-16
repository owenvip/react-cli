import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';

@inject(({ store: { testState } }) => ({ testState }))
@observer
export default class Home extends Component {
  static get propTypes() {
    return {
      testState: MobxPropTypes.observableObject,
    };
  }

  changeName = (e) => {
    this.props.testState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        首页
        <span>{this.props.testState.name}</span>
        <input type="text" onChange={this.changeName} />
      </div>
    )
  }
}
