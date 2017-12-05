import decorateComponentWithProps from 'decorate-component-with-props';
import DefaultTableComponent from './table/components/DefaultTableComponent';
import * as types from './table/constants';
import tableStyles from './tableStyles.css';
import { editColumn, addColumn } from './table/modifiers/column';

const defaultTheme = tableStyles;
export default ({ tableComponent, setReadOnly, theme, decorator } = {}) => {
  const tableTheme = theme || defaultTheme;
  let Table = tableComponent || DefaultTableComponent;
  if (decorator) {
    Table = decorator(Table);
  }
  const ThemedTable = decorateComponentWithProps(Table, {
    theme: tableTheme,
    setReadOnly,
  });

  return {
    blockRendererFn: (block, { getEditorState, setEditorState }) => {
      if (block.getType() === types.ATOMIC) {
        try {
          // TODO subject to change for draft-js next release
          const contentState = getEditorState().getCurrentContent();
          const entity = contentState.getEntity(block.getEntityAt(0));
          console.log('block', block);
          if (!entity) {
            return null;
          }
          const type = entity.getType();
          const { cols } = entity.getData();
          if (type === types.TABLETYPE) {
            return {
              component: ThemedTable,
              editable: true,
              props: {
                cols,
                getEditorState,
                setEditorState,
                editColumn,
                addColumn
              },
            };
          }
        } catch (e) {
          return null;
        }
      }

      return null;
    },
    types,
  };
};
