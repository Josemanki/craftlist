import React from "react";

function SearchResults({
  searchResults,
  itemList,
  setItemList,
  setSearchQuery,
  setSearchResults,
  currentPage,
}) {
  const filteredSearchResults = searchResults.filter((item) =>
    currentPage === "idols"
      ? item.type === "Idol"
      : item.hasOwnProperty("recipe")
  );
  // type !== 'Pet' && item.type !== 'Petsmount' && item.type !== 'Dofus'
  const handleStateChange = (e) => {
    if (e.target.innerText) {
      const stateItem = searchResults.filter(
        (item) => item.name === e.target.innerText
      )[0];
      const itemExists = itemList.findIndex(
        (item) => item.ankama_id === stateItem.ankama_id
      );
      if (itemExists === -1) {
        setItemList((prevState) => [
          ...prevState,
          { ...stateItem, quantity: 1 },
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

  const options = filteredSearchResults.map((result) => {
    return (
      <li onClick={handleStateChange} key={result.ankama_id}>
        {result.name}
        <img width={50} src={result.image_url_local} alt={result.name} />
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
