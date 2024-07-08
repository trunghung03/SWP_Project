import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const trimmedMessage = message.trim().toLowerCase();

    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.includes('hello') || trimmedMessage.includes('hi')) {
      actions.handleHello();
    } else if (trimmedMessage.includes('hours') || trimmedMessage.includes('time') || trimmedMessage.includes('open') || trimmedMessage.includes('working')) {
      actions.handleGenInfo('hours');
    } else if (trimmedMessage.includes('location') || trimmedMessage.includes('address') || trimmedMessage.includes('where')) {
      actions.handleGenInfo('location');
    } else if (trimmedMessage.includes('collection')) {
      actions.handleProductInfo('diamond collection');
    } else if (trimmedMessage.includes('custom') || trimmedMessage.includes('design')) {
      actions.handleProductInfo('custom jewelry design');
    } else if (trimmedMessage.includes('quality')) {
      actions.handleProductInfo('diamond quality');
    } else if (trimmedMessage.includes('order')) {
      actions.handlePurchaseInfo('place an order');
    } else if (trimmedMessage.includes('payment')) {
      actions.handlePurchaseInfo('payment methods');
    } else {
      actions.handleUnknown();
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
