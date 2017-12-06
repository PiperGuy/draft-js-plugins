import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState, Editor } from 'draft-js';
import TextareaAutosize from 'react-textarea-autosize';

class CellEditor extends React.Component {
  constructor(props) {
    super(props);
    const contentState =
      props.contentState || ContentState.createFromText('Content...');
    this.state = {
      editorState: EditorState.createWithContent(contentState),
    };
  }
  onChange = editorState => {
    this.props.onToggleReadOnly(true);

    this.setState({
      editorState,
    });

    this.props.onChange({
      contentState: this.state.editorState.getCurrentContent(),
    });
  };
  onClick = () => {
    this.editor.focus();
  };
  render() {
    return (
      <div onClick={this.onClick}>
        <Editor
          onBlur={this.onBlur}
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={element => {
            this.editor = element;
          }}
        />
      </div>
    );
  }
}

const AddColumn = ({ theme, position, onClick }) => (
  <span
    style={{ [position]: -13 }}
    onClick={onClick}
    className={theme.addColumnButton}
  >
    +
  </span>
);

class HeadingCell extends React.Component {
  render() {
    const {
      value,
      onChange,
      onToggleReadOnly,
      onAddColumnLeft,
      onAddColumnRight,
      theme,
    } = this.props;
    return (
      <InputCell
        theme={theme}
        onChange={onChange}
        value={value}
        textAreaStyle={theme.columnTextArea}
        onToggleReadOnly={onToggleReadOnly}
        render={({ showEditOptions }) => (
          <span>
            {showEditOptions && (
              <AddColumn
                onClick={onAddColumnLeft}
                theme={theme}
                position={'left'}
              />
            )}
            {showEditOptions && (
              <AddColumn
                onClick={onAddColumnRight}
                theme={theme}
                position={'right'}
              />
            )}
          </span>
        )}
      />
    );
  }
}

class RowCell extends React.Component {
  render() {
    const {
      value,
      onChange,
      onToggleReadOnly,
      theme,
      onRowEditOptions,
    } = this.props;
    return (
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
      />
    );
  }
}

class InputCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      showEditOptions: false,
    };
  }
  onChange = e => {
    this.setState({
      ...this.state,
      value: e.target.value,
    });
  };
  onFocus = () => {
    this.props.onToggleReadOnly(true);
    clearTimeout(this.timeout);
    this.setState({
      ...this.state,
      showEditOptions: true,
    });
  };
  onBlur = () => {
    this.props.onToggleReadOnly(false);
    this.timeout = setTimeout(() => {
      this.setState({
        ...this.state,
        showEditOptions: false,
      });
    }, 1000);
    this.props.onChange(this.state.value);
  };
  render() {
    return (
      <span className={this.props.theme.cellWrapper}>
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
      </span>
    );
  }
}

class CellWrapper extends React.Component {
  render() {
    return (
      <td
        data-value={this.props.value.trim()}
        data-label={this.props.label.trim()} // .trim() for white space on mobile
        className={this.props.theme.td}
      >
        <RowCell
          value={this.props.value}
          theme={this.props.theme}
          onToggleReadOnly={this.props.onToggleReadOnly}
          onChange={this.props.onChange}
          onRowEditOptions={this.props.onRowEditOptions}
        />
      </td>
    );
  }
}

export default class Table extends React.Component {
  state = {
    showEditOptions: false,
  };
  onChange = column => value => {
    const {
      blockProps: { columns, editColumn, getEditorState, setEditorState },
    } = this.props;
    setEditorState(
      editColumn({
        editorState: getEditorState(),
        columns,
        column: { ...column, value },
        block: this.props.block,
      })
    );
  };
  onChangeCell = ({ row, cell }) => value => {
    const {
      blockProps: { editCell, getEditorState, setEditorState },
    } = this.props;
    setEditorState(
      editCell({
        row,
        cell: { ...cell, value },
        editorState: getEditorState(),
        block: this.props.block,
      })
    );
  };
  onRowEditOptions = ({ row, cell }) => value => {
    console.log('Row Is being edited, ', row, cell, value);
  };
  addColumn = ({ column, index }) => () => {
    console.log('add column to index', index);
    const {
      blockProps: { addColumn, columns, rows, getEditorState, setEditorState },
    } = this.props;
    setEditorState(
      addColumn({
        columns,
        rows,
        index,
        editorState: getEditorState(),
        block: this.props.block,
      })
    );
  };
  render() {
    const {
      blockProps: { columns, rows },
      theme,
      onToggleReadOnly,
    } = this.props;
    return (
      <table className={theme.table}>
        <thead className={theme.thead}>
          <tr className={theme.tr}>
            {columns.map((col, i) => (
              <th key={col.key} className={theme.th}>
                <HeadingCell
                  value={col.value}
                  theme={theme}
                  onAddColumnLeft={this.addColumn({
                    col,
                    index: i === 0 ? 0 : i,
                  })}
                  onAddColumnRight={this.addColumn({ col, index: i + 1 })}
                  onToggleReadOnly={onToggleReadOnly}
                  onChange={this.onChange(col)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={theme.tbody}>
          {rows.map(row => (
            <tr key={row.key} className={theme.tr}>
              {row.value.map((cell, i) => (
                <CellWrapper
                  key={cell.key}
                  value={cell.value}
                  label={columns[i].value}
                  className={theme.td}
                  theme={theme}
                  onToggleReadOnly={onToggleReadOnly}
                  onChange={this.onChangeCell({ row, cell })}
                  onRowEditOptions={this.onRowEditOptions({ row, cell })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
