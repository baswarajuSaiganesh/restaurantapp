import {IoCartOutline} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const {items} = props
  return (
    <nav className="nav-container">
      <h1>UNI Resto Cafe</h1>
      <div className="order-container">
        <p>My Orders</p>
        <div className="cart-icon-container">
          <IoCartOutline className="cart-icon" />
          <p className="items-count">{items}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
