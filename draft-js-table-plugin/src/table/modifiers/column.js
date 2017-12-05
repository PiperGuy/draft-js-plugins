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
  if (!entityKey) {
    return editorState;
  }
  const updatedContentState = contentState.replaceEntityData(
    entityKey,
    {
      cols: updated
    }
  );
  return EditorState.push(
    editorState,
    updatedContentState,
    'insert-fragment'
  );
};
