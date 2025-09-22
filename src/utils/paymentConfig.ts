export const paymentConfig = {
  razorpay: {
    isConfigured: () => !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  },
  cashfree: {
    isConfigured: () => !!process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
    appId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
  },
};

export const getAvailablePaymentMethods = () => {
  const methods = [];
  
  if (paymentConfig.razorpay.isConfigured()) {
    methods.push({
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Pay with cards, UPI, wallets & more',
    });
  }
  
  // if (paymentConfig.cashfree.isConfigured()) {
  //   methods.push({
  //     id: 'cashfree',
  //     name: 'Cashfree',
  //     description: 'Secure payment gateway',
  //   });
  // }
  
  return methods;
};