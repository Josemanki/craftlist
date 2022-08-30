import axios from "axios";
import React from "react";

function SearchResults({
  searchResults,
  itemList,
  setItemList,
  setSearchQuery,
  setSearchResults,
  currentPage,
}) {
  const handleStateChange = async (e) => {
    if (e.target.innerText) {
      const stateItem = searchResults.filter(
        (item) => item.name === e.target.innerText
      )[0];
      const fetchedItem = await axios.get(
        `https://api.dofusdu.de/dofus2/en/items/${
          currentPage === "equipment" ? "equipment" : "resources"
        }/${stateItem.ankama_id}`
      );
      const itemExists = itemList.findIndex(
        (item) => item.ankama_id === fetchedItem.data.ankama_id
      );
      if (itemExists === -1) {
        setItemList((prevState) => [
          ...prevState,
          { ...fetchedItem.data, quantity: 1 },
        ]);
      } else if (itemExists > -1) {
        const items = [...itemList];
        items[itemExists].quantity++;
        setItemList(items);
      }
      setSearchQuery("");
      setSearchResults([]);
    } else if (e.target.parentElement.innerText) {
      const stateItem = searchResults.filter(
        (item) => item.name === e.target.parentElement.innerText
      )[0];
      setItemList((prevState) => [...prevState, stateItem]);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const options = searchResults.map((result) => {
    return (
      <li onClick={handleStateChange} key={result.ankama_id}>
        {result.name}
        <img width={50} src={result.image_urls.icon} alt={result.name} />
      </li>
    );
  });

  return (
    <div className="autocom-box">
      <ul>{options}</ul>
    </div>
  );
}

export default SearchResults;
