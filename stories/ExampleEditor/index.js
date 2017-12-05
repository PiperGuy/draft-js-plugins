import React, { Component } from 'react';
import {
  convertFromRaw,
  EditorState,
  convertToRaw
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import initialState from './initialState';
import { plugins, Tools } from './config';

import editorStyles from './editorStyles.css';

export default class ExampleEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    readOnly: false
  };
  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  setReadOnly = (readOnly) => {
    console.log('setReadOnly', readOnly)
    this.setState({
      ...this.state,
      readOnly
    });
  }
  logState = () => {
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
  }
  focus = () => {
    this.editor.focus();
  };
  plugins = plugins({ setReadOnly: this.setReadOnly });
  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            readOnly={this.state.readOnly}
            plugins={this.plugins}
            ref={(element) => { this.editor = element; }}
          />
        </div>

        <Tools editorState={this.state.editorState} onChange={this.onChange} />
        <button onClick={this.logState}>
          Log State
        </button>
      </div>
    );
  }
}
