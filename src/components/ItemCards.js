import React from "react";
import ItemCard from "./ItemCard";

function ItemCards({ itemList, recipeItems, setItemList, setRecipeItems }) {
  return (
    <div className="item-cards">
      {itemList.map((item, index) => (
        <ItemCard
          itemName={item.name}
          image={item.image_urls.icon}
          quantity={item.quantity}
          recipe={item.recipe}
          ankama_id={item.ankama_id}
          setRecipeItems={setRecipeItems}
          recipeItems={recipeItems}
          setItemList={setItemList}
          itemList={itemList}
          key={`${item.ankama_id}${index}`}
        />
      ))}
    </div>
  );
}

export default ItemCards;
