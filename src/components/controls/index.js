import React, {useCallback, useEffect, useState} from "react";
import PropTypes, {bool} from 'prop-types';
import './style.css';
import {numberPlural, plural} from "../../utils";

function Controls({cart, sum, modal, setModal, isEmpty}) {
  let amount = 0;
  cart.forEach(item => {
    if(item.amount > 0)
      amount+=1
  })
  const toggleModal = useCallback((value) => {
    setModal(value)
  }, [setModal])
  return (
    <div className='Controls'>
      <p>В корзине: <span style={{fontWeight: "bold"}}> {amount === 0 ? "пусто" : `${amount} ${plural(amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}`} {isEmpty===true ? "" : `/ ${numberPlural(sum)}`} </span></p>
      <button style={{marginRight: "10px"}} onClick={() => toggleModal(!modal)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    amount: PropTypes.number,
  })),
  sum: PropTypes.number,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  isEmpty: PropTypes.bool
};

Controls.defaultProps = {
  number: 0,
  list: [],
  modal: false,
  setModal: () => {}
}

export default React.memo(Controls);
