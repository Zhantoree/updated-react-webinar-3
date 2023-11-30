import React from 'react';
import PropTypes from "prop-types";
import './style.css'
import List from "../list";
const Modal = ({modal, setModal, list, sum, onDeleteItem}) => {
  return (
    <div className="Modal">
      <div className="Modal-header">
        <div className="Modal-title"></div>
        <button className="Modal-button" onClick={setModal(!modal)}>Закрыть</button>
      </div>
      <List list={list} onDeleteItem={onDeleteItem}/>
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