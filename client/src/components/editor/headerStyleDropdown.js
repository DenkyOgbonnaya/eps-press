import React from "react";
class HeaderStyleDropdown extends React.Component {
  
  onToggle = event => {
    let value = event.target.value
    this.props.onToggle(value)
  }
  
  render() {
    return (
      <select value={this.props.active} onChange={this.onToggle}>
        <option value="">H</option>
        {this.props.headerOptions.map(heading => 
            <option key={heading.label} value={heading.style}>
              {heading.label}
            </option>)}
      </select>
    )}
}
export default HeaderStyleDropdown