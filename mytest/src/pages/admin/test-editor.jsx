import EditorJS from "@editorjs/editorjs";
import { useEffect } from "react";
import Header from '@editorjs/header'
import List from '@editorjs/list'
import InlineCode from '@editorjs/inline-code'
import React from "react";

const TestEditor = () => {
  let editor;
  useEffect(() => {
    try {
      editor = new EditorJS({
        /**
         * Id of Element that should contain the Editor
         */

        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          inlineCode: InlineCode
        },
        onChange: (api, event) => {
          console.log('Now I know that Editor\'s content changed!', event)
        },
      });
    } catch (er) {
      console.log(er);
    }
  }, []);
  const onSave = () => {
    editor
      .save()
      .then(outputData => {
        console.log('Article data: ', outputData);
      })
      .catch(error => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <div style={{ paddingLeft: '20px' }}>
      <h1>Hello Editor!</h1>
      <button onClick={onSave}>Save</button>
      <div id="editorjs"></div>
      <hr />
      <div id="preview">Preview </div>
    </div>
  );
}

export default TestEditor