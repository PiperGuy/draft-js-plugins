import React from 'react';
import InputCell from './InputCell';
import AddIcon from './AddIcon';
import MinusIcon from './MinusIcon';

const AddColumn = ({ theme, position, onClick }) => (
  <span
    style={{ [position]: 0 }}
    onClick={onClick}
    className={theme.addColumnButton}
  >
    <AddIcon />
  </span>
);
const RemoveColumn = ({ theme, position, onClick }) => (
  <span onClick={onClick} className={theme.removeColumnButton}>
    <MinusIcon />
  </span>
);

export default class Th extends React.Component {
  render() {
    const {
      value,
      onChange,
      onToggleReadOnly,
      onAddColumnLeft,
      onAddColumnRight,
      onRemoveColumn,
      theme,
    } = this.props;
    return (
      <th className={theme.th}>
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
              {showEditOptions &&
                onRemoveColumn && (
                  <RemoveColumn onClick={onRemoveColumn} theme={theme} />
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
      </th>
    );
  }
}
