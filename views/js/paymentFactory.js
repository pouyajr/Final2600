//Factory Design Pattern that will be show the output in the terminal
class PaymentFactory {
    static createPayment(type) {
      switch (type) {
        case 'creditCard':
          return new CreditCardPayment();
        case 'paypal':
          return new PayPalPayment();
        case 'stripe':
          return new StripePayment();
        default:
          throw new Error('Unknown payment method');
      }
    }
  }
  
  class CreditCardPayment {
    process() {
      console.log("Processing payment via Credit Card");
    }
  }
  
  class PayPalPayment {
    process() {
      console.log("Processing payment via PayPal");
    }
  }
  
  class StripePayment {
    process() {
      console.log("Processing payment via Stripe");
    }
  }
  
module.exports = PaymentFactory;
  