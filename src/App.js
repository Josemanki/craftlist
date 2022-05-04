import Header from "./components/Header";
import Footer from "./components/Footer";
import InitialPage from "./pages/InitialPage";
import EquipmentPage from "./pages/EquipmentPage";
import Dofuslab from "./pages/Dofuslab";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import "normalize.css";
import "./styles/styles.css";
import IdolsPage from "./pages/IdolPage";

function App() {
  const [itemList, setItemList] = useState(() => {
    const saved = localStorage.getItem("itemList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [idolList, setIdolList] = useState(() => {
    const saved = localStorage.getItem("idolList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [recipeItems, setRecipeItems] = useState(() => {
    const saved = localStorage.getItem("recipeItems");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" component={InitialPage} exact={true} />
          <Route path="/equipment" exact={true}>
            <EquipmentPage
              itemList={itemList}
              setItemList={setItemList}
              recipeItems={recipeItems}
              setRecipeItems={setRecipeItems}
              currentPage={"equipment"}
            />
          </Route>
          <Route path="/idols" component={IdolsPage} exact={true}>
            <IdolsPage
              itemList={idolList}
              setItemList={setIdolList}
              recipeItems={recipeItems}
              setRecipeItems={setRecipeItems}
              currentPage={"idols"}
            />
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
