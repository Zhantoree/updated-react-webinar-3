import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const sum = store.getState().sum
  const [modal, setModal] = useState(true)
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
      <Controls list={list} sum={sum} modal={modal} setModal={setModal}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onAddItem={callbacks.onAddItem}/>
      {
        modal ?
          <Modal modal={modal} setModal={setModal} onDeleteItem={callbacks.onDeleteItem}/>
          :
          ""
      }
    </PageLayout>
  );
}

export default App;
