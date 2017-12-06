import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState, Editor } from 'draft-js';
import TextareaAutosize from 'react-textarea-autosize';

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

const AddColumn = ({ theme, position }) => (<span style={{ [position]: -13 }} className={theme.addColumnButton}>
+
</span>);

const ColumnHeading = ({ value, onChange, onToggleReadOnly, theme }) =>
  <InputCell
    theme={theme}
    onChange={onChange}
    value={value}
    textAreaStyle={theme.columnTextArea}
    onToggleReadOnly={onToggleReadOnly}
    render={({ showEditOptions }) => (<span>
      {showEditOptions && <AddColumn theme={theme} position={'left'} />}
      {showEditOptions && <AddColumn theme={theme} position={'right'} />}
    </span>)}
  />;

const RowCell = ({ value, onChange, onToggleReadOnly, theme, onRowEditOptions }) =>
  <InputCell
    theme={theme}
    onChange={onChange}
    value={value}
    textAreaStyle={theme.rowTextArea}
    onToggleReadOnly={onToggleReadOnly}
    render={({ showEditOptions }) => {
      if (showEditOptions) {
        onRowEditOptions(showEditOptions);
      }
    }}
  />;

class InputCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      showEditOptions: false,
    };
  }
  onChange = (e) => {
    this.setState({
      ...this.state,
      value: e.target.value
    });
  }
  onFocus = () => {
    this.props.onToggleReadOnly();
    clearTimeout(this.timeout);
    this.setState({
      ...this.state,
      showEditOptions: true
    });
  }
  onBlur = () => {
    this.props.onToggleReadOnly();
    this.timeout = setTimeout(() => {
      this.setState({
        ...this.state,
        showEditOptions: false
      });
    }, 1000);
    this.props.onChange(this.state.value);
  }
  render() {
    return (<span className={this.props.theme.cellWrapper}>
      {/* <input
        style={this.props.style}
        type="text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.value}
        onChange={this.onChange}
      /> */}
      <TextareaAutosize
        useCacheForDOMMeasurements
        className={this.props.textAreaStyle}
        style={{ resize: 'none' }}
        type="text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.value}
        onChange={this.onChange}
      />
      {this.props.render(this.state)}
    </span>);
  }
}

export default class Table extends React.Component {
  state = {
    showEditOptions: false
  }
  onChange = (column) => (value) => {
    const { blockProps: { columns, editColumn, getEditorState, setEditorState } } = this.props;
    setEditorState(
      editColumn({
        editorState: getEditorState(),
        columns,
        column: { ...column, value },
        block: this.props.block
      })
    );
  }
  onChangeCell = ({ row, cell }) => (value) => {
    const { blockProps: { editCell, getEditorState, setEditorState } } = this.props;
    setEditorState(
      editCell({
        row,
        cell: { ...cell, value },
        editorState: getEditorState(),
        block: this.props.block
      })
    );
  }
  onRowEditOptions = ({ row, cell }) => (value) => {
    console.log('Row Is being edited, ', row, cell, value)
  }
  render() {
    const { blockProps: { columns, rows }, theme, onToggleReadOnly } = this.props;
    return (
      <table
        className={theme.table}
      >
        <thead className={theme.thead}>
          <tr className={theme.tr}>
            {columns.map((col) => (<th key={col.key} className={theme.th}>
              <ColumnHeading
                value={col.value}
                theme={theme}
                onToggleReadOnly={onToggleReadOnly}
                onChange={this.onChange(col)}
              />
            </th>))}
          </tr>
        </thead>
        <tbody className={theme.tbody}>
          {rows.map((row) => (
            <tr key={row.key} className={theme.tr}>
              {row.value.map((cell, i) =>
                <td key={cell.key} data-label={columns[i].value} className={theme.td}>
                  <RowCell
                    value={cell.value}
                    theme={theme}
                    onToggleReadOnly={onToggleReadOnly}
                    onChange={this.onChangeCell({ row, cell })}
                    onRowEditOptions={this.onRowEditOptions({ row, cell })}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>);
  }
}
