import React from "react";

class Square extends React.Component<{classNames: string, value: string, onClick: () => void}> {
  render() {
    return (
      <button
        className={this.props.classNames ? this.props.classNames : ''}
        onClick={()=> {
          this.props.onClick();
        }}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
