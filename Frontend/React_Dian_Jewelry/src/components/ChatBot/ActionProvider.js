import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const ActionProvider = ({ setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Good day! Thank you for your visit. Are there anything I can help?', {
      widget: 'suggestions',
      widgetParams: { type: 'helloSuggest' }
    });

    console.log('handleHello widgetParams:', { type: 'helloSuggest' });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      widgetParams: { type: 'helloSuggest' }
    }));
  };

  const handleProductInfo = (infoType) => {
    let response;
    let widgetParams;
    switch (infoType) {
      case 'GIA':
        response = 'GIA (Gemological Institute of America) of diamond is really shorthand diamond sellers use to describe diamonds that have been graded by GIA. GIA is an independent, nonprofit organization that conducts gem research, educates gem professionals and sets the standards for determining diamond quality.';
        widgetParams = { type: 'GIASuggest' };
        break;
      case '4Cs':
        response = 'The 4Cs are the globally accepted standard for assessing the quality of a diamond - color, clarity, cut and carat weight.';
        widgetParams = { type: '4CsSuggest' };
        break;
      case 'diamondColor':
        response = 'Diamond color has the scale ranges from D which is totally colorless to Z which is a pale yellow or brown color. Brown diamonds darker than K color are usually described using their letter grade, and a descriptive phrase, for example M Faint Brown. Diamonds with more depth of color than Z color fall into the fancy color diamond range.';
        widgetParams = { type: 'diamondColorSuggest' };
        break;
      case 'diamondClarity':
        response = 'Diamond clarity is a measure of the purity and rarity of the stone, graded by the visibility of these characteristics under 10-power magnification. A stone is graded as flawless if, under 10-power magnification, no inclusions (internal flaws) and no blemishes (external imperfections) are visible.';
        widgetParams = { type: 'diamondClaritySuggest' };
        break;
      case 'diamondCarat':
        response = 'Diamond carat weight measures a diamond\'s apparent size. To put it simply, diamond carat weight measures how much a diamond weighs. A metric carat is defined as 200 milligrams. Each carat is subdivided into 100 points. This allows very precise measurements to the hundredth decimal place.';
        widgetParams = { type: 'diamondCaratSuggest' };
        break;
      case 'diamondCut':
        response = 'Diamond cut refers to a diamond\'s facets, symmetry, and dimensions. It describes the way a diamond reflects light, not how the diamond is outwardly shaped. Emerald and Radiant cut diamonds are a great example of the difference between cut and shape.';
        widgetParams = { type: 'diamondCutSuggest' };
        break;
      case 'ringSize':
        response = 'test ring';
        break;
      case 'earringsSize':
        response = 'test earring';
        break;
      case 'braceletSize':
        response = 'test bracelet';
        break;
      case 'necklaceSize':
        response = 'test necklace';
        break;
      case 'shape':
        response = 'Here we have various type of diamond shapes for you, from simple shape like round or oval to the most complex one is heart. All the shapes we have is round, oval, emerald, cushion, pear, radiant, princess, marquise, asscher and heart.';
        break;
      case 'size':
        response = 'Do you want to ask about the size of which kind of jewelry?';
        break;
      case 'VIP':
        response = 'test vip';
        break;
      default:
        response = 'I am not sure about that. If you cannot find the answer here, you can contact us directly through hotline: 0795795959 or email: diamonddianjewelry@gmail.com. We will reply as soon as possible.';
    }
    const botMessage = createChatBotMessage(response, { widget: 'suggestions', widgetParams });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      widgetParams: widgetParams
    }));
  };

  const handleGenInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'hours':
        response = 'Our store is open from 8 a.m to 6 p.m through Monday to Saturday, and from 8 a.m to 5 p.m at Sunday. We look forward to your visit!';
        break;
      case 'location':
        response = 'We are located at Thu Duc HCM. You can find the direction with Google Map by clicking the address at the top left of our website.';
        break;
      case 'contact':
        response = 'You can contact us through our hotline: 0795795959 or email: diamonddianjewelry@gmail.com for the fastest reply, you can also contact us through Facebook, Instagram or Tiktok.';
        break;
      case 'sell':
        response = 'Here we have many types of diamond jewelry, including rings, necklaces, earrings, bracelets, engagement and wedding jewelry. With many beautiful and modern jewelry collections with diversity shape.';
        break;
      case 'social':
        response = 'We have Facebook, Instagram and also TikTok social media account. You can visit us by clicking the corresponding social media icon at the end of our website.';
        break;
      case 'account':
        response = 'By clicking the user icon at top right of website then click "Sign in". You can sign in with a signed account or a Google account, or you can sign up a new account if you don\'t have one.';
        break;
      case 'deactivate':
        response = 'If your account has been deactivated by mistake, please contact us through hotline: 0795795959 or email: diamonddianjewelry@gmail.com for the fastest reply.';
        break;
      case 'password':
        response = 'If you forgot your account password, you can click "Forgot password" on the sign in page and enter your account email to reset the password. Or if you want to change the password, go to "My profile" to change it by entering the current password and the new password.';
        break;
      default:
        response = 'I am not sure about that. If you cannot find the answer here, you can contact us directly through hotline: 0795795959 or email: diamonddianjewelry@gmail.com. We will reply as soon as possible.';
    }
    const botMessage = createChatBotMessage(response, {
      withAvatar: true,
      delay: 500,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePurchaseInfo = (infoType) => {
    let response;
    switch (infoType) {
      case 'payment methods':
        response = 'We accept cash, bank transfer and VNPAY for both online and in-store purchases. As for the remaining payment methods, we currently do not support.';
        break;
      case 'voucher':
        response = 'We have various types of voucher codes that will be displayed on our homepage when released. You can apply them during checkout to get discounts on your purchases.';
        break;
      case 'point':
        response = 'You can obtain points after a successful order. These points can be redeemed for discounts on future purchases with one point equal to one $.';
        break;
      case 'order':
        response = 'By choosing your favorite jewelry and adding it to the cart, you can proceed to checkout. You will receive an invoice for order confirmation on the website and in your registered email once you confirm the order.';
        break;
      case 'checkoutIssue':
        response = `You cannot add to cart and checkout due to one of these reasons, hope these solutions can solve your problem:
- Have not signed in an account. If you do not have one, you can sign up an account or sign in with a Google account.
- Have not chosen a shell type and size for the jewelry you want to add to cart or checkout.
- Due to some network connectivity issue, you can double-check your connectivity.`;
        break;
      default:
        response = 'I am not sure about that. If you cannot find the answer here, you can contact us directly through hotline: 0795795959 or email: diamonddianjewelry@gmail.com. We will reply as soon as possible.';
    }
    const botMessage = createChatBotMessage(response);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUnknown = () => {
    const response = 'I\'m not sure about that. If you can\'t find the answer here, you can contact us through hotline: 0795795959 or email: diamonddianjewelry@gmail.com. We will reply as soon as possible.';
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
