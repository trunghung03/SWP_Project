import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello')) {
      actions.handleHello();
    } else if (lowerCaseMessage.includes('hours') || lowerCaseMessage.includes('time') || lowerCaseMessage.includes('when')) {
      actions.handleGenInfo('store hours');
    } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address') || lowerCaseMessage.includes('where') ) {
      actions.handleGenInfo('store location');
    } else if (lowerCaseMessage.includes('collection') ) {
      actions.handleProductInfo('diamond collection');
    } else if (lowerCaseMessage.includes('custom ') || lowerCaseMessage.includes('design')) {
      actions.handleProductInfo('custom jewelry design');
    } else if (lowerCaseMessage.includes('quality')) {
      actions.handleProductInfo('diamond quality');
    } else if (lowerCaseMessage.includes('order')) {
      actions.handlePurchaseInfo('place an order');
    } else if (lowerCaseMessage.includes('payment')) {
      actions.handlePurchaseInfo('payment methods');
    }
  };
  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
