import React, { useState } from 'react';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftField = ({label, className, name, placeholder}) => {
    const [editorStatee, setEditorStatee] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState)=>{
        console.log(editorState);
        setEditorStatee(editorState)
    }
    const uploadImageCallBack = (file)=>{
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID a8534d42ecc960b');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              console.log(response)
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              console.log(error)
              reject(error);
            });
          }
        );
      }
    return (
        <div className={`draft_editor ${className} mb-3`}>
            <Editor
            editorState={editorStatee}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
              }}
            />
        </div>
    );
}

export default DraftField;
