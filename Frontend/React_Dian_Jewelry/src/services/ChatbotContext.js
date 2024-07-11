import React, { createContext, useState, useContext } from 'react';

const ChatbotContext = createContext();

export const useChatbot = () => {
    return useContext(ChatbotContext);
};

export const ChatbotProvider = ({ children }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <ChatbotContext.Provider value={{ isChatbotOpen, setIsChatbotOpen }}>
            {children}
        </ChatbotContext.Provider>
    );
};
