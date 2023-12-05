import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import {numberPlural} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const sum = store.getState().sum;
  const [modal, setModal] = useState(false)
  let isEmpty = true;
  cart.forEach(item => {
    if (item.amount >= 1)
      isEmpty = false
  })
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cart={cart} sum={sum} isEmpty={isEmpty} modal={modal} setModal={setModal}/>
      <List list={list}
            cart={cart}
            onDeleteItem={callbacks.onDeleteItem}
            onAddItem={callbacks.onAddItem}/>
      {
        modal ?
          <Modal modal={modal} setModal={setModal}>
            {
              isEmpty ?
                ""
                :
                <List list={list} cart={cart} mode={true} onDeleteItem={callbacks.onDeleteItem}/>
            }
            <div className="Modal-sum">
              {
                isEmpty === true ?
                  <><h4>Пусто</h4></>
                  :
                  <>
                    <p>Итого</p><p style={{fontWeight: "bold", marginLeft: '15px'}}>{numberPlural(sum)}</p>
                  </>
              }
            </div>
          </Modal>
          :
          ""
      }
    </PageLayout>
  );
}

export default App;
