import React from 'react';
import AddIcon from './AddIcon';
import MinusIcon from './MinusIcon';

export default ({ theme, onRowDelete, onRowAddAfter, onRowAddBefore }) => (
  <span className={theme.rowEdit}>
    <AddIcon onClick={onRowAddBefore} />
    {onRowDelete && <MinusIcon onClick={onRowDelete} />}
    <AddIcon onClick={onRowAddAfter} />
  </span>
);
