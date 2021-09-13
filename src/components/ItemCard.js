import React from 'react'

function ItemCard({itemName, image, recipe, ankama_id, recipeItems, setItemList, itemList}) {
  const handleDelete = (id) => {
    const items = [...itemList]
    const deletedItem = itemList.findIndex((item) => item.ankama_id === id)
    items.splice(deletedItem, 1)
    setItemList(items)
  }

  return (
      <div className="item-card">
        <div className="item-card__name-field">
          <img src={image} alt={itemName} width={60}/>
          <span>{itemName}</span>
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
                      <span>x {item.quantity} -</span>
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
