import { EditorState } from 'draft-js';

export const editColumn = ({
  editorState,
  columns,
  column,
  block
}) => {
  const updated = columns.map((col) => {
    if (col.key === column.key) {
      return { ...col, value: column.value };
    }
    return col;
  });
  const contentState = editorState.getCurrentContent();
  const entityKey = block.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);
  const { rows } = entity.getData();

  if (!entityKey) {
    return editorState;
  }
  const updatedContentState = contentState.replaceEntityData(
    entityKey,
    {
      columns: updated,
      rows
    }
  );
  return EditorState.push(
    editorState,
    updatedContentState,
    'insert-fragment'
  );
};

export const editCell = ({
  editorState,
  cell,
  row,
  block
}) => {
  console.log('Editing Cell', cell, row);
  const updatedRow = row.value.map((c) => {
    console.log('c.key === cell.key', c.key === cell.key, c.key, cell.key, cell.value);
    return {
      ...c,
      value: c.key === cell.key ? cell.value : c.value
    }
  });
  console.log('updatedRow', updatedRow);

  const contentState = editorState.getCurrentContent();
  const entityKey = block.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);
  console.log('entity key editing cell', entityKey);
  if (!entity) {
    return editorState;
  }
  const { columns, rows } = entity.getData();

  const updatedRows = rows.map((r) => {
    if (r.key === row.key) {
      return { key: row.key, value: updatedRow };
    }
    return r;
  });
  console.log('updated rows', updatedRows);
  const updatedContentState = contentState.replaceEntityData(
    entityKey,
    {
      columns,
      rows: updatedRows
    }
  );
  return EditorState.push(
    editorState,
    updatedContentState,
    'insert-fragment'
  );
};
