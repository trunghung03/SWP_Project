import React from "react";
import ReactQuill, { Quill } from "react-quill"; // Corrected import
import "react-quill/dist/quill.snow.css";
// import ImageResize from "quill-image-resize-module"; 
// Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ 'align': [] }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
  // imageResize: {
  //   // Add the image resize module to the modules list
  //   parchment: Quill.import("parchment"),
  //   modules: ["Resize", "DisplaySize", "Toolbar"],
  // },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

function RichTextEditor({ value, onChange }) {
  return (
    <div className="ss_container">
      <div className="ss_row">
        <div className="ss_editor">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            className="ss_editor_input"
          />
        </div>
        <div
          className="ss_preview"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
}

export default RichTextEditor;
