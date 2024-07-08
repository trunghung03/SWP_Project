import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const ActionProvider = ({ setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Good day! Thank you for your visit. Are there anything I can help?', {
      widget: 'suggestions'
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleGenInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'hours':
        response = 'Our store is open from 8 a.m to 6 p.m through Monday to Saturday, and from 8 a.m to 5 p.m at Sunday. We look forward to your visit!';
        break;
      case 'location':
        response = 'We are located at FPT UNI. You can find directions [here/link to map].';
        break;
      default:
        response = 'I am not sure about that. Could you please ask something else?';
    }
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleProductInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'diamond collection':
        response = 'Certainly! We have a wide range of diamonds, including different cuts, carats, colors, and clarity grades. You can explore our collection [here/link to collection].';
        break;
      case 'custom jewelry design':
        response = 'Yes, we do! Our expert jewelers can help you design a custom piece. Please visit [link] for more details.';
        break;
      case 'diamond quality':
        response = 'All our diamonds come with a certification from reputable gemological laboratories such as GIA, AGS, or IGI. You can learn more about diamond grading [here/link to grading guide].';
        break;
      default:
        response = 'I am not sure about that. Could you please ask something else?';
    }
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePurchaseInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'place an order':
        response = 'You can place an order through our online store [link], or you can visit us in-store for personalized assistance.';
        break;
      case 'payment methods':
        response = 'We accept cash, bank transfer and VNPAY for both online and in-store purchases.';
        break;
      default:
        response = 'I am not sure about that. Could you please ask something else?';
    }
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUnknown = () => {
    const response = 'If you want to ask more, you can contact us through our hotline: 0795795959 or email: diamonddianjewelry@gmail.com.';
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUserMessage = (message) => {
    const userMessage = createChatBotMessage(message, { isUser: true });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleGenInfo,
            handleProductInfo,
            handlePurchaseInfo,
            handleUnknown,
            handleUserMessage,
            setState,
            createChatBotMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
