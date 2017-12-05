import {
  AtomicBlockUtils,
  RichUtils
} from 'draft-js';
import { List, Record } from 'immutable';
import * as types from '../constants';

const Column = Record({
  key: null,
  value: ''
}, 'Column');

export default function addTable(editorState, { cols }) {
  if (RichUtils.getCurrentBlockType(editorState) === types.ATOMIC) {
    return editorState;
  }

  const contentState = editorState.getCurrentContent();

  // const columns = Array.from({ length: cols }).reduce((acc, _, i) => {
  //   const column = Column({
  //     key: `Column${i}`,
  //     // contentState: ContentState.createFromText(`Column ${i + 1}`),
  //     value: `Column ${i + 1}`
  //   });
  //   return acc.set(i, column);
  // }, List());

  const columns = Array.from({ length: cols }).map((_, i) => ({
    key: `Column${i}`,
    // contentState: ContentState.createFromText(`Column ${i + 1}`),
    value: `Column ${i + 1}`
  }));

  const contentStateWithEntity = contentState.createEntity(
    types.TABLETYPE,
    'IMMUTABLE',
    { cols: columns }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
