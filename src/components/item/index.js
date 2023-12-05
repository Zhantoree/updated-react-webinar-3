import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {numberPlural} from "../../utils";

function Item(props) {
  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }


  return(
    <>
      {
        props.mode === true ?
          props.cartItem.amount >= 1 ?
          <div className="Item">
            <>
              <div className='Item-code'>{props.item.code}</div>
              <div className='Item-title'>
                <p>{props.item.title}</p>
                <p style={{marginLeft: "auto"}}>{numberPlural(props.item.price)}</p>
                <p>{props.cartItem.amount} шт</p>
              </div>
            </>
            <div className='Item-actions'>
              <button onClick={callbacks.onDelete}>
                Удалить
              </button>
            </div>
          </div>
            :
            ""
          :
          <div className="Item">
            <>
              <div className='Item-code'>{props.item.code}</div>
              <div className='Item-title'>
                <p>{props.item.title}</p>
                <p>{numberPlural(props.item.price) }</p>
              </div>
            </>
            <div className='Item-actions'>
              <button onClick={callbacks.onAdd}>
                Добавить
              </button>
            </div>
          </div>
      }
    </>

  )


}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  cartItem: PropTypes.PropTypes.shape({
    code: PropTypes.number,
    amount: PropTypes.number,
  }),
  mode: PropTypes.bool,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  mode: false,
  onDelete: () => {
  },
  onAdd: () => {
  },
}

export default React.memo(Item);
