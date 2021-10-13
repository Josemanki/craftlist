import React, { useEffect } from 'react'
import ItemCards from '../components/ItemCards'
import ResourceList from '../components/ResourceList'
import Searchbar from '../components/Searchbar'

export default function ConsumablesPage({ itemList, setItemList, recipeItems, setRecipeItems, currentPage }) {

  useEffect(() => {
    localStorage.setItem('consumableList', JSON.stringify(itemList))
    localStorage.setItem('recipeItems', JSON.stringify(recipeItems))
  }, [itemList, recipeItems])

  return (
    <div>
      <Searchbar itemList={itemList} setItemList={setItemList} currentPage={currentPage}/>
      <ResourceList itemList={itemList} recipeItems={recipeItems} setItemList={setItemList} setRecipeItems={setRecipeItems} />
      <ItemCards itemList={itemList} recipeItems={recipeItems} setItemList={setItemList} setRecipeItems={setRecipeItems} />
    </div>
  )
}
