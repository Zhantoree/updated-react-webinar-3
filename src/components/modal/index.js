import React, {useCallback} from 'react';
import PropTypes from "prop-types";
import './style.css'
const Modal = ({modal, setModal, children}) => {
  const toggleModal = useCallback((value) => {
    setModal(value)
  }, [setModal])

  return (
    <div className="Modal" onClick={() => setModal(!modal)}>
      <div className="Modal-body" onClick={e => e.stopPropagation()}>
        <div className="Modal-header">
          <div className="Modal-title">Корзина</div>
          <button className="Modal-button" onClick={()=> toggleModal(!modal)}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.bool,
  setModal: PropTypes.func
};

Modal.defaulProps = {
  list: [],
  modal: false,
  setModal: () => {}
}

export default Modal;