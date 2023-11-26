import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

    const list = store.getState().list;

    const checkNumber = (num) => {
        if(num%10===1) {
            return `Выделяли ${num} раз`
        }
        else if(num%10 === 2 || num%10 ===3 || num%10 ===4) {
            if(num === 12 || num === 13 || num === 14) {
                return `Выделяли ${num} раз`
            }
            return `Выделяли ${num} раза`
        }
        else {
            return `Выделяли ${num} раз`
        }
    }

    return (
        <div className='App'>
            <div className='App-head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='App-controls'>
                <button onClick={() => store.addItem()}>Добавить</button>
            </div>
            <div className='App-center'>
                <div className='List'>{
                    list.map(item =>
                        <div key={item.code} className='List-item'>
                            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                                 onClick={() => store.selectItem(item.code)}>
                                <div className='Item-code'>{item.code}</div>
                                <div className='Item-title'>{item.title} {item.highlighted >= 1 ? checkNumber(item.highlighted) : ``}</div>
                                <div className='Item-actions'>
                                    <button onClick={() => store.deleteItem(item.code)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
