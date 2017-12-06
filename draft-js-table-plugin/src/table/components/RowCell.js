import React from 'react';
import InputCell from './InputCell';
import RowEditButtons from './RowEditButtons';

export default class RowCell extends React.Component {
  render() {
    const { value, label, onChange, onToggleReadOnly, theme } = this.props;
    return (
      <td
        data-value={value.trim()}
        data-label={label.trim()} // .trim() for white space on mobile
        className={theme.td}
      >
        <InputCell
          theme={theme}
          onChange={onChange}
          value={value}
          textAreaStyle={theme.rowTextArea}
          onToggleReadOnly={onToggleReadOnly}
          render={({ showEditOptions }) =>
            this.props.hasEditOptions &&
            showEditOptions && (
              <RowEditButtons
                theme={theme}
                onRowAddBefore={this.props.onRowAddBefore}
                onRowDelete={this.props.onRowDelete}
                onRowAddAfter={this.props.onRowAddAfter}
              />
            )
          }
        />
      </td>
    );
  }
}
