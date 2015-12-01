import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load, selectVariant} from 'redux/modules/hbProducts';

@connect(
    state => ({
      hbProducts: state.hbProducts.data,
      selectedIndex: state.hbProducts.selectedIndex
    }),
    dispatch => bindActionCreators({load, selectVariant}, dispatch))

export default class HbProductsComp extends Component {
  static propTypes = {
    hbProducts: PropTypes.object,
    load: PropTypes.func.isRequired,
    selectVariant: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number
  }

  render() {
    const {hbProducts, load, selectVariant, selectedIndex} = this.props; // eslint-disable-line no-shadow
    const styles = require('./HbProductsComp.scss');
    return (
      <div className={styles.hbProductsComp + ' well'}>
        <div className="container">
          This is products bar
          {' '}
          <strong>{hbProducts ? hbProducts.message : 'no products!'}</strong>
          <span className={styles.time}>{hbProducts && new Date(hbProducts.time).toString()}</span>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
        <div className="flux-product">
          <img src={'img/' + hbProducts.image}/>
          <div className="flux-product-detail">
            <h1 className="name">{hbProducts.name}</h1>
            <p className="description">{hbProducts.description}</p>
            <p className="price">Price: ${hbProducts.variants[selectedIndex].price}</p>
            <select onChange={selectVariant}>
              {hbProducts.variants.map(function func(variant, index) {
                return (
                  <option key={index} value={index}>{variant.type}</option>
                );
              })}
            </select>
            <button type="button">
              'Button text'
            </button>
          </div>
        </div>
      </div>
    );
  }
}
