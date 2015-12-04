import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {testButton} from 'redux/modules/hbCart';

@connect(
    state => ({
      hbCart: state.hbCart.data,
      products: state.hbCart.products,
      isCartVisible: state.hbCart.isCartVisible,
      total: state.hbCart.total
    }),
    dispatch => bindActionCreators({testButton}, dispatch))

export default class HbCartComp extends Component {
  static propTypes = {
    hbCart: PropTypes.object,
    products: PropTypes.object,
    testButton: PropTypes.func.isRequired,
    isCartVisible: PropTypes.bool,
    total: PropTypes.string
  }

  log = (name, value1 = '--', value2 = '--', value3 = '--') => {
    console.log('hbCartComp: ' + name + ', ' + value1 + ', ' + value2 + ', ' + value3);
  }

  render() {
    const {products, testButton, hbCart, isCartVisible, total} = this.props; // eslint-disable-line no-shadow
    const styles = require('./HbCartComp.scss');
    return (
      <div className={styles.hbCartComp + ' well'}>
        <div className="container">
          This is cart
          {' '}
        </div>
        <div className="flux-cart active">
          <div className="mini-cart">
            <button type="button" className="close-cart">&times;</button>
            isCartVisible: {isCartVisible}
            {this.log('hbCart', hbCart)}
            {this.log('products', products)}
            {this.log('isCartVisible', isCartVisible)}
            <ul>
              {Object.keys(products).map(function func(product) {
                return (
                  <li key={product}>
                    <h1 className="name">{products[product].name}</h1>
                    <p className="type">{products[product].type} x {products[product].quantity}</p>
                    <p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
                    <button type="button" className="remove-item" >Remove</button>
                  </li>
                );
              })}
            </ul>
            <span className="total">Total: ${total}</span>
          </div>
          <button type="button" onClick={testButton} className="view-cart">View Cart (item count)</button>
        </div>
      </div>
    );
  }
}
