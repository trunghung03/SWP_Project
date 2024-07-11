import React from 'react';
import './SuggestionWidget.scss';

const SuggestionWidget = ({ actions, setState, widgetParams }) => {
    console.log('SuggestionWidget widgetParams:', widgetParams);

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

    const renderSuggestions = () => {
        switch (widgetParams?.type) {
            case 'helloSuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('Where is your store?', () => actions.handleGenInfo('location'))}>
                            Where is your store?
                        </button>
                        <button onClick={() => handleSuggestionClick('What time does your store open?', () => actions.handleGenInfo('hours'))}>
                            What time does your store open?
                        </button>
                        <button onClick={() => handleSuggestionClick('Which payment methods do you accept?', () => actions.handlePurchaseInfo('payment methods'))}>
                            Which payment methods do you accept?
                        </button>
                    </>
                );
            case 'GIASuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is diamond 4Cs?', () => actions.handleProductInfo('4Cs'))}>
                            What is diamond 4Cs?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond colors?', () => actions.handleProductInfo('diamondColor'))}>
                            What is diamond colors?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond clarity?', () => actions.handleProductInfo('diamondClarity'))}>
                            What is diamond clarity?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond carat?', () => actions.handleProductInfo('diamondCarat'))}>
                            What is diamond carat?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond cut?', () => actions.handleProductInfo('diamondCut'))}>
                            What is diamond cut?
                        </button>
                    </>
                );
            case '4CsSuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond colors?', () => actions.handleProductInfo('diamondColor'))}>
                            What is diamond colors?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond clarity?', () => actions.handleProductInfo('diamondClarity'))}>
                            What is diamond clarity?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond carat?', () => actions.handleProductInfo('diamondCarat'))}>
                            What is diamond carat?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond cut?', () => actions.handleProductInfo('diamondCut'))}>
                            What is diamond cut?
                        </button>
                    </>
                );
            case 'diamondColorSuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond 4Cs?', () => actions.handleProductInfo('4Cs'))}>
                            What is diamond 4Cs?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond clarity?', () => actions.handleProductInfo('diamondClarity'))}>
                            What is diamond clarity?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond carat?', () => actions.handleProductInfo('diamondCarat'))}>
                            What is diamond carat?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond cut?', () => actions.handleProductInfo('diamondCut'))}>
                            What is diamond cut?
                        </button>
                    </>
                );
            case 'diamondClaritySuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond 4Cs?', () => actions.handleProductInfo('4Cs'))}>
                            What is diamond 4Cs?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond colors?', () => actions.handleProductInfo('diamondColor'))}>
                            What is diamond colors?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond carat?', () => actions.handleProductInfo('diamondCarat'))}>
                            What is diamond carat?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond cut?', () => actions.handleProductInfo('diamondCut'))}>
                            What is diamond cut?
                        </button>
                    </>
                );
            case 'diamondCaratSuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond 4Cs?', () => actions.handleProductInfo('4Cs'))}>
                            What is diamond 4Cs?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond colors?', () => actions.handleProductInfo('diamondColor'))}>
                            What is diamond colors?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond clarity?', () => actions.handleProductInfo('diamondClarity'))}>
                            What is diamond clarity?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond cut?', () => actions.handleProductInfo('diamondCut'))}>
                            What is diamond cut?
                        </button>
                    </>
                );
            case 'diamondCutSuggest':
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond 4Cs?', () => actions.handleProductInfo('4Cs'))}>
                            What is diamond 4Cs?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond colors?', () => actions.handleProductInfo('diamondColor'))}>
                            What is diamond colors?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond clarity?', () => actions.handleProductInfo('diamondClarity'))}>
                            What is diamond clarity?
                        </button>
                        <button onClick={() => handleSuggestionClick('What is diamond carat?', () => actions.handleProductInfo('diamondCarat'))}>
                            What is diamond carat?
                        </button>
                    </>
                );
            default:
                return (
                    <>
                        <button onClick={() => handleSuggestionClick('What is GIA Diamond Certification?', () => actions.handleProductInfo('GIA'))}>
                            What is GIA Diamond Certification?
                        </button>
                    </>
                );
        }
    };

    return (
        <div className='suggest_message'>
            {renderSuggestions()}
        </div>
    );
};

export default SuggestionWidget;
