/**
 * Хранилище состояния приложения
 */

import uniqueRandom from "unique-random";

class Store {
  id = 7;

  constructor(initState = {}) {
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

  getUniqueNumber() {
    let random = true;
    let limit = 1000;
    let getUnique = uniqueRandom(1, limit);
    while(true) {
      if(this.state.list.length >= limit)
        return "There are too many elements. Please increase elements limit ----> index.js>46 "
      let candidate = getUnique()
      this.state.list.forEach(item => {
        if(item.code === candidate) {
          random = false
        }
      })
      if(random === true) {
        return candidate
      }
      random = true
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getUniqueNumber(), title: 'Новая запись', highlighted: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected
          if(item.selected)
            item.highlighted++
        } else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
