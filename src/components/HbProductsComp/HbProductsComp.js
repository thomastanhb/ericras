import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load, selectVariant} from 'redux/modules/hbProducts';
import {addToCart} from 'redux/modules/hbCart';

@connect(
    state => ({
      hbProducts: state.hbProducts.data,
      selectedIndex: state.hbProducts.selectedIndex
    }),
    dispatch => bindActionCreators({load, selectVariant, addToCart}, dispatch))

export default class HbProductsComp extends Component {
  static propTypes = {
    hbProducts: PropTypes.object,
    load: PropTypes.func.isRequired,
    selectVariant: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number
  }

  addToCart = () => {
    const {hbProducts, selectedIndex, addToCart} = this.props; // eslint-disable-line no-shadow
    const sku = hbProducts.variants[selectedIndex].sku;
    const item = {
      name: hbProducts.name,
      type: hbProducts.variants[selectedIndex].type,
      price: hbProducts.variants[selectedIndex].price
    };
    addToCart(sku, item);
    // console.log('addToCart ' + sku);
    // console.log('addToCart ' + update);
    // console.log('addToCart ' + selectedIndex);
  }

  log = (name, value1 = '--', value2 = '--', value3 = '--') => {
    console.log('hbProductsComp: ' + name + ', ' + value1 + ', ' + value2 + ', ' + value3);
  }

  render() {
    const {hbProducts, selectVariant, selectedIndex} = this.props; // eslint-disable-line no-shadow
    const styles = require('./HbProductsComp.scss');
    return (
      <div className={styles.hbProductsComp + ' well'}>
        <h3>Product</h3>
        <div className="flux-product">
          <div className="flux-product-detail">
            <h1 className="name">{hbProducts.name}</h1>
            <p className="description">{hbProducts.description}</p>
            <p className="price">Price: ${hbProducts.variants[selectedIndex].price}</p>
            <p className="price">Type: {hbProducts.variants[selectedIndex].type}</p>
            <p className="price">SKU: {hbProducts.variants[selectedIndex].sku}</p>
            <p className="price">Inventory: {hbProducts.variants[selectedIndex].inventory}</p>
            {this.log('aaax selectedIndex', selectedIndex)}
            <select onChange={selectVariant}>
              {hbProducts.variants.map(function func(variant, index) {
                return (
                  <option key={index} value={index}>{variant.type}</option>
                );
              })}
            </select>
            <button type="button" onClick={this.addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
