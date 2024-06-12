import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RichTextEditor from "./RichText";
import "../../../styles/SalesStaff/SalesStaffManageContent/RichTextPage.scss"; // Different CSS for this page

function RichTextPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // Attempt to load initial content from localStorage, then from location.state, or use an empty string as a fallback
    const [content, setContent] = useState(() => {
        const storedContent = localStorage.getItem('richTextContent');
        return storedContent ? storedContent : (location.state ? location.state.content : "");
    });

    const handleSaveChanges = () => {
        // Save the updated content to localStorage
        localStorage.setItem('richTextContent', content);
        // Navigate back
        navigate('/sales-staff-add-content');
    };

    return (
        <div className="ss_rich_text_page">
            <h2 className="ss_rich_text_page_title">Edit Content on New Page</h2>
            <button onClick={handleSaveChanges} className="ss_button_save_changes">Save Changes</button>
            <RichTextEditor
                className="ss_add_rich_text"
                value={content}
                onChange={setContent}
            />           
        </div>
    );
}

export default RichTextPage;
