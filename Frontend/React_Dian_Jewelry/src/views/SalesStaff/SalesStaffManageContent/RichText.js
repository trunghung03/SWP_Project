import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../styles/SalesStaff/SalesStaffManageContent/RichText.scss";

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
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'code-block'
];

function RichTextEditor({ value, onChange }) {
    return (
        <div className="container1">
                <div className="editor1">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={onChange}
                        modules={modules}
                        formats={formats}
                        className="editor_input"
                    />
                </div>
                <div className="preview1" dangerouslySetInnerHTML={{ __html: value }}></div>

        </div>
    );
}

export default RichTextEditor;
