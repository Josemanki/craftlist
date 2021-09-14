import Header from './components/Header';
import Footer from './components/Footer';
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
      <Header />
      <div className="container">
      <Searchbar itemList={itemList} setItemList={setItemList}/>
      <ResourceList itemList={itemList} recipeItems={recipeItems} setItemList={setItemList} setRecipeItems={setRecipeItems}/>
      <ItemCards itemList={itemList} recipeItems={recipeItems} setItemList={setItemList}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
