import { AtomicBlockUtils, RichUtils } from 'draft-js';
import { List, Record } from 'immutable';
import * as types from '../constants';

const Column = Record(
  {
    key: null,
    value: '',
  },
  'Column'
);

export default function addTable(editorState, { columns, rows }) {
  if (RichUtils.getCurrentBlockType(editorState) === types.ATOMIC) {
    return editorState;
  }

  const contentState = editorState.getCurrentContent();

  const columnsMapped = Array.from({ length: columns }).map((_, i) => ({
    key: `Column${i}`,
    // contentState: ContentState.createFromText(`Column ${i + 1}`),
    value: `Column ${i + 1}`,
  }));

  const rowsMapped = Array.from({ length: rows }).map((_, i) => ({
    key: `Row${i}`,
    value: Array.from({ length: columns }).map((__, j) => ({
      key: `Row${i}Cell${j}`,
      value: `Cell ${j}`,
    })),
  }));

  const contentStateWithEntity = contentState.createEntity(
    types.TABLETYPE,
    'IMMUTABLE',
    { columns: columnsMapped, rows: rowsMapped }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
