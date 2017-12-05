import React from 'react';
import { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';
import { createTablePlugin, AddTable } from 'draft-js-table-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import mockUpload from '../Image/CustomImageEditor/mockUpload';
import createVideoPlugin from './Video';
import { EmojiSuggestions, EmojiSelect, emojiPlugin } from './Emoji';

const videoPlugin = createVideoPlugin();
const undoPlugin = createUndoPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();

const { SideToolbar } = sideToolbarPlugin;
const { UndoButton, RedoButton } = undoPlugin;
const { AlignmentTool } = alignmentPlugin;
const { VideoAdd } = videoPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

export const Tools = ({ editorState, onChange }) => <div>
  <AlignmentTool />
  <EmojiSuggestions />
  <EmojiSelect />
  <SideToolbar />
  <UndoButton />
  <RedoButton />
  <VideoAdd editorState={editorState} onChange={onChange} />
  <AddTable editorState={editorState} onChange={onChange} />
</div>;

export const plugins = ({ setReadOnly }) => [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  emojiPlugin,
  sideToolbarPlugin,
  undoPlugin,
  videoPlugin,
  createTablePlugin({ setReadOnly })
];
