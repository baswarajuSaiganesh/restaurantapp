const CategoryBar = props => {
  const {details, getActiveId} = props
  const {menuCategory, menuCategoryId} = details

  const setActiveId = () => {
    getActiveId(menuCategoryId)
  }

  return (
    <li className="category-item">
      <button type="button" onClick={setActiveId}>
        {menuCategory}
      </button>
    </li>
  )
}

export default CategoryBar
