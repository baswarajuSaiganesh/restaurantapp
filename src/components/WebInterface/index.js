import {Component} from 'react'

import Header from '../Header'
import DishItem from '../DishItem'
import CategoryBar from '../CategoryBar'

import './index.css'

class WebInterface extends Component {
  state = {
    menuCategoryList: [],
    tableMenuDetails: [],
    activeTab: '11',
    items: 0,
  }

  componentDidMount() {
    this.getDishesAndCategoriesDetails()
  }

  getCategoryDishes = data => ({
    dishId: data.dish_id,
    dishName: data.dish_name,
    dishPrice: data.dish_price,
    dishImage: data.dish_image,
    dishCurrency: data.dish_currency,
    dishCalories: data.dish_calories,
    dishDescription: data.dish_description,
    dishAvailability: data.dish_availability,
    dishType: data.dish_type,
    nextUrl: data.nexturl,
    addonCat: [],
  })

  getCategoryDishesWithAddon = data => ({
    dishId: data.dish_id,
    dishName: data.dish_name,
    dishPrice: data.dish_price,
    dishImage: data.dish_image,
    dishCurrency: data.dish_currency,
    dishCalories: data.dish_calories,
    dishDescription: data.dish_description,
    dishAvailability: data.dish_Availability,
    dishType: data.dish_type,
    nextUrl: data.nexturl,
    addonCat: data.addonCat.map(each => ({
      addonCategory: each.addon_category,
      addonCategoryId: each.addon_category_id,
      addonSelection: each.addon_selection,
      addons: each.addons.map(eachAddon => this.getCategoryDishes(eachAddon)),
    })),
  })

  getDishesAndCategoriesDetails = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const menuList = data[0].table_menu_list
    console.log(data)
    const menuCategoryDetails = menuList.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
    }))
    const tableMenuList = menuList.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      categoryDishes: each.category_dishes.map(eachCategoryDish => {
        if (each.addonCat === '') {
          return this.getCategoryDishes(eachCategoryDish)
        }
        return this.getCategoryDishesWithAddon(eachCategoryDish)
      }),
    }))

    this.setState({menuCategoryList: menuCategoryDetails})
    this.setState({tableMenuDetails: tableMenuList})
  }

  getItemsCount = num => {
    this.setState({items: num})
  }

  getActiveId = id => {
    this.setState({activeTab: id})
  }

  getCategoryListBar = () => {
    const {menuCategoryList} = this.state
    return (
      <ul className="category-container">
        {menuCategoryList.map(each => (
          <CategoryBar
            key={each.menuCategoryId}
            details={each}
            getActiveId={this.getActiveId}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {tableMenuDetails, activeTab, items} = this.state
    const filteredData = tableMenuDetails.filter(
      each => each.menuCategoryId === activeTab,
    )
    return (
      <div>
        <Header items={items} />
        {this.getCategoryListBar()}
        <ul>
          {filteredData.map(eachCategory =>
            eachCategory.categoryDishes.map(each => (
              <DishItem
                key={each.dishId}
                details={each}
                getItemsCount={this.getItemsCount}
              />
            )),
          )}
        </ul>
      </div>
    )
  }
}

export default WebInterface
