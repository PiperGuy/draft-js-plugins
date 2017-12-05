import { EditorState , convertToRaw} from 'draft-js';

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
  const updatedContentState = contentState.replaceEntityData(
    entityKey,
    {
      cols: updated
    }
  );
  return EditorState.push(
    editorState,
    updatedContentState,
    'apply-entity'
  );
};


export const addColumn = ({
  editorState,
  columns,
  index,
  block
}) => {
  const blankColumn = {
    key: `ColumnInserted${index}${columns.length}`,
    value: 'Column'
  };
  const newColumnIndex = index < 0 ? 0 : index;
  const updated = [...columns.slice(0, newColumnIndex), blankColumn, ...columns.slice(newColumnIndex)];
  const contentState = editorState.getCurrentContent();
  const entityKey = block.getEntityAt(0);
  const updatedContentState = contentState.replaceEntityData(
    entityKey,
    {
      cols: updated
    }
  );

  const updatedEditorState = EditorState.push(
    editorState,
    updatedContentState,
    'apply-entity'
  );
  // https://github.com/facebook/draft-js/issues/1047#issuecomment-283453223
  return EditorState.forceSelection(updatedEditorState, updatedEditorState.getSelection());
};
