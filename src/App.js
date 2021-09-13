import ResourceList from './components/ResourceList';
import ItemCards from './components/ItemCards';
import Searchbar from './components/Searchbar';
import {useState, useEffect} from 'react'
import 'normalize.css'
import './styles/styles.css'

function App() {
  
  const [itemList, setItemList] = useState(() => {
    const saved = localStorage.getItem('itemList')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  const [recipeItems, setRecipeItems] = useState(() => {
    const saved = localStorage.getItem('recipeItems')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList))
    localStorage.setItem('recipeItems', JSON.stringify(recipeItems))
  }, [itemList, recipeItems])
  
  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Craftlist</h1>
        <p className="header__subtitle">Make your own shopping list when you are feeling like crafting!</p>
      </header>
      <Searchbar itemList={itemList} setItemList={setItemList}/>
      <ResourceList itemList={itemList} recipeItems={recipeItems} setItemList={setItemList} setRecipeItems={setRecipeItems}/>
      <ItemCards itemList={itemList} recipeItems={recipeItems} setItemList={setItemList}/>
    </div>
  );
}

export default App;
