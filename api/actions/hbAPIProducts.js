export default function hbAPIProducts() {
  return new Promise((resolve) => {
    resolve({
      	message: 'Products came from the api server',
		time: Date.now(),
		
		id: '0011001',
		name: 'honestbee Signature Lager',
		image: 'scotch-beer.png',
		description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
		variants: [
		  {
		    sku: '111111',
		    type: '40oz Bottle',
		    price: 4.99,
		    inventory: 1

		  },
		  {
		    sku: '222222',
		    type: '6 Pack',
		    price: 12.99,
		    inventory: 5
		  },
		  {
		    sku: '333333',
		    type: '30 Pack',
		    price: 19.99,
		    inventory: 3
		  }
		]
    });
  });
}
