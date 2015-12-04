import hbApiPayment from './servicesExternalApi/hbApiPaymentCybersource';
// import hbApiPayment from './servicesExternalApi/hbApiPaymentStripe';

class hbIntPayment {

	// define interface here
	// call external service modules here

	checkout() { hbApiPayment.checkout(); }
}

export default hbIntPayment;
