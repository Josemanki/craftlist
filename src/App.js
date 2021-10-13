import Header from './components/Header';
import Footer from './components/Footer';
import InitialPage from './pages/InitialPage'
import ConsumablesPage from './pages/ConsumablesPage';
import EquipmentPage from './pages/EquipmentPage';
import Dofuslab from './pages/Dofuslab';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react'
import 'normalize.css'
import './styles/styles.css'

function App() {  

  const [itemList, setItemList] = useState(() => {
    const saved = localStorage.getItem('itemList')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })
  
  const [consumableList, setConsumableList] = useState(() => {
    const saved = localStorage.getItem('consumableList')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  const [recipeItems, setRecipeItems] = useState(() => {
    const saved = localStorage.getItem('recipeItems')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  return (
    <div className="app">
      <Header />
      <div className="container">
          <Switch>
            <Route path="/" component={InitialPage} exact={true} />
            <Route path="/equipment" exact={true}>
              <EquipmentPage itemList={itemList} setItemList={setItemList} recipeItems={recipeItems} setRecipeItems={setRecipeItems} currentPage={'equipment'} />
            </Route>
            <Route path="/consumables" component={ConsumablesPage} exact={true} >
              <ConsumablesPage itemList={consumableList} setItemList={setConsumableList} recipeItems={recipeItems} setRecipeItems={setRecipeItems} currentPage={'consumables'} />
            </Route>
            <Route path="/dofuslab" exact={true}>
              <Dofuslab setItemList={setItemList} />
            </Route>
          </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
