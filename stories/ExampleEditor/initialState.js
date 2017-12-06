/* eslint-disable */
const initialState = {
  entityMap: {
    '0': {
      type: 'image',
      mutability: 'IMMUTABLE',
      data: { src: '/images/canada-landscape-small.jpg' },
    },
    '1': {
      type: 'draft-js-table-test-plugin-video',
      mutability: 'IMMUTABLE',
      data: {
        columns: [
          { key: 'Column0', value: 'Column 1' },
          { key: 'Column1', value: 'Column 2' },
          { key: 'Column2', value: 'Column 3' },
        ],
        rows: [
          {
            key: 'Row0',
            value: [
              { key: 'Row0Cell0', value: 'Cell 0' },
              { key: 'Row0Cell1', value: 'Cell 1' },
              { key: 'Row0Cell2', value: 'Cell 2' },
            ],
          },
          {
            key: 'Row1',
            value: [
              { key: 'Row1Cell0', value: 'Cell 0' },
              { key: 'Row1Cell1', value: 'Cell 1' },
              { key: 'Row1Cell2', value: 'Cell 2' },
            ],
          },
        ],
      },
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 1, key: 0 }],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'See advanced examples further down …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '5u6i5',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 1, key: 1 }],
      data: {},
    },
    {
      key: 'eps72',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */

export default initialState;
