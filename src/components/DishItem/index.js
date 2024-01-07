import {Component} from 'react'

import './index.css'

class DishItem extends Component {
  state = {count: 0, itemsCount: 0}

  onIncrement = () => {
    const {getItemsCount} = this.props
    const {itemsCount} = this.state
    this.setState(prevState => ({count: prevState.count + 1}))
    if (itemsCount >= 0) {
      this.setState(prevState => ({itemsCount: prevState.itemsCount + 1}))
    }
    getItemsCount(itemsCount + 1)
  }

  onDecrement = () => {
    const {getItemsCount} = this.props
    const {count, itemsCount} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
    if (itemsCount > 0) {
      this.setState(prevState => ({itemsCount: prevState.itemsCount - 1}))
    }
    getItemsCount(itemsCount - 1)
  }

  render() {
    const {count} = this.state
    const {details} = this.props
    const {
      dishPrice,
      dishName,
      dishCurrency,
      dishImage,
      dishDescription,
      dishCalories,
      dishAvailability,
      addonCat,
    } = details

    const availability = dishAvailability ? (
      <div className="quantity-container">
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <p>{count}</p>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
      </div>
    ) : (
      <p>Not available</p>
    )

    const addon = addonCat.length !== 0 && <p>Customizations available</p>

    return (
      <li className="dish-item-card">
        <div>
          <h1>{dishName}</h1>
          <div>
            <p>
              {dishCurrency} {dishPrice}
            </p>
          </div>
          <p>{dishDescription}</p>
          {availability}
          {addon}
        </div>
        <div className="image-container">
          <p>{dishCalories} calories</p>
          <img className="dish-image" src={dishImage} alt={dishName} />
        </div>
      </li>
    )
  }
}

export default DishItem
