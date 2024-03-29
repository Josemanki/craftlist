import React, { useEffect } from "react";
import axios from "axios";

function ResourceList({ itemList, recipeItems, setRecipeItems, setItemList }) {
  useEffect(async () => {
    const resourceList = [];
    let parsedResourceList = [];

    itemList.map((item) => {
      const summedRecipe = [];
      item.recipe.map((resource) => {
        summedRecipe.push({
          ...resource,
          quantity: resource.quantity * item.quantity,
        });
      });
      resourceList.push(...summedRecipe);
    });

    var resources = {};
    resourceList.forEach((val) => {
      if (resources[val.item_ankama_id])
        resources[val.item_ankama_id] = {
          id: val.item_ankama_id,
          subtype: val.item_subtype,
          quantity: resources[val.item_ankama_id].quantity + val.quantity,
        };
      else
        resources[val.item_ankama_id] = {
          id: val.item_ankama_id,
          subtype: val.item_subtype,
          quantity: val.quantity,
        };
    });
    parsedResourceList = Array.from(Object.values(resources));
    const localData = JSON.parse(localStorage.getItem("recipeItems"));

    const finalResourceList = await Promise.all(
      parsedResourceList.map(async (item) => {
        const cacheIndex = localData.findIndex(
          (localItem) => localItem.ankama_id === item.id
        );
        if (cacheIndex === -1) {
          const resource = await axios.get(
            `https://api.dofusdu.de/dofus2/en/items/${item.subtype}/${item.id}`
          );
          return { ...resource.data, quantity: item.quantity };
        } else {
          const resource = localData[cacheIndex];
          return { ...resource, quantity: item.quantity };
        }
      })
    );
    setRecipeItems(finalResourceList);
  }, [itemList]);

  const handleClearList = () => {
    setItemList([]);
  };

  return (
    <div>
      <div className="resource-list">
        <div className="resource-list__heading">
          <h2 className="resource-list__title">Shopping List</h2>
          <button
            className="resource-list__clear-button"
            onClick={handleClearList}
          >
            Clear List
          </button>
        </div>
        <ul className="resource-list__list">
          {itemList.length === 0 && (
            <span className="resource-list__empty-message">
              Add something to the list in order to see its recipe!
            </span>
          )}
          {recipeItems.map((item) => (
            <li className="resource-list__resource" key={item.ankama_id}>
              <span className="resource-list__imageAmount">
                <img src={item.image_urls.icon} alt={item.name} width={30} />
                <span> x {item.quantity} -</span>
              </span>
              <span className="resource-list__resource-name">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResourceList;
