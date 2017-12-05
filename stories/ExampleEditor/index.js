import React, { Component } from 'react';
import {
  convertFromRaw,
  EditorState,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import initialState from './initialState';
import { plugins, Tools } from './config';

import editorStyles from './editorStyles.css';

export default class ExampleEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            readOnly={this.state.readOnly}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
        </div>

        <Tools editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}
