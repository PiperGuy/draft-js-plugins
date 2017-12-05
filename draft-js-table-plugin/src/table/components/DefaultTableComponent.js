import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState, Editor } from 'draft-js';

class CellEditor extends React.Component {
  constructor(props) {
    super(props);
    const contentState = props.contentState || ContentState.createFromText('Content...');
    this.state = {
      editorState: EditorState.createWithContent(contentState)
    };
  }
  onChange = (editorState) => {
    this.props.onToggleReadOnly(true);

    this.setState({
      editorState
    });

    this.props.onChange({
      contentState: this.state.editorState.getCurrentContent()
    });
  }
  // onBlur = () => {
  //   console.log('onBlur!');
  //   this.props.onChange({
  //     contentState: this.state.editorState.getCurrentContent()
  //   });
  // }
  onClick = () => {
    this.editor.focus();
  }
  render() {
    return (<div onClick={this.onClick}>
      <Editor
        onBlur={this.onBlur}
        editorState={this.state.editorState}
        onChange={this.onChange}
        ref={(element) => { this.editor = element; }}
      />
    </div>);
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e.target.value);
  }
  render() {
    return (<input
      type="text"
      onFocus={this.props.onToggleReadOnly}
      onBlur={this.props.onToggleReadOnly}
      value={this.state.value}
      onChange={this.onChange}
    />);
  }
}

export default class Table extends React.Component {
  onChange = (column) => (value) => {
    const { blockProps: { cols, editColumn, getEditorState, setEditorState } } = this.props;
    console.log('Table OnChange', this.props.block)
    console.log('this.props', this.props)
    setEditorState(
      editColumn({
        editorState: getEditorState(),
        columns: cols,
        column: { ...column, value },
        block: this.props.block
      })
    );
  }
  render() {
    const { blockProps: { cols }, theme, onToggleReadOnly } = this.props;
    return (<table className={theme.tableWrapper}>
      <tbody>
        <tr>
          {/* {cols.map((col) => (<th key={col.key}>
            <CellEditor
              theme={theme}
              contentState={col.contentState}
              onChange={this.onChange(col)}
              onToggleReadOnly={onToggleReadOnly}
            />
          </th>))} */}
          {cols.map((col) => (<th key={col.key}>
            <Cell value={col.value} onToggleReadOnly={onToggleReadOnly} onChange={this.onChange(col)} />
          </th>))}
        </tr>
      </tbody>
    </table>);
  }
}
