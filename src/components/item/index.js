import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

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

  return (
    <div className="Item">
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        <p>{props.item.title}</p>
        <p>{props.item.price} ₽</p>
      </div>

      <div className='Item-actions'>
        {
          props.mode === true ?
            <button onClick={callbacks.onDelete}>
              Удалить
            </button>
            :
            <button onClick={callbacks.onAdd}>
              Добавить
            </button>
        }

      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
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
