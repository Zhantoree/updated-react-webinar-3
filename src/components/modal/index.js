import React from 'react';
import PropTypes from "prop-types";
import './style.css'
import List from "../list";
const Modal = ({modal, setModal, list, sum, onDeleteItem}) => {
  const toggleModal = (value) => {
    setModal(value)
  }

  return (
    <div className="Modal" onClick={() => setModal(!modal)}>
      <div className="Modal-body" onClick={e => e.stopPropagation()}>
        <div className="Modal-header">
          <div className="Modal-title">Корзина</div>
          <button className="Modal-button" onClick={()=> toggleModal(!modal)}>Закрыть</button>
        </div>
        <List list={list} mode={true} onDeleteItem={onDeleteItem}/>
        <div className="Modal-sum">
          {
            sum === 0 ?
              <><h4>Пусто</h4></>
              :
              <>
                <p>Итого</p><p style={{fontWeight: "bold", marginLeft: '15px'}}>{sum} ₽</p>
              </>
          }
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  })),
  onDeleteItem: PropTypes.func,
  sum: PropTypes.number,
  modal: PropTypes.bool,
  setModal: PropTypes.func
};

Modal.defaulProps = {
  list: [],
  modal: false,
  setModal: () => {}
}

export default Modal;