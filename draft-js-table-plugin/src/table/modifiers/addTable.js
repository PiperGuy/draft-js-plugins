import {
  AtomicBlockUtils,
  RichUtils,
  ContentState
} from 'draft-js';

import * as types from '../constants';

export default function addTable(editorState, { cols }) {
  if (RichUtils.getCurrentBlockType(editorState) === types.ATOMIC) {
    return editorState;
  }

  const contentState = editorState.getCurrentContent();
  const columns = Array.from({ length: cols }).map((u, i) => ({
    key: `Column${i}`,
    contentState: ContentState.createFromText(`Column ${i + 1}`)
  }));

  const contentStateWithEntity = contentState.createEntity(
    types.TABLETYPE,
    'IMMUTABLE',
    { cols: columns }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
