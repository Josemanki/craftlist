import axios from 'axios'
import React, {useState} from 'react'
import SearchResults from './SearchResults'

// Request URL https://enc.dofusdu.de/dofus/en/equipment?page%5Bnumber%5D=1&page%5Bsize%5D=20&search%5Bname%5D=harebourg

function Searchbar({setItemList, itemList}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleFocusOut = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 200);
  }

  const handleInput = async (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 3) {
      const res = await axios.get(`https://enc.dofusdu.de/dofus/en/equipment?page%5Bnumber%5D=1&page%5Bsize%5D=96&search%5Bname%5D=${e.target.value}`)
      const filteredRes = res.data.items.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      const finalRes = await Promise.all(filteredRes.map(async (item) => {
        const itemData = await axios.get(item.item_url)
        return itemData.data
      }))
      setSearchResults(finalRes)
    } else if (!e.target.value) {
      setSearchResults([])
    }
  }

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
          {isFocused && 
          <SearchResults 
            searchResults={searchResults} 
            itemList={itemList} 
            setItemList={setItemList}
            setSearchQuery={setSearchQuery}
            setSearchResults={setSearchResults}
          />}
        </div>
      </div>
    </div>
  )
}

export default Searchbar
