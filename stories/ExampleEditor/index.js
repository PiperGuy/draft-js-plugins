import React, { Component } from 'react';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import initialState from './initialState';
import { plugins, Tools } from './config';

import editorStyles from './editorStyles.css';

export default class ExampleEditor extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    readOnly: false,
  };
  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  onToggleReadOnly = readOnly => {
    this.setState({
      ...this.state,
      readOnly,
    });
  };
  logState = () => {
    console.log(
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  };
  focus = () => {
    this.editor.focus();
  };
  plugins = plugins({ onToggleReadOnly: this.onToggleReadOnly });
  render() {
    return (
      <div>
        <Tools editorState={this.state.editorState} onChange={this.onChange} />

        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            readOnly={this.state.readOnly}
            plugins={this.plugins}
            ref={element => {
              this.editor = element;
            }}
          />
        </div>
        <button onClick={this.logState}>Log State</button>
      </div>
    );
  }
}
