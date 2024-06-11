import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const modules = {
    toolbar: [
        [{header: [1,2,3,4,5,6,false]}],
        [{font: []}]
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" }, 
            { list: "bullet" },
            { indent: "-1"},
            {indent: "+1"},
        ],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ],
    };

const content = () => {
    const[value, setValue] = useState('');
  return (
    <div className="container">
      <div className="row">
        <div className="editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={() => setValue(e.target.value)}
                modules={modules}
                formats={formats}
                className="editor_input"
            />
        </div>
        <div className="preview" dangerouslySetInnerHTML={{__html:value}}></div>
      </div>
    </div>
  );
};
export default content;
