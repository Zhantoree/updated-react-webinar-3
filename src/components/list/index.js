import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, cart, onDeleteItem, onAddItem, mode}) {
  return (
    <div className='List'>
      {
        mode === true ?
          list.map(item => {
              const cartItem = cart.filter(cartItem => item.code === cartItem.code)[0]
              if(cartItem.amount > 0) {
                return <div key={item.code} className='List-item'>
                  <Item item={item} cartItem={cartItem} onDelete={onDeleteItem} mode={mode} onAdd={onAddItem}/>
                </div>
              }
              return ""
            }
          )
          :
          list.map(item =>
            <div key={item.code} className='List-item'>
              <Item item={item} onDelete={onDeleteItem} mode={mode} onAdd={onAddItem}/>
            </div>
          )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  })).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    amount: PropTypes.number,
  })),
  mode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(List);
