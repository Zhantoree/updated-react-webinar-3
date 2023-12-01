import React, {useEffect, useState} from "react";
import PropTypes, {bool} from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({list, sum, modal, setModal}) {
  let amount = 0;
  list.forEach(item => amount+=item.amount)
  const toggleModal = (value) => {
    setModal(value)
  }
  return (
    <div className='Controls'>
      <p>В корзине: <span style={{fontWeight: "bold"}}> {amount === 0 ? "пусто" : `${amount} ${plural(amount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}`} {sum===0 ? "" : `/ ${sum} ₽`} </span></p>
      <button style={{marginRight: "10px"}} onClick={() => toggleModal(!modal)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  })),
  sum: PropTypes.number,
  modal: PropTypes.bool,
  setModal: PropTypes.func
};

Controls.defaultProps = {
  number: 0,
  list: [],
  modal: false,
  setModal: () => {}
}

export default React.memo(Controls);
