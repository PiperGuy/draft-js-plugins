import decorateComponentWithProps from 'decorate-component-with-props';
import DefaultTableComponent from './table/components/DefaultTableComponent';
import * as types from './table/constants';
import tableStyles from './tableStyles.css';

const defaultTheme = tableStyles;
export default ({ tableComponent, theme, decorator } = {}) => {
  const tableTheme = theme || defaultTheme;
  let Table = tableComponent || DefaultTableComponent;
  if (decorator) {
    Table = decorator(Table);
  }
  const ThemedTable = decorateComponentWithProps(Table, { theme: tableTheme });
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const { cols } = entity.getData();
        if (type === types.TABLETYPE) {
          return {
            component: ThemedTable,
            editable: true,
            props: {
              cols
            },
          };
        }
      }

      return null;
    },
    types,
  };
};
