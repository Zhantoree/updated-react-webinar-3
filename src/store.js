import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {
    list: [],
    cart: [],
    sum: 0
  }) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление элемента в корзину
   */
  addItem(code) {
    let elem = this.state.list.filter(item => item.code === code)[0]
    this.setState({
      ...this.state,
      sum: this.state.sum + elem.price,
      cart: this.state.cart.map(item => {
        if (code === item.code) {
          return {
            ...item,
            amount: item.amount + 1
          }
        }
        return item
      })
    })
  };

  /**
   * Удаление элемента из корзины по коду
   * @param code
   */
  deleteItem(code) {
    let elem = this.state.list.filter(item => item.code === code)[0]
    this.setState({
      ...this.state,
      sum: this.state.sum - elem.price,
      cart: this.state.cart.map(item => {
        if (item.code === code) {
          return {
            ...item,
            amount: item.amount - 1
          }
        }
        return item
      })
    })
  };

}

export default Store;
