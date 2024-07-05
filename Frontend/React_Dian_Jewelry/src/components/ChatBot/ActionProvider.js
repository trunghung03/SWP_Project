import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleGenInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'store hours':
        response = 'Our store is open from 9 a.m to 8 p.m for the whole week. We look forward to your visit!';
        break;
      case 'store location':
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
        response = 'We accept all major credit cards, PayPal, and bank transfers. For in-store purchases, we also accept cash.';
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
    const response = 'Please contact us at our email: support@ourstore.com or call our hotline: 090909090';
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
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
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
