import React, { Component } from 'react'

export default class FocusInput extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount () {
    console.warn('componentDidMount')
    this.inputRef.current.focus()
  }

  render () {
    return (
      <input
        ref={this.inputRef}
        type={this.props.type}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e)}
        onKeyPress={(e) => this.props.onKeyPress(e)}
        pattern={this.props.pattern}
        placeholder={this.props.placeholder}        
      />
    )
  }
}