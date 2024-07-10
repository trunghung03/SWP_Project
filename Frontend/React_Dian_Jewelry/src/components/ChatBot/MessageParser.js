import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const trimmedMessage = message.trim().toLowerCase();

    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.includes('hello') || trimmedMessage.includes('hi')) {
      actions.handleHello();
    } else if (trimmedMessage.includes('hours') || trimmedMessage.includes('hour') || trimmedMessage.includes('open time') || trimmedMessage.includes('store open') || trimmedMessage.includes('closed') || trimmedMessage.includes('what time') || trimmedMessage.includes('when open') || trimmedMessage.includes('working time') || trimmedMessage.includes('work time')) {
      actions.handleGenInfo('hours');
    } else if (trimmedMessage.includes('location') || trimmedMessage.includes('where your store') || trimmedMessage.includes('where the store') || trimmedMessage.includes('where store') || trimmedMessage.includes('where is your store') || trimmedMessage.includes('how to find store') || trimmedMessage.includes('address') || trimmedMessage.includes('direct transaction') || trimmedMessage.includes('visit') || trimmedMessage.includes('direction')) {
      actions.handleGenInfo('location');
    } else if (trimmedMessage.includes('contact') || trimmedMessage.includes('email') || trimmedMessage.includes('phone') || trimmedMessage.includes('store info') || trimmedMessage.includes('store information') || trimmedMessage.includes('ask more') || trimmedMessage.includes('hotline')) {
      actions.handleGenInfo('contact');
    } else if (trimmedMessage.includes('facebook') || trimmedMessage.includes('fb') || trimmedMessage.includes('insta') || trimmedMessage.includes('instagram') || trimmedMessage.includes('tiktok') || trimmedMessage.includes('social') || trimmedMessage.includes('media') || trimmedMessage.includes('medias') || trimmedMessage.includes('fanpage')) {
      actions.handleGenInfo('social');
    } else if (trimmedMessage.includes('account') || trimmedMessage.includes('accounts') || trimmedMessage.includes('sign up') || trimmedMessage.includes('sign in') || trimmedMessage.includes('login') || trimmedMessage.includes('register')) {
      actions.handleGenInfo('account');
    } else if (trimmedMessage.includes('deactivate') || trimmedMessage.includes('dead') || trimmedMessage.includes('can\'t access account') || trimmedMessage.includes('can not access account')) {
      actions.handleGenInfo('deactivate');
    } else if (trimmedMessage.includes('forgot password') || trimmedMessage.includes('forget password') || trimmedMessage.includes('change password') || trimmedMessage.includes('change my password') || trimmedMessage.includes('change pass') || trimmedMessage.includes('change my pass')) {
      actions.handleGenInfo('password');
    } else if (trimmedMessage.includes('payment') || trimmedMessage.includes('payment method') || trimmedMessage.includes('payment methods') || trimmedMessage.includes('how can i pay') || trimmedMessage.includes('do you accept') || trimmedMessage.includes('are you accept') || trimmedMessage.includes('how to pay') || trimmedMessage.includes('you accept') || trimmedMessage.includes('vnpay') || trimmedMessage.includes('bank transfer') || trimmedMessage.includes('cash') || trimmedMessage.includes('money')) {
      actions.handlePurchaseInfo('payment methods');
    } else if (trimmedMessage.includes('voucher') || trimmedMessage.includes('apply') || trimmedMessage.includes('coupons') || trimmedMessage.includes('coupon') || trimmedMessage.includes('vouchers') || trimmedMessage.includes('promo codes') || trimmedMessage.includes('promotion codes') || trimmedMessage.includes('promotional codes') || trimmedMessage.includes('promo code') || trimmedMessage.includes('promotion code') || trimmedMessage.includes('promotional code') || trimmedMessage.includes('discount')) {
      actions.handlePurchaseInfo('voucher');
    } else if (trimmedMessage.includes('point') || trimmedMessage.includes('points')) {
      actions.handlePurchaseInfo('point');
    } else if (trimmedMessage.includes('order') || trimmedMessage.includes('orders')) {
      actions.handlePurchaseInfo('order');
    } else if (trimmedMessage.includes('can not checkout') || trimmedMessage.includes('can\'t checkout') || trimmedMessage.includes('can not add to cart') || trimmedMessage.includes('can\'t add to cart') || trimmedMessage.includes('can not add product to cart') || trimmedMessage.includes('can\'t add product to cart') || trimmedMessage.includes('can not add jewelry to cart') || trimmedMessage.includes('can\'t add jewelry to cart') || trimmedMessage.includes('error when add to cart') || trimmedMessage.includes('error when checkout') || trimmedMessage.includes('can not order') || trimmedMessage.includes('can\'t order') || trimmedMessage.includes('can not buy') || trimmedMessage.includes('can\'t buy')) {
      actions.handlePurchaseInfo('checkoutIssue');
    } else if (trimmedMessage.includes('gia') || trimmedMessage.includes('certification') || trimmedMessage.includes('certificate') || trimmedMessage.includes('gemological institute of america')) {
      actions.handleProductInfo('GIA');
    } else if (trimmedMessage.includes('4c') || trimmedMessage.includes('4cs') || trimmedMessage.includes('diamond quality')) {
      actions.handleProductInfo('4Cs');
    } else if (trimmedMessage.includes('colour') || trimmedMessage.includes('color') || trimmedMessage.includes('colors') || trimmedMessage.includes('colours')) {
      actions.handleProductInfo('diamondColor');
    }else if (trimmedMessage.includes('clarity') || trimmedMessage.includes('claritys')) {
      actions.handleProductInfo('diamondClarity');
    }else if (trimmedMessage.includes('carat') || trimmedMessage.includes('carat') || trimmedMessage.includes('weight')) {
      actions.handleProductInfo('diamondCarat');
    }else if (trimmedMessage.includes('cut') || trimmedMessage.includes('cuts')) {
      actions.handleProductInfo('diamondCut' );
    }else if (trimmedMessage.includes('ring size') || trimmedMessage.includes('rings size') || trimmedMessage.includes('ring sizes') || trimmedMessage.includes('rings sizes')) {
      actions.handleProductInfo('ringSize' );
    }else if (trimmedMessage.includes('earring size') || trimmedMessage.includes('earrings size') || trimmedMessage.includes('earring sizes') || trimmedMessage.includes('earrings sizes')) {
      actions.handleProductInfo('earringsSize' );
    }else if (trimmedMessage.includes('bracelet size') || trimmedMessage.includes('bracelets size') || trimmedMessage.includes('bracelet sizes') || trimmedMessage.includes('bracelets sizes')) {
      actions.handleProductInfo('braceletSize' );
    }else if (trimmedMessage.includes('necklace size') || trimmedMessage.includes('necklaces size') || trimmedMessage.includes('necklace sizes') || trimmedMessage.includes('necklaces sizes')) {
      actions.handleProductInfo('necklaceSize' );
    }else if (trimmedMessage.includes('size') || trimmedMessage.includes('sizes')) {
      actions.handleProductInfo('size' );
    } else if (trimmedMessage.includes('what do you sell') || trimmedMessage.includes('collection')  || trimmedMessage.includes('collections') || trimmedMessage.includes('sell what') || trimmedMessage.includes('do you sell') || trimmedMessage.includes('what do you have') || trimmedMessage.includes('ring') || trimmedMessage.includes('rings') || trimmedMessage.includes('jewelry') || trimmedMessage.includes('necklace') || trimmedMessage.includes('necklaces') || trimmedMessage.includes('earrings') || trimmedMessage.includes('bracelet') || trimmedMessage.includes('bracelets') || trimmedMessage.includes('engagement') || trimmedMessage.includes('wedding')) {
      actions.handleGenInfo('sell');
    }else {
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