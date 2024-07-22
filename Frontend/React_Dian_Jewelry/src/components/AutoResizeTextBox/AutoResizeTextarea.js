// src/components/AutoResizeTextarea.js
import React, { useEffect, useRef } from 'react';

const AutoResizeTextarea = ({ name, value, onChange, maxLength }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);
    autoResize();
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (
    <textarea
      name={name}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      style={{ width: '100%', minHeight: '50px', resize: 'none', overflow: 'hidden' }}
    />
  );
};

export default AutoResizeTextarea;
