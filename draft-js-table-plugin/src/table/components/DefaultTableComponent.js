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
  }
  onBlur = () => {
    console.log('onBlur!');
    this.props.onChange({
      contentState: this.state.editorState.getCurrentContent()
    });
  }
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

export default class Table extends React.Component {
  onChange = (column) => ({ contentState }) => {
    console.log('this.props', this.props);
    console.log('column', column);
  }
  render() {
    const { blockProps: { cols, onToggleReadOnly }, theme } = this.props;
    return (<table className={theme.tableWrapper}>
      <tbody>
        <tr>
          {cols.map((col) => (<th key={col.key}>
            <CellEditor
              theme={theme}
              contentState={col.contentState}
              onChange={this.onChange(col)}
              onToggleReadOnly={onToggleReadOnly}
            />
          </th>))}
        </tr>
      </tbody>
    </table>);
  }
}
