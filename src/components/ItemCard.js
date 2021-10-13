import React from 'react'

function ItemCard({ itemName, image, quantity, recipe, ankama_id, setRecipeItems, recipeItems, setItemList, itemList}) {
  const handleDelete = (id) => {
    const items = [...itemList]
    const deletedItem = itemList.findIndex((item) => item.ankama_id === id)
    items.splice(deletedItem, 1)
    setItemList(items)
  }

  const handleQuantity = (e, id) => {
    const items = [...itemList]
    const modifiedItemIndex = itemList.findIndex((item) => item.ankama_id === id)
    const modifiedItem = items[modifiedItemIndex]
    modifiedItem.quantity = e.target.value
    setItemList(items)
  }

  return (
      <div className="item-card">
        <div className="item-card__name-field">
          <input type="number" min={1} value={quantity} onChange={(e) => handleQuantity(e, ankama_id)} max={99} className="item-card__item-amount" />x
          <img src={image} alt={itemName} width={60}/>
          <span className="item-card__item-name">{itemName}</span>
          <button className="item-card__delete-button" onClick={() => handleDelete(ankama_id)}>x</button>
        </div>
        <div className="item-card__recipe-list">
          <ul className="item-card__resource-list">
            {recipe.map((item) => {
              const resource = recipeItems.find((resource) => resource.ankama_id === item.ankama_id)
              if (resource) {
                return (
                  <li key={resource.ankama_id} className="item-card__resource">
                    <span className="item-card__resource-name">{resource.name}</span>
                    <span className="item-card__imageAmount">
                      <img src={resource.image_url_local} alt={resource.name} width={40} />
                      <span>x {item.quantity * quantity} -</span>
                    </span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
  )
}

export default ItemCard
