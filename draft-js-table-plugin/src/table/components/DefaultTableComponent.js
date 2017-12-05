import React from 'react';
import PropTypes from 'prop-types';

const AddColumn = ({ onClick, position }) =>
  <div
    onClick={onClick}
    style={{
      position: 'absolute',
      [position]: '0px',
      fontSize: '1rem',
      padding: 5,
      borderRadius: '100px',
      cursor: 'pointer',
      background: 'gray',
      color: 'white',
      top: 1
    }}
  >
   +
  </div>;

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      columnOptions: false
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e.target.value);
  }

  showOptions = () => {
    clearTimeout(this.timeout);
    // this.setState({
    //   ...this.state,
    //   columnOptions: true
    // });
    this.props.setReadOnly(true);
  }
  hideOptions = () => {
    this.timeout = setTimeout(() => {
      // this.setState({
      //   ...this.state,
      //   columnOptions: false
      // });
      this.props.setReadOnly(false);
    }, 1000);
  }
  render() {
    const { theme } = this.props;
    return (<span className={theme.columnOptions} onMouseOver={this.showOptions} onMouseOut={this.hideOptions}>
      <input
        type="text"
        onFocus={this.showOptions}
        onBlur={this.hideOptions}
        value={this.state.value}
        onChange={this.onChange}
      />
      {this.state.columnOptions && <AddColumn position="left" onClick={this.props.onAddColumnLeft} />}
      {this.state.columnOptions && <AddColumn position="right" onClick={this.props.onAddColumnRight} />}
    </span>);
  }
}

export default class Table extends React.Component {
  onChange = (column) => (value) => {
    const { blockProps: { cols, editColumn, getEditorState, setEditorState } } = this.props;
    setEditorState(
      editColumn({
        editorState: getEditorState(),
        columns: cols,
        column: { ...column, value },
        block: this.props.block
      })
    );
  }
  onAddColumn = (index) => () => {
    const { blockProps: { cols, addColumn, getEditorState, setEditorState } } = this.props;
    setEditorState(addColumn({
      columns: cols,
      index,
      editorState: getEditorState(),
      block: this.props.block
    }));
  }
  render() {
    const { blockProps: { cols }, theme, setReadOnly } = this.props;
    return (
      <table className={theme.tableWrapper}>
        <tbody>
          <tr>
            {cols.map((col, i) => (<th key={col.key}>
              <Cell
                theme={theme}
                value={col.value}
                setReadOnly={setReadOnly}
                onChange={this.onChange(col)}
                onAddColumnLeft={this.onAddColumn(i - 1)}
                onAddColumnRight={this.onAddColumn(i + 1)}
              />
            </th>))}
          </tr>
        </tbody>
      </table>
    );
  }
}
