import axios from "axios";
import React, { useState } from "react";
import SearchResults from "./SearchResults";

// Request URL https://enc.dofusdu.de/dofus/en/equipment?page%5Bnumber%5D=1&page%5Bsize%5D=20&search%5Bname%5D=harebourg

function Searchbar({ setItemList, itemList, currentPage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleFocusOut = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleInput = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 3) {
      const requestUrl =
        currentPage === "equipment"
          ? `https://api.dofusdu.de/dofus2/en/items/equipment/search?query=`
          : `https://api.dofusdu.de/dofus2/en/items/resources/search?query=`;
      const res = await axios.get(`${requestUrl}${e.target.value}`);
      console.log(res);
      const filteredRes = res.data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filteredRes);
      setSearchResults(filteredRes);
    } else if (!e.target.value) {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <div className="searchbar__wrapper">
        <div className="searchbar">
          <input
            placeholder="Enter an item here..."
            type="text"
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleFocusOut}
            className="searchbar__input"
            value={searchQuery}
          />
          {isFocused && (
            <SearchResults
              searchResults={searchResults}
              itemList={itemList}
              setItemList={setItemList}
              setSearchQuery={setSearchQuery}
              setSearchResults={setSearchResults}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
