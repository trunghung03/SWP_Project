import React from 'react';
import './SuggestionWidget.scss';

const SuggestionWidget = ({ actions, setState }) => {
    const handleSuggestionClick = (message, action) => {
        const userMessage = { message, type: 'user', id: Math.random(), withAvatar: true, delay: 0 };

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, userMessage],
        }));

        setTimeout(() => {
            action();
        }, 500);
    };

    return (
        <div className='suggest_message'>
            <button onClick={() => handleSuggestionClick('Where is your store?', () => actions.handleGenInfo('location'))}>
                Where is your store?
            </button>
            <button onClick={() => handleSuggestionClick('What time does your store open?', () => actions.handleGenInfo('hours'))}>
                What time does your store open?
            </button>
            <button onClick={() => handleSuggestionClick('Which payment methods do you accept?', () => actions.handlePurchaseInfo('payment methods'))}>
                Which payment methods do you accept?
            </button>
        </div>
    );
};

export default SuggestionWidget;
