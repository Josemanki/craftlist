import React from 'react'
import ItemCard from './ItemCard'

function ItemCards({itemList, recipeItems, setItemList}) {
  return (
      <div className="item-cards">
        {itemList.map((item, index) => (
          <ItemCard 
            itemName={item.name} 
            image={item.image_url_local} 
            recipe={item.recipe} 
            ankama_id={item.ankama_id}
            recipeItems={recipeItems}
            setItemList={setItemList}
            itemList={itemList}
            key={`${item.ankama_id}${index}`}
          />
        ))}
      </div>
  )
}

export default ItemCards
