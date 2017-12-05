import React, { Component } from 'react';

export default class TableAdd extends Component {
  // Start the popover closed
  state = {
    columns: 3,
    rows: 2,
    open: false,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addTable = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, { columns: this.state.columns, rows: this.state.rows }));
  };

  changeCols = (evt) => {
    this.setState({ ...this.state, columns: evt.target.value });
  };
  changeRows = (evt) => {
    this.setState({ ...this.state, rows: evt.target.value });
  };

  render() {
    return (
      <div>
        <button
          onMouseUp={this.openPopover}
          type="button"
        >
          +
        </button>
        <div
          onClick={this.onPopoverClick}
          style={{
            display: this.state.open ? 'block' : 'none'
          }}
        >
          <input
            type="text"
            placeholder="Cols"
            onChange={this.changeCols}
            value={this.state.columns}
          />
          <input
            type="text"
            placeholder="Rows"
            onChange={this.changeRows}
            value={this.state.rows}
          />
          <button
            type="button"
            onClick={this.addTable}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
